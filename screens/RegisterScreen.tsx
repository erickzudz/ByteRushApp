import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { collection, doc, getDocs, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/firebaseConfig';
import { Ionicons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';

export default function RegisterScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const showToast = (msg: string, type: 'success' | 'error') => {
    Toast.show({
      type,
      text1: msg,
      position: 'top',
      topOffset: 60,
      visibilityTime: 2500,
    });
  };

  const handleRegister = async () => {
    const cleanEmail = email.trim();
    const cleanPassword = password.replace(/\s+/g, '');
    const cleanConfirm = confirm.replace(/\s+/g, '');

    if (!cleanEmail || !cleanPassword || !cleanConfirm) {
      showToast('Por favor, completa todos los campos.', 'error');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      showToast('Ingresa un correo electrónico válido.', 'error');
      return;
    }

    if (cleanPassword.length < 8) {
      showToast('La contraseña debe tener al menos 8 caracteres.', 'error');
      return;
    }

    if (cleanPassword !== cleanConfirm) {
      showToast('Las contraseñas no coinciden.', 'error');
      return;
    }

    try {
      const userCred = await createUserWithEmailAndPassword(auth, cleanEmail, cleanPassword);

      const usuariosSnap = await getDocs(collection(db, 'usuarios'));
      const totalUsuarios = usuariosSnap.size;
      const nickname = `Jugador ${totalUsuarios + 1}`;

      await setDoc(doc(db, 'usuarios', userCred.user.uid), {
        uid: userCred.user.uid,
        email: userCred.user.email,
        nickname,
        racha: 0,
        monedas: 100,
        nivel: 'Principiante',
        vidas: 3,
        creadoEn: new Date(),
      });

      await sendEmailVerification(userCred.user);
      showToast('Correo de verificación enviado.', 'success');
      navigation.navigate('VerifyEmail' as never);
    } catch (error: any) {
      const msg = error.code === 'auth/email-already-in-use'
        ? 'Este correo ya está registrado.'
        : 'Ocurrió un error al registrarse.';
      showToast(msg, 'error');
    }
  };

  return (
    <ImageBackground
      source={require('../assets/imagenes/fondo.png')}
      style={styles.background}
      resizeMode="cover"
      imageStyle={{ backgroundColor: '#0a0a0a' }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
          <Text style={styles.title}>Crear cuenta</Text>

          <TextInput
            placeholder="Correo electrónico"
            placeholderTextColor="#aaa"
            style={styles.input}
            value={email}
            onChangeText={(text) => setEmail(text.replace(/\s+/g, ''))}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Contraseña"
              placeholderTextColor="#aaa"
              style={styles.inputField}
              value={password}
              onChangeText={(text) => setPassword(text.replace(/\s+/g, ''))}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eye}>
              <Ionicons name={showPassword ? 'eye' : 'eye-off'} size={22} color="#aaa" />
            </TouchableOpacity>
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Confirmar contraseña"
              placeholderTextColor="#aaa"
              style={styles.inputField}
              value={confirm}
              onChangeText={(text) => setConfirm(text.replace(/\s+/g, ''))}
              secureTextEntry={!showConfirm}
              autoCapitalize="none"
            />
            <TouchableOpacity onPress={() => setShowConfirm(!showConfirm)} style={styles.eye}>
              <Ionicons name={showConfirm ? 'eye' : 'eye-off'} size={22} color="#aaa" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>Registrarse</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.linkText}>
              ¿Ya tienes cuenta? <Text style={styles.linkBold}>Inicia sesión</Text>
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    backgroundColor: 'rgba(10,10,10,0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingTop: 60,
    paddingBottom: 40,
  },
  title: {
    color: '#00ff88',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  inputContainer: {
    width: '100%',
    position: 'relative',
    marginBottom: 15,
  },
  inputField: {
    width: '100%',
    height: 50,
    backgroundColor: '#1a1a1a',
    borderRadius: 10,
    paddingHorizontal: 15,
    color: '#fff',
    borderWidth: 1,
    borderColor: '#2e2e2e',
    paddingRight: 40,
  },
  eye: {
    position: 'absolute',
    right: 12,
    top: 14,
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
    paddingHorizontal: 60,
    borderRadius: 10,
    marginVertical: 20,
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
