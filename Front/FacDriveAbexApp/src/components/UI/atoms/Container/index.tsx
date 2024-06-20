// import { useNavigation } from '@react-navigation/native';
import React, { ReactNode } from 'react';
import { ScrollView } from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';
import * as Styles from './styles';

type ContainerProps = {
  title: string;
  children: ReactNode;
};

export const Container = ({ title, children }: ContainerProps) => {
  return (
    <Styles.Container>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        {title && <Styles.Title>{title}</Styles.Title>}

        {children}
      </ScrollView>
    </Styles.Container>
  );
};

// type screenLabelComponent = {
//   previousScreen: string;
//   label: string;
// };
// const ScreenLabelComponent = ({ previousScreen, label }) => {
//   const { navigate } = useNavigation();

//   return (
//     <Styles.ScreenLabelContainer>
//       <Styles.BackButton onPress={() => navigate(previousScreen)}>
//         <Icon name={'arrow-back'} size={30} color={'black'} />
//       </Styles.BackButton>
//       <Styles.ScreenLabel>{label}</Styles.ScreenLabel>
//     </Styles.ScreenLabelContainer>
//   );
// };
