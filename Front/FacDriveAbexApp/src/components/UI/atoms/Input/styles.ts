import MaskInput from 'react-native-mask-input';
import styled from 'styled-components/native';
import { height, width } from '../../../../utils/dimensions.ts';

export const Wrapper = styled.TouchableOpacity<{
  $isFocused: boolean;
  $blocked: boolean;
  $size: 'sm' | 'lg';
}>`
  width: ${({ $size }) => {
    if ($size === 'sm') return `${width / 2.3}px`;
    if ($size === 'lg') return `${width * 0.9}px`;
  }};

  height: ${height * 0.08}px;

  background-color: ${({ $blocked }) => ($blocked ? '#ddd' : 'white')};
  border-radius: 22px;
  border: ${({ $isFocused }) => ($isFocused ? '2px #24C2F9' : '1px #000')};
  flex-direction: row;
`;

export const Input = styled(MaskInput)`
  flex: 1;

  padding-left: 32px;
  padding-right: 32px;

  font-size: ${width * 0.045}px;

  color: #000;
`;

export const ShowPassword = styled.TouchableOpacity`
  width: 15%;
  height: 100%;
  align-items: center;
  justify-content: center;
`;
