import styled from 'styled-components/native';
import { height, width } from '../../utils/functions.ts';
import MaskInput from 'react-native-mask-input';

export const WrapperInput = styled.View`
    margin-bottom: 10px;
`;

export const CustomInputContainer = styled.TouchableOpacity<{
  isFocused: boolean;
  halfInput: boolean;
  blocked: boolean;
}>`
  width: ${props => (props.halfInput ? width * 0.42 : width * 0.9)}px;
  height: ${height * 0.08}px;
  background-color: ${props => (props.blocked ? '#ddd' : 'white')};
  border-radius: 22px;
  border: ${props => (props.isFocused ? '2px #24C2F9' : '1px #000')};
  flex-direction: row;
  margin-bottom: 4px;
  margin-top: 4px;
`;

export const Input = styled(MaskInput)`
  flex: 1;
  padding-left: 8%;
  padding-right: 8%;
  font-size: ${height * 0.02}px;
  color: #000;
`;

export const ShowPassword = styled.TouchableOpacity`
  width: 15%;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

export const InputLabel = styled.Text`
  padding-left: 6px;
  padding-right: 6px;
  color: #000;
  font-size: ${height * 0.018}px;
`;

export const ErrorMessage = styled.Text`
  font-size: 16px;
  font-weight: 400;
  color: red;
`;
