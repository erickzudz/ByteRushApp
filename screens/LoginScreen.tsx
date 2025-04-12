import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';

export default function LoginScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <ImageBackground
      source={require('../assets/imagenes/fondo.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <KeyboardAvoidingView
        style={styles.keyboardAvoiding}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.overlay}
          keyboardShouldPersistTaps="handled"
        >
          <Image
            source={require('../assets/imagenes/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />

          <TextInput
            placeholder="Correo electrónico"
            placeholderTextColor="#aaa"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <TextInput
            placeholder="Contraseña"
            placeholderTextColor="#aaa"
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Inicio' as never)}>
            <Text style={styles.buttonText}>Iniciar sesión</Text>
          </TouchableOpacity>


          <TouchableOpacity onPress={() => navigation.navigate('Register' as never)}>
            <Text style={styles.linkText}>
              ¿No tienes cuenta? <Text style={styles.linkBold}>Regístrate</Text>
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword' as never)}>
            <Text style={[styles.linkText, { marginTop: 10 }]}>¿Olvidaste tu contraseña?</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#0a0a0a', // 👈 fondo de respaldo para evitar flash blanco
  },
  keyboardAvoiding: {
    flex: 1,
  },
  overlay: {
    flexGrow: 1,
    backgroundColor: 'rgba(10, 10, 10, 0.85)', // 👈 capa oscura
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingTop: 60,
    paddingBottom: 40,
  },
  logo: {
    width: 180,
    height: 180,
    marginBottom: 40,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#1a1a1a',
    borderRadius: 10,
    paddingHorizontal: 15,
    color: '#fff',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#2e2e2e',
  },
  button: {
    backgroundColor: '#00ff88',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 10,
    marginVertical: 10,
  },
  buttonText: {
    color: '#0a0a0a',
    fontWeight: 'bold',
    fontSize: 16,
  },
  linkText: {
    color: '#aaa',
    fontSize: 14,
    textAlign: 'center',
  },
  linkBold: {
    color: '#00ff88',
    fontWeight: 'bold',
  },
});
