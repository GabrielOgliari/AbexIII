import React, { useState } from 'react';
import { View } from 'react-native';
import { useMutation, useQuery } from 'react-query';
import { Button } from '../../components/UI/atoms/Button';
import { Container } from '../../components/UI/atoms/Container';
import { FullScreenLoader } from '../../components/UI/atoms/FullScreenLoader';
import { Fields } from '../../components/UI/organisms/Fields/root';
import { useFormStateContext } from '../../context/useFormStateContext';
import { dispatchToast } from '../../helpers/dispatchToast';
import { useForm } from '../../hooks/useForm';
import signUpService from '../../services/sign-up/sign-up-service';
import { SaveSignUpData } from '../../services/sign-up/types/save-sign-up-data';
import { ValidStudentIdResponse } from '../../services/sign-up/types/valid-student-id';
import { VehicleResponse } from '../../services/sign-up/types/vehicle';
import { width } from '../../utils/dimensions';
import { isEmpty } from '../../utils/validators/isEmpty';
import { isValidYear } from '../../utils/validators/isValidYear';
import { AccessDataForm } from './AccessData';
import { AddressForm } from './Address';
import { PersonalDetailsForm } from './PersonalDetails';
import { ProgressCar } from './components/ProgressCar';
import { UserTypeEnum } from './enums/user-type-enum';

export type VehicleForm = {
  plate: string;
  color: string;
  manufacturingYear: number;
  modelYear: number;
  city: string;
  state: string;
};

export const Vehicle = () => {
  const [plateAlreadyRegistered, setPlateAlreadyRegistered] = useState<
    'ALREADY_REGISTERED' | 'NOT_REGISTERED' | 'NONE'
  >('NONE');

  const { getObject } = useFormStateContext();

  const { object, register, applyValidations, watch, setValue } =
    useForm<VehicleForm>({
      validations: {
        plate: value => {
          if (isEmpty(value)) return 'Por favor, insira o campo Placa.';
        },
        color: value => {
          if (isEmpty(value)) return 'Por favor, insira o campo Cor.';
        },
        manufacturingYear: value => {
          if (isEmpty(value))
            return 'Por favor, insira o campo Ano de Fabricação.';
        },
        modelYear: value => {
          if (isEmpty(value)) return 'Por favor, insira o campo Ano Modelo.';
          if (!isValidYear(value, 1900, new Date().getFullYear()))
            return 'O ano informado não é válido.';
        },
        city: value => {
          if (isEmpty(value)) return 'Por favor, insira o campo Cidade.';
        },
        state: value => {
          if (isEmpty(value)) return 'Por favor, insira o campo Estado.';
        },
      },
    });

  const vehicleByPlateQuery = useQuery(
    ['vehicle', watch('plate')],
    () => signUpService.vehicleByPlate(watch('plate')),
    {
      onSuccess: (data: VehicleResponse) => {
        setValue('color', data.color);
        setValue('manufacturingYear', data.manufacturingYear);
        setValue('modelYear', data.modelYear);
        setValue('city', data.city);
        setValue('state', data.state);
      },
      enabled:
        String(watch('plate')).length === 7 &&
        plateAlreadyRegistered === 'NOT_REGISTERED',
    },
  );

  const verifyVehicleHasAlreadyRegisteredQuery = useQuery(
    ['verify-plate', watch('plate')],
    () => signUpService.verifyVehicleHasAlreadyRegistered(watch('plate')),
    {
      onSuccess: ({ plateAlreadyRegistered }) => {
        const newState = plateAlreadyRegistered
          ? 'ALREADY_REGISTERED'
          : 'NOT_REGISTERED';
        setPlateAlreadyRegistered(newState);
        if (newState === 'ALREADY_REGISTERED') {
          dispatchToast('Placa já registrada.');
        }
      },
      enabled: String(watch('plate')).length === 7,
    },
  );

  const saveMutation = useMutation(
    (data: SaveSignUpData) => signUpService.save(data),
    {
      onError: error => console.error(error),
    },
  );

  const handlePressRegisterButton = () => {
    applyValidations();
    const { zipCode, state, city, complement, neighborhood, number, street } =
      getObject<AddressForm>('ADDRESS');
    const { email, password } = getObject<AccessDataForm>('ACCESS_DATA');
    const { name, surname, birthDate, gender, cpf, phone } =
      getObject<PersonalDetailsForm>('PERSONAL_DETAILS');
    const { userType } = getObject<{ userType: UserTypeEnum }>('USER_TYPE');
    const { registration } = getObject<ValidStudentIdResponse>('STUDENT_ID');

    if (plateAlreadyRegistered === 'NOT_REGISTERED') {
      saveMutation.mutateAsync({
        accessData: { institutionalEmail: email, password },
        user: {
          name,
          surname,
          birthDate,
          gender,
          cpf,
          phone,
          userType,
          registration,
        },
        address: {
          zipCode,
          state,
          city,
          complement,
          neighborhood,
          number,
          street,
        },
        vehicle: object,
      });
    } else {
      dispatchToast('Registro não permitido: Placa já registrada.');
    }
  };

  return (
    <Container title="Dados do Veículo">
      <FullScreenLoader
        loading={
          vehicleByPlateQuery.isLoading ||
          verifyVehicleHasAlreadyRegisteredQuery.isLoading
        }
      />
      <View style={{ gap: width * 0.08 }}>
        <Fields.Input label="Placa" {...register('plate')} />

        <Fields.Input label="Cor" {...register('color')} />

        <Fields.Input
          label="Ano Fabricação"
          {...register('manufacturingYear')}
        />

        <Fields.Input label="Ano Modelo" {...register('modelYear')} />

        <Fields.Input label="Cidade" {...register('city')} />

        <Fields.Input label="Estado" {...register('state')} />
      </View>
      <View style={{ gap: width * 0.08, marginBottom: width * 0.08 }}>
        <ProgressCar currentStep={5} totalSteps={5} />
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
