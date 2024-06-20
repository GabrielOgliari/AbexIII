import styled from 'styled-components/native';
import { height, width } from '../../../../utils/dimensions';

export const Label = styled.Text`
  padding-left: 6px;
  padding-right: 6px;
  color: #000;
  font-size: ${height * 0.018}px;
`;

export const WrapperInput = styled.View`
  gap: ${width * 0.02};
`;

export const ErrorMessage = styled.Text<{ $size: 'sm' | 'lg' }>`
  font-size: 16px;
  font-weight: 400;
  color: red;

  width: ${({ $size }) => {
    if ($size === 'sm') return `${width / 2.3}px`;
  }};

  word-break: break-all;
`;
