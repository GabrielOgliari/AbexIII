import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {LoginScreen} from "../screens/Login";
import {Presentation} from "../screens/Presentation";
import { AddressScreen } from '../screens/sign-up/address-screen';
import { EmailAndPasswordScreen } from '../screens/sign-up/email-and-password-screen';
import { PersonalDetailsScreen } from '../screens/sign-up/personal-details-screen';
import { StudentIdScreen } from '../screens/sign-up/student-id-screen';
import { VehicleScreen } from '../screens/sign-up/vehicle-registration-screen';

const Stack = createNativeStackNavigator();

export const Navigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="presentation"
        screenOptions={{ headerShown: false }}
      >
        {/* Presentation */}

        <Stack.Screen name="presentation" component={Presentation} />

        {/* SignUp */}

        <Stack.Screen
          name="email-and-password"
          component={EmailAndPasswordScreen}
        />

        <Stack.Screen name="student-id" component={StudentIdScreen} />

        <Stack.Screen
          name="personal-details"
          component={PersonalDetailsScreen}
        />

        <Stack.Screen name="address" component={AddressScreen} />

        <Stack.Screen name="vehicle" component={VehicleScreen} />

        {/* Login */}

        <Stack.Screen name="login" component={LoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
