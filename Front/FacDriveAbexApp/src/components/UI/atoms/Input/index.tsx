import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { height } from '../../../../utils/dimensions.ts';
import * as Styles from './styles.ts';

export type InputProps = {
  label: string;
  placeholder?: string;
  value: any;
  onChange: (value: any) => void;
  mode: 'default' | 'password';
  keyboard?: 'default' | 'numeric' | 'email-address' | 'phone-pad';
  type?: 'text' | 'number' | 'date';
  readOnly?: boolean;
  blocked?: boolean;
  size?: 'sm' | 'lg';
  mask?: (string | RegExp)[];
};

export const Input = ({
  label,
  placeholder,
  onChange,
  value,
  mode = 'default',
  blocked = false,
  readOnly,
  keyboard,
  type = 'text',
  size = 'lg',
  mask,
}: InputProps) => {
  const [isFocus, setIsFocus] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleTextChange = (text: string) => {
    switch (type) {
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
    <Styles.Wrapper $isFocused={isFocus} $blocked={blocked} $size={size}>
      <Styles.Input
        keyboardType={getKeyboardType(type, keyboard)}
        readOnly={readOnly}
        editable={!blocked}
        autoComplete="off"
        placeholderTextColor="#6C6C6C"
        secureTextEntry={showPassword}
        value={formatValue(value)}
        placeholder={placeholder ?? label}
        onChangeText={handleTextChange}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        mask={mask}
      />

      {mode === 'password' && (
        <Styles.ShowPassword onPress={() => setShowPassword(!showPassword)}>
          <Icon
            name={showPassword ? 'eye' : 'eye-off'}
            color="black"
            size={height * 0.03}
          />
        </Styles.ShowPassword>
      )}
    </Styles.Wrapper>
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
