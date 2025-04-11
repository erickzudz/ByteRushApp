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

export default function VerifyEmailScreen() {
  const navigation = useNavigation();

  return (
    <ImageBackground
      source={require('../assets/imagenes/fondo.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Image
          source={require('../assets/imagenes/email-verification.png')} // opcional, reemplazalo si no tenés uno
          style={styles.image}
        />
        <Text style={styles.title}>¡Verifica tu correo!</Text>
        <Text style={styles.subtitle}>
          Te enviamos un correo de verificación. Haz clic en el enlace para activar tu cuenta.
        </Text>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Inicio' as never)}>
          <Text style={styles.buttonText}>Ya verifiqué mi correo</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.link} onPress={() => {}}>
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
