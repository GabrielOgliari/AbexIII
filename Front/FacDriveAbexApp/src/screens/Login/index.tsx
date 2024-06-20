import { View } from 'react-native';
import { Button } from '../../components/UI/atoms/Button';
import { Container } from '../../components/UI/atoms/Container';
import { Fields } from '../../components/UI/organisms/Fields/root';
import { useForm } from '../../hooks/useForm';
import { width } from '../../utils/dimensions';
import { isEmpty } from '../../utils/validators/isEmpty';
import { isValidEmail } from '../../utils/validators/isValidEmail';

type LoginForm = {
  email: string;
  password: string;
};

export const Login = () => {
  // const { mutateAsync } = useMutation({
  //   mutationFn: () => {
  //     const email = watch('email');
  //     const password = watch('password');
  //     return loginService.authentication({ email, password });
  //   },
  // });

  const { register, watch, applyValidations } = useForm<LoginForm>({
    validations: {
      email: value => {
        if (isEmpty(value)) return 'Por favor, insira o seu e-mail.';
        if (!isValidEmail(value)) return 'Por favor, insira um e-mail válido.';
      },
      password: value => {
        if (isEmpty(value)) return 'Por favor, insira a sua senha.';
      },
    },
  });

  const handlePressEntryButton = () => {
    if (applyValidations()) {
      // mutateAsync();
    }
  };

  return (
    <Container title="Login">
      <View style={{ gap: width * 0.08 }}>
        <Fields.Input label="Email" {...register('email')} />

        <Fields.Input label="Senha" {...register('password')} />
      </View>

      <View style={{ gap: width * 0.08, marginBottom: width * 0.08 }}>
        <Button
          label="Entrar"
          labelColor="white"
          backgroundColor="#002039"
          onPress={handlePressEntryButton}
        />
      </View>
    </Container>
  );
};
