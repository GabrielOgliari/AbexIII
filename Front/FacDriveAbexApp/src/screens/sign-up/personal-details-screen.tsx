import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Button } from '../../components/Button/index.tsx';
import { Input } from '../../components/Input/index.tsx';
import { LoadingCar } from '../../components/LoadingCar/index.tsx';
import { useForm } from '../../hooks/useForm.ts';
import { isEmpty } from '../../utils/validators/isEmpty.ts';
import { isValidCpf } from '../../utils/validators/isValidCpf.ts';
import { Masks } from 'react-native-mask-input';
import * as Styles from './styles.ts';
import {ScreenLabelComponent} from "./ScreenLabelComponent.tsx";

type PersonalDetailsForm = {
  name: string;
  cpf: string;
  birthDate: Date;
  cellPhone: string
};

export const PersonalDetailsScreen = () => {
  const { navigate } = useNavigation();

  const { register, applyValidations } = useForm<PersonalDetailsForm>({
    validations: {
      name: value => {
        if (isEmpty(value)) return 'Por favor, insira o seu Nome.';
      },
      cpf: value => {
        if (isEmpty(value)) return 'Por favor, insira o seu CPF.';
        if (isValidCpf('132.291.791-18'))
          return 'Por favor, insira um CPF válido.';
      },
      birthDate: value => {
        if (isEmpty(value))
          return 'Por favor, insira a sua Data de Nascimento.';
      },
      cellPhone: value => {
        if(isEmpty(value))
          return 'Por favor, insira seu número de telefone.'
      }
    },
  });

  const handleClickRegisterButton = () => {
    if (applyValidations()) {
      navigate('address');
    }
  };

  return (
    <Styles.SignUpContainer>
      <Styles.ScrollViewContainer
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-around' }}
      >
        <ScreenLabelComponent previousScreen={'student-id'} label={'Informe seus dados pessoais'}/>

        <Styles.InputsView>
          <Input {...register('name')} placeholder="Nome Completo" label={"Nome Completo"}/>

          <Input
            {...register('cpf')}
            placeholder="000.000.000.00"
            label={"CPF"}
            keyboardType="numeric"
            mask={Masks.BRL_CPF}
          />

          {/* Deve ser campo Data */}
          <Input
            {...register('birthDate')}
            placeholder="01/02/2003"
            keyboardType="numeric"
            label={"Data de Nascimento"}
            mask={Masks.DATE_DDMMYYYY}
          />
          <Input
            {...register('cellPhone')}
            placeholder="(12) 34567-8910"
            keyboardType="numeric"
            label={"Número de celular"}
            mask={Masks.BRL_PHONE}
          />
        </Styles.InputsView>

        <LoadingCar iniciaLeft={100} finalLeft={170} />

        <Button
          backGroundColor="#4ccbf8"
          label="Cadastrar"
          labelColor="black"
          onPress={handleClickRegisterButton}
        />
      </Styles.ScrollViewContainer>
    </Styles.SignUpContainer>
  );
};
