import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { useForm } from '../../hooks/useForm';
import { isEmpty } from '../../utils/validators/isEmpty';
import { isValidEmail } from '../../utils/validators/isValidEmail';
import * as Styles from './styles';

type LoginForm = {
  email: string;
  password: string;
};

export const LoginScreen = () => {
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

  const handleClickEntryButton = () => {
    if (applyValidations()) {
      // mutateAsync();
    }
  };

  return (
    <Styles.Wrapper>
      <Styles.Title>Login</Styles.Title>

      <Styles.WrapperFields>
        <Input placeholder="Email" {...register('email')} label={"Email"}/>

        <Input placeholder="Senha" {...register('password')} label={"Senha"}/>

        <Button
          label="Entrar"
          labelColor="white"
          backGroundColor="#002039"
          onPress={handleClickEntryButton}
        />
      </Styles.WrapperFields>
    </Styles.Wrapper>
  );
};
