import { Input, InputProps } from '../../atoms/Input';
import { WrapperField, WrapperFieldProps } from '../../atoms/WrapperField';

type Props = InputProps & Omit<WrapperFieldProps, 'children'>;

export const InputField = ({
  errorMessage,
  hasSubmitted,
  size,
  label,
  ...props
}: Props) => {
  return (
    <WrapperField
      errorMessage={errorMessage}
      hasSubmitted={hasSubmitted}
      size={size}
      label={label}
    >
      <Input size={size} label={label} {...props} />
    </WrapperField>
  );
};
