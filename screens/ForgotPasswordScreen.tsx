import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ImageBackground,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
  } from 'react-native';
  import { useNavigation } from '@react-navigation/native';
  import { useState } from 'react';
  
  export default function ForgotPasswordScreen() {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
  
    return (
      <ImageBackground
        source={require('../assets/imagenes/fondo.png')}
        style={styles.background}
        resizeMode="cover"
        imageStyle={{ backgroundColor: '#0a0a0a' }} // ✅ evita flash blanco
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={{ flex: 1 }}
        >
          <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
            <Text style={styles.title}>Recuperar contraseña</Text>
  
            <TextInput
              placeholder="Correo electrónico"
              placeholderTextColor="#aaa"
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
  
            <TouchableOpacity style={styles.button} onPress={() => console.log('Enviar recuperación')}>
              <Text style={styles.buttonText}>Enviar enlace</Text>
            </TouchableOpacity>
  
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={styles.linkText}>Volver al inicio</Text>
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
      fontSize: 26,
      fontWeight: 'bold',
      marginBottom: 30,
    },
    input: {
      width: '100%',
      height: 50,
      backgroundColor: '#1a1a1a',
      borderRadius: 10,
      paddingHorizontal: 15,
      color: '#fff',
      marginBottom: 20,
      borderWidth: 1,
      borderColor: '#2e2e2e',
    },
    button: {
      backgroundColor: '#00ff88',
      paddingVertical: 15,
      paddingHorizontal: 60,
      borderRadius: 10,
      marginBottom: 20,
    },
    buttonText: {
      color: '#0a0a0a',
      fontWeight: 'bold',
      fontSize: 16,
    },
    linkText: {
      color: '#aaa',
      fontSize: 14,
    },
  });
  