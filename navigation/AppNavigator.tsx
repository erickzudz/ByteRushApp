import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import SplashScreen from '../components/SplashScreen';
import InicioScreen from '../screens/InicioScreen';
import CategoriaScreen from '../screens/CategoriaScreen';
import JuegoScreen from '../screens/JuegoScreen';
import PerfilScreen from '../screens/PerfilScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';

export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  Inicio: undefined;
  Categoria: undefined;
  Juego: undefined;
  Perfil: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

type SplashProps = NativeStackScreenProps<RootStackParamList, 'Splash'>;

function SplashWrapper({ navigation }: SplashProps) {
  return <SplashScreen onFinish={() => navigation.replace('Login')} />;
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'fade', // 👈 transición suave
          contentStyle: {
            backgroundColor: '#0a0a0a', // 👈 fondo para evitar parpadeos blancos
          },
        }}
      >
        <Stack.Screen name="Splash" component={SplashWrapper} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="Inicio" component={InicioScreen} />
        <Stack.Screen name="Categoria" component={CategoriaScreen} />
        <Stack.Screen name="Juego" component={JuegoScreen} />
        <Stack.Screen name="Perfil" component={PerfilScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
