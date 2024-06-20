import { ReactNode } from 'react';
import * as Styles from './styles';

export type WrapperFieldProps = {
  children: ReactNode;
  hasSubmitted: boolean;
  errorMessage: string;
  size: 'sm' | 'lg';
  label?: string;
};

export const WrapperField = ({
  children,
  hasSubmitted,
  errorMessage,
  size = 'lg',
  label,
}: WrapperFieldProps) => {
  const isShowErrorMessage = hasSubmitted && errorMessage;

  return (
    <Styles.WrapperInput>
      <Styles.Label>{hasSubmitted ? `* ${label}` : label}</Styles.Label>

      {children}

      {isShowErrorMessage && (
        <Styles.ErrorMessage $size={size}>{errorMessage}</Styles.ErrorMessage>
      )}
    </Styles.WrapperInput>
  );
};
