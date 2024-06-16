import { useNavigation } from '@react-navigation/native';
import { useMutation } from '@tanstack/react-query';
import React from 'react';
import { Button } from '../../components/Button/index.tsx';
import { Input } from '../../components/Input/index.tsx';
import { LoadingCar } from '../../components/LoadingCar/index.tsx';
import emailAndPasswordService from '../../core/services/sign-up/email-and-password-service.ts';
import { dispatchToast } from '../../helpers/dispatch-toast.ts';
import { useForm } from '../../hooks/useForm.ts';
import { isEmpty } from '../../utils/validators/isEmpty.ts';
import * as Styles from './styles.ts';
import {ScreenLabelComponent} from "./ScreenLabelComponent.tsx";

type EmailAndPasswordForm = {
  email: string;
  password: string;
  passwordConfirmation: string;
};

export const EmailAndPasswordScreen = () => {
  const { navigate } = useNavigation();

  const { register, applyValidations, watch } = useForm<EmailAndPasswordForm>({
    validations: {
      email: value => {
        if (isEmpty(value))
          return 'Por favor, insira o seu e-mail institucional.';
        // if (!isValidInstitutionalEmail(value))
        //   return 'Por favor, insira um e-mail institucional válido.';
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
  });

  const validateEmailMutation = useMutation({
    mutationFn: () =>
      emailAndPasswordService.validateEmail(watch('email') as string),
  });

  const handleClickContinueButton = async () => {
    const isValidForm = applyValidations();

    if (!isValidForm) {
      dispatchToast('O formulário possui dados incorretos.');
      return;
    }

    try {
      const { emailAlreadyRegistered } =
        await validateEmailMutation.mutateAsync();

      console.log(emailAlreadyRegistered);

      if (emailAlreadyRegistered) {
        dispatchToast('E-mail já cadastrado. Por favor insira outro e-mail.');
        return;
      }

      navigate('student-id');
    } catch (error) {
      dispatchToast('Erro ao validar o e-mail. Tente novamente.');
    }
  };

  return (
    <Styles.SignUpContainer>
      <Styles.ScrollViewContainer
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-around', alignItems: "center"}}
      >
        <ScreenLabelComponent previousScreen={'presentation'} label={'Vamos começar o seu cadastro'}/>

        <Styles.InputsView>
          <Input placeholder="Email Institucional" {...register('email')} label={"Email Institucional"}/>
          <Input placeholder="Senha" {...register('password')} isPassword label={"Senha"}/>
          <Input
            label={"Confirmar Senha"}
            placeholder="Confirmar Senha"
            readOnly={!watch('password')}
            {...register('passwordConfirmation')}
            isPassword
          />
        </Styles.InputsView>

        <LoadingCar iniciaLeft={0} finalLeft={0} />

        <Button
          backGroundColor="#4ccbf8"
          label="Continuar"
          labelColor="black"
          onPress={handleClickContinueButton}
        />
      </Styles.ScrollViewContainer>
    </Styles.SignUpContainer>
  );
};
