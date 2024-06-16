import { useNavigation } from '@react-navigation/native';
import { useMutation } from '@tanstack/react-query';
import React, { useState } from 'react';
import { launchImageLibrary } from 'react-native-image-picker';
import { Button } from '../../components/Button/index.tsx';
import { FetchDataButton } from '../../components/FetchDataButton/index.tsx';
import { LoadingCar } from '../../components/LoadingCar/index.tsx';
import studentIdService from '../../core/services/sign-up/student-id-service.ts';
import { ValidStudentIdResponse } from '../../core/services/sign-up/types/valid-student-id.ts';
import { dispatchToast } from '../../helpers/dispatch-toast.ts';
import * as Styles from './styles.ts';
import {ScreenLabelComponent} from "./ScreenLabelComponent.tsx";

export const StudentIdScreen = () => {
  const { navigate } = useNavigation();

  const [base64, setBase64] = useState('');
  const [currentImage, setCurrentImage] = useState('');

  const handleImagePicker = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: true,
      },
      ({ didCancel, errorCode, assets }) => {
        if (didCancel) {
          dispatchToast('Seleção de imagem cancelada.');
          return;
        }
        if (errorCode) {
          dispatchToast(`Erro ao selecionar imagem: ${errorCode}`);
          return;
        }
        if (assets && assets[0].base64) {
          setCurrentImage(assets[0].uri ?? '');
          setBase64(assets[0].base64);
        }
      },
    );
  };

  const validStudentCardMutation = useMutation({
    mutationFn: () => studentIdService.validStudentId(base64),
    onSuccess: (data: ValidStudentIdResponse) => {
      const verified = data.status === 'Aluno Regular';
      dispatchToast(verified ? 'Aluno Regular.' : 'Aluno Irregular.');

      if (verified) navigate('personal-details');
    },
    onError: () => dispatchToast('Erro ao verificar Aluno. Tente novamente.'),
  });

  const handleClickContinueButton = async () => {
    if (!base64) {
      dispatchToast(
        'Por favor, selecione uma imagem da carteirinha de estudante.',
      );
      return;
    }

    validStudentCardMutation.mutateAsync();
  };

  return (
    <Styles.SignUpContainer>
      <Styles.ScrollViewContainer
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-around' }}
      >
        <ScreenLabelComponent previousScreen={'email-and-password'} label={"Informações adicionais"}/>

        <FetchDataButton
          onPress={handleImagePicker}
          label={currentImage ? currentImage : 'Carteirinha de estudante'}
          iconName="upload"
        />

        <LoadingCar iniciaLeft={0} finalLeft={100} />

        <Button
          backGroundColor="#4ccbf8"
          label="Continuar"
          labelColor="black"
          onPress={handleClickContinueButton}
          disabled={!base64}
        />
      </Styles.ScrollViewContainer>
    </Styles.SignUpContainer>
  );
};
