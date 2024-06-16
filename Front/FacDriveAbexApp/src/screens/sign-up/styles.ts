import { KeyboardAvoidingView, Platform } from 'react-native';
import styled from 'styled-components/native';
import { width } from '../../utils/functions.ts';

export const SignUpContainer = styled(KeyboardAvoidingView).attrs({
  behavior: Platform.OS === 'ios' ? 'padding' : 'height',
})`
  flex: 1;
  justify-content: space-around;
  align-items: center;
  background-color: white;
`;

export const ScreenLabel = styled.Text`
  font-size: 36px;
  font-weight: bold;
  color: black;
  width: ${width * 0.9}px;
`;

export const InputsView = styled.View`
  align-items: center;
  justify-content: center;
`;

export const ScrollViewContainer = styled.ScrollView`
  flex-grow: 1;
`;

export const HalfInputView = styled.View`
  width: ${width * 0.9}px;
`;

export const ScreenLabelContainer = styled.View`
  flex-direction: row;
`;

export const BackButton = styled.TouchableOpacity`
  height: 40px;
  width: 40px;
  align-items: center;
  justify-content: center;
`;
