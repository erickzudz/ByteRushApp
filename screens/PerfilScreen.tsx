import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function PerfilScreen() {
  const [nombreUsuario, setNombreUsuario] = useState('Player001');
  const [nuevoNombre, setNuevoNombre] = useState(nombreUsuario);

  const handleGuardar = () => {
    // Aquí iría lógica para guardar en Firebase
    setNombreUsuario(nuevoNombre);
  };

  return (
    <ImageBackground
      source={require('../assets/imagenes/fondo.png')}
      style={styles.container}
      resizeMode="cover"
      imageStyle={{ opacity: 1 }}
    >
      <View style={styles.profileBox}>
        <Image
          source={require('../assets/imagenes/logo.png')} // Avatar por defecto
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

        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>🔥 Racha</Text>
            <Text style={styles.statValue}>3</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>🧠 Nivel</Text>
            <Text style={styles.statValue}>Intermedio</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>💰 Monedas</Text>
            <Text style={styles.statValue}>150</Text>
          </View>
        </View>

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
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 30,
  },
  statBox: {
    backgroundColor: '#1a1a1a',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 4,
  },
  statLabel: {
    color: '#ccc',
    fontSize: 12,
    marginBottom: 4,
  },
  statValue: {
    color: '#00ff88',
    fontWeight: 'bold',
    fontSize: 14,
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
