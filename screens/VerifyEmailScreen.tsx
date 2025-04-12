import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getAuth, sendEmailVerification } from 'firebase/auth';
import Toast from 'react-native-toast-message';

export default function VerifyEmailScreen() {
  const navigation = useNavigation();
  const auth = getAuth();

  const handleVerificacion = async () => {
    await auth.currentUser?.reload();
    if (auth.currentUser?.emailVerified) {
      Toast.show({
        type: 'success',
        text1: 'Correo verificado. ¡Bienvenido!',
      });
      navigation.navigate('Inicio' as never);
    } else {
      Toast.show({
        type: 'error',
        text1: 'Tu correo aún no está verificado.',
      });
    }
  };

  const handleReenviar = async () => {
    try {
      await sendEmailVerification(auth.currentUser!);
      Toast.show({
        type: 'success',
        text1: 'Correo reenviado con éxito.',
      });
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: 'Error al reenviar correo.',
      });
    }
  };

  return (
    <ImageBackground
      source={require('../assets/imagenes/fondo.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Image
          source={require('../assets/imagenes/email-verification.png')}
          style={styles.image}
        />
        <Text style={styles.title}>¡Verifica tu correo!</Text>
        <Text style={styles.subtitle}>
          Te enviamos un correo de verificación. Haz clic en el enlace para activar tu cuenta.
        </Text>

        <TouchableOpacity style={styles.button} onPress={handleVerificacion}>
          <Text style={styles.buttonText}>Ya verifiqué mi correo</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.link} onPress={handleReenviar}>
          <Text style={styles.linkText}>¿No recibiste el correo? Reenviar</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(10,10,10,0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 32,
  },
  title: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#aaa',
    textAlign: 'center',
    marginBottom: 24,
  },
  button: {
    backgroundColor: '#00ff88',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginBottom: 16,
  },
  buttonText: {
    color: '#0a0a0a',
    fontWeight: 'bold',
  },
  link: {
    padding: 8,
  },
  linkText: {
    color: '#00ff88',
    textDecorationLine: 'underline',
  },
});
