import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';
import { Masks } from 'react-native-mask-input';
import { useMutation } from 'react-query';
import { Button } from '../../components/UI/atoms/Button';
import { Container } from '../../components/UI/atoms/Container';
import { Fields } from '../../components/UI/organisms/Fields/root';
import { useFormStateContext } from '../../context/useFormStateContext';
import { useForm } from '../../hooks/useForm';
import signUpService from '../../services/sign-up/sign-up-service';
import { SendValidationData } from '../../services/sign-up/types/send-validation-data';
import { ValidStudentIdResponse } from '../../services/sign-up/types/valid-student-id';
import { width } from '../../utils/dimensions';
import { isEmpty } from '../../utils/validators/isEmpty';
import { isValidCpf } from '../../utils/validators/isValidCpf';
import { ProgressCar } from './components/ProgressCar';
import { GenderOptions } from './constants/gender-options';
import { GenderEnum } from './enums/gender-enum';

export type PersonalDetailsForm = {
  name: string;
  surname: string;
  birthDate: Date;
  gender: GenderEnum;
  cpf: string;
  phone: string;
};

export const PersonalDetails = () => {
  const { setObject, getObject } = useFormStateContext();

  const { navigate } = useNavigation();

  const { object, register, applyValidations, watch } =
    useForm<PersonalDetailsForm>({
      validations: {
        name: value => {
          if (isEmpty(value)) return 'Por favor, insira o seu Nome.';
        },
        surname: value => {
          if (isEmpty(value)) return 'Por favor, insira o seu Sobrenome.';
        },
        birthDate: value => {
          if (isEmpty(value))
            return 'Por favor, insira a sua Data de Nascimento.';
        },
        gender: value => {
          if (isEmpty(value)) return 'Por favor, insira o seu Gênero.';
        },
        cpf: value => {
          if (isEmpty(value)) return 'Por favor, insira o seu CPF.';
          if (!isValidCpf(value)) return 'Por favor, insira um CPF válido.';
        },
        phone: value => {
          if (isEmpty(value))
            return 'Por favor, insira o seu Número de Celular.';
        },
      },
    });

  const sendValidationDataMutation = useMutation({
    mutationFn: (data: SendValidationData) =>
      signUpService.sendValidationData(data),
    onError: error => console.error(error),
  });

  const handlePressRegisterButton = () => {
    if (applyValidations()) {
      const { birthDate, cpf, email, registration, status } =
        getObject<ValidStudentIdResponse>('STUDENT_ID');

      sendValidationDataMutation.mutateAsync({
        studentId: {
          birthDate,
          cpf,
          email,
          registration,
          status,
        },
        personalDetails: {
          name: watch('name'),
          surname: watch('surname'),
          birthDate: watch('birthDate'),
          gender: watch('gender'),
          cpf: watch('cpf'),
          phone: watch('phone'),
        },
      });

      setObject('PERSONAL_DETAILS', object);
      navigate('ADDRESS');
    }
  };

  return (
    <Container title="Dados Pessoais">
      <View style={{ gap: width * 0.08 }}>
        <Fields.Input {...register('name')} label="Nome" />

        <Fields.Input {...register('surname')} label="Sobrenome" />

        <Fields.Input
          {...register('cpf')}
          label="CPF"
          placeholder="000.000.000.00"
          keyboard="numeric"
          mask={Masks.BRL_CPF}
        />

        {/* Deve ser campo Data */}
        <Fields.Input
          {...register('birthDate')}
          label="Data de Nascimento"
          placeholder="01/02/2003"
          keyboard="numeric"
          mask={Masks.DATE_DDMMYYYY}
        />

        <Fields.Dropdown
          {...register('gender')}
          label="Gênero"
          options={GenderOptions}
        />

        <Fields.Input
          {...register('phone')}
          label="Número de Celular"
          placeholder="(12) 34567-8910"
          keyboard="numeric"
          mask={Masks.BRL_PHONE}
        />
      </View>

      <View style={{ gap: width * 0.08, marginBottom: width * 0.08 }}>
        <ProgressCar currentStep={3} totalSteps={5} />

        <Button
          backgroundColor="#4ccbf8"
          label="Cadastrar"
          labelColor="black"
          onPress={handlePressRegisterButton}
        />
      </View>
    </Container>
  );
};
