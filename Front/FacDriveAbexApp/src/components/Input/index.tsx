import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { height } from '../../utils/functions.ts';
import * as Styles from './styles.ts';

type InputProps = {
  placeholder: string;
  value: any;
  onChange: (value: any) => void;
  isPassword?: boolean;
  halfInput?: boolean;
  blocked?: boolean;
  keyboardType?: 'default' | 'numeric' | 'email-address' | 'phone-pad';
  hasSubmitted?: boolean;
  error?: string | undefined;
  inputType?: 'text' | 'number' | 'date';
  readOnly?: boolean;
  mask?: (string | RegExp)[];
  label: string
};

export const Input = ({
  onChange,
  value,
  placeholder,
  isPassword,
  halfInput,
  blocked,
  keyboardType,
  hasSubmitted,
  error,
  inputType = 'text',
  readOnly,
  mask,
  label
}: InputProps) => {
  const [isFocus, setIsFocus] = useState(false);
  const [showPassword, setShowPassword] = useState(isPassword);

  const handleTextChange = (text: string) => {
    switch (inputType) {
      case 'number':
        const numericValue = parseFloat(text);
        onChange(isNaN(numericValue) ? 0 : numericValue);
        break;
      case 'date':
        const dateValue = new Date(text);
        onChange(isValidDate(dateValue) ? dateValue : new Date());
        break;
      default:
        onChange(text);
    }
  };

  const isValidDate = (date: Date) => {
    return !isNaN(date.getTime());
  };

  return (
    <Styles.WrapperInput>
      <Styles.InputLabel>
        {hasSubmitted ? `* ${label}` : label}
      </Styles.InputLabel>
      <Styles.CustomInputContainer
        isFocused={isFocus}
        halfInput={halfInput}
        blocked={blocked}
      >
        <Styles.Input
          keyboardType={getKeyboardType(inputType, keyboardType)}
          readOnly={readOnly}
          editable={!blocked}
          autoComplete="off"
          placeholderTextColor="#6C6C6C"
          secureTextEntry={showPassword}
          value={formatValue(value)}
          placeholder={placeholder}
          onChangeText={handleTextChange}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          mask={mask}
        />
        {isPassword && (
          <Styles.ShowPassword onPress={() => setShowPassword(!showPassword)}>
            <Icon
              name={showPassword ? 'eye' : 'eye-off'}
              color="black"
              size={height * 0.03}
            />
          </Styles.ShowPassword>
        )}
      </Styles.CustomInputContainer>

      {hasSubmitted && error && (
        <Styles.ErrorMessage>{error}</Styles.ErrorMessage>
      )}
    </Styles.WrapperInput>
  );
};

const getKeyboardType = (inputType: string, defaultKeyboardType?: string) => {
  switch (inputType) {
    case 'number':
      return 'numeric';
    case 'date':
      return 'default';
    default:
      return defaultKeyboardType || 'default';
  }
};

const formatValue = (value: any): string => {
  if (value instanceof Date) {
    return value.toLocaleDateString();
  } else if (typeof value === 'number') {
    return value.toString();
  } else {
    return value || '';
  }
};
