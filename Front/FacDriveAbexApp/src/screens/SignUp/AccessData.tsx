import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';
import { useMutation } from 'react-query';
import { Button } from '../../components/UI/atoms/Button';
import { Container } from '../../components/UI/atoms/Container';
import { FullScreenLoader } from '../../components/UI/atoms/FullScreenLoader';
import { Fields } from '../../components/UI/organisms/Fields/root';
import { useFormStateContext } from '../../context/useFormStateContext';
import { dispatchToast } from '../../helpers/dispatchToast';
import { useForm } from '../../hooks/useForm';
import signUpService from '../../services/sign-up/sign-up-service';
import { width } from '../../utils/dimensions';
import { isEmpty } from '../../utils/validators/isEmpty';
import { isValidInstitutionalEmail } from '../../utils/validators/isValidInstitutionalEmail';
import { ProgressCar } from './components/ProgressCar';

export type AccessDataForm = {
  email: string;
  password: string;
  passwordConfirmation: string;
};

export const AccessData = () => {
  const { setObject } = useFormStateContext();

  const { navigate } = useNavigation();

  const { object, register, applyValidations, watch } = useForm<AccessDataForm>(
    {
      validations: {
        email: value => {
          if (isEmpty(value))
            return 'Por favor, insira o seu e-mail institucional.';
          if (!isValidInstitutionalEmail(value))
            return 'Por favor, insira um e-mail institucional válido.';
        },
        password: value => {
          if (isEmpty(value)) return 'Por favor, insira a sua senha.';
        },
        passwordConfirmation: value => {
          if (isEmpty(value))
            return 'Por favor, insira a sua senha de confirmação.';
          if (watch('password') !== watch('passwordConfirmation'))
            return 'As senhas devem ser iguais.';
        },
      },
    },
  );

  const verifyEmailAlreadyRegisteredMutation = useMutation({
    mutationKey: ['verify-email-already-registered', watch('email')],
    mutationFn: () =>
      signUpService.verifyEmailAlreadyRegistered(watch('email') as string),
  });

  const handlePressContinueButton = async () => {
    const isValidForm = applyValidations();

    if (!isValidForm) {
      dispatchToast('O formulário possui dados incorretos.');
      return;
    }

    try {
      const { emailAlreadyRegistered } =
        await verifyEmailAlreadyRegisteredMutation.mutateAsync();

      if (emailAlreadyRegistered) {
        dispatchToast('E-mail já cadastrado. Por favor insira outro e-mail.');
        return;
      }

      setObject('ACCESS_DATA', object);
      navigate('USER_TYPE');
    } catch (error) {
      dispatchToast('Erro ao validar o e-mail. Tente novamente.');
    }
  };

  return (
    <Container title="Vamos Começar o Seu Cadastro">
      <FullScreenLoader
        loading={verifyEmailAlreadyRegisteredMutation.isLoading}
      />

      <View style={{ gap: width * 0.08 }}>
        <Fields.Input label="Email Institucional" {...register('email')} />

        <Fields.Input label="Senha" mode="password" {...register('password')} />

        <Fields.Input
          label="Confirmar Senha"
          readOnly={!watch('password')}
          mode="password"
          {...register('passwordConfirmation')}
        />
      </View>

      <View style={{ gap: width * 0.08, marginBottom: width * 0.08 }}>
        <ProgressCar currentStep={0} totalSteps={5} />

        <Button
          backgroundColor="#4ccbf8"
          label="Continuar"
          labelColor="black"
          onPress={handlePressContinueButton}
        />
      </View>
    </Container>
  );
};
