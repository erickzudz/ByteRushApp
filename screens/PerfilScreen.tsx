import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  ImageBackground,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { auth, db } from '../firebase/firebaseConfig';
import {
  doc,
  getDoc,
  updateDoc,
  collection,
  query,
  where,
  getDocs,
} from 'firebase/firestore';
import Toast from 'react-native-toast-message';

export default function PerfilScreen() {
  const navigation = useNavigation();
  const [nickname, setNickname] = useState('');
  const [nuevoNombre, setNuevoNombre] = useState('');

  useEffect(() => {
    const cargarNickname = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const ref = doc(db, 'usuarios', user.uid);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        const data = snap.data();
        setNickname(data.nickname || '');
        setNuevoNombre(data.nickname || '');
      }
    };

    cargarNickname();
  }, []);

  const handleGuardar = async () => {
    const user = auth.currentUser;
    if (!user) return;

    const nombreLimpio = nuevoNombre.trim();
    const regex = /^[a-zA-Z0-9_]{3,}$/;

    if (!nombreLimpio) {
      Toast.show({ type: 'error', text1: 'El nombre no puede estar vacío' });
      return;
    }

    if (!regex.test(nombreLimpio)) {
      Toast.show({
        type: 'error',
        text1: 'Solo letras, números o _ y mínimo 3 caracteres',
      });
      return;
    }

    if (nombreLimpio === nickname) return;

    try {
      const q = query(collection(db, 'usuarios'), where('nickname', '==', nombreLimpio));
      const result = await getDocs(q);
      const nicknameOcupado = result.docs.some((doc) => doc.id !== user.uid);

      if (nicknameOcupado) {
        Toast.show({ type: 'error', text1: 'Este nombre ya está en uso' });
        return;
      }

      await updateDoc(doc(db, 'usuarios', user.uid), {
        nickname: nombreLimpio,
      });

      setNickname(nombreLimpio);
      Toast.show({ type: 'success', text1: 'Nombre actualizado' });
    } catch (error) {
      Toast.show({ type: 'error', text1: 'Error al guardar el nombre' });
    }
  };

  return (
    <ImageBackground
      source={require('../assets/imagenes/fondo.png')}
      style={styles.container}
      resizeMode="cover"
      imageStyle={{ opacity: 1 }}
    >
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={24} color="#00ff88" />
      </TouchableOpacity>

      <View style={styles.profileBox}>
        <Image
          source={require('../assets/imagenes/logo.png')}
          style={styles.avatar}
        />

        <Text style={styles.label}>Nombre de usuario:</Text>
        <TextInput
          value={nuevoNombre}
          onChangeText={setNuevoNombre}
          style={styles.input}
          placeholderTextColor="#888"
        />

        <TouchableOpacity style={styles.saveButton} onPress={handleGuardar}>
          <Text style={styles.saveText}>Guardar cambios</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoutButton} onPress={() => console.log('Cerrar sesión')}>
          <Ionicons name="log-out-outline" size={20} color="#0a0a0a" />
          <Text style={styles.logoutText}>Cerrar sesión</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 30,
    zIndex: 10,
  },
  profileBox: {
    backgroundColor: 'rgba(10,10,10,0.85)',
    padding: 25,
    borderRadius: 16,
    width: '90%',
    alignItems: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  label: {
    color: '#aaa',
    fontSize: 14,
    alignSelf: 'flex-start',
  },
  input: {
    width: '100%',
    height: 45,
    borderRadius: 10,
    backgroundColor: '#1a1a1a',
    color: '#fff',
    paddingHorizontal: 12,
    marginTop: 5,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#333',
  },
  saveButton: {
    backgroundColor: '#00ff88',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginBottom: 25,
  },
  saveText: {
    color: '#0a0a0a',
    fontWeight: 'bold',
  },
  logoutButton: {
    flexDirection: 'row',
    backgroundColor: '#00ff88',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 10,
    alignItems: 'center',
    gap: 10,
  },
  logoutText: {
    color: '#0a0a0a',
    fontWeight: 'bold',
  },
});
