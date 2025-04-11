import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';

const categorias = [
  '⚙️ Lógica de programación',
  '🧠 Algoritmos',
  '🕸️ Redes',
  '🧩 Bases de datos',
  '🧮 Matemática computacional',
];

export default function InicioScreen() {
  const navigation = useNavigation();

  const [categoriaActual, setCategoriaActual] = useState('');

  useEffect(() => {
    // Elegir categoría aleatoria al montar
    const random = categorias[Math.floor(Math.random() * categorias.length)];
    setCategoriaActual(random);
  }, []);

  return (
    <ImageBackground
      source={require('../assets/imagenes/fondo.png')}
      style={styles.background}
      resizeMode="cover"
      imageStyle={{ backgroundColor: '#0a0a0a' }}
    >
      <View style={styles.overlay}>
        <Image
          source={require('../assets/imagenes/logo.png')}
          style={styles.avatar}
          resizeMode="contain"
        />

        <Text style={styles.title}>¡Bienvenido, Desarrollador!</Text>

        {/* Datos del jugador */}
        <View style={styles.statsBox}>
          <Text style={styles.statText}>🔥 Racha actual: <Text style={styles.bold}>3</Text></Text>
          <Text style={styles.statText}>💰 Monedas: <Text style={styles.bold}>150</Text></Text>
          <Text style={styles.statText}>🧠 Nivel: <Text style={styles.bold}>Intermedio</Text></Text>
        </View>

        {/* Categoría aleatoria */}
        <Text style={styles.subtext}>Categoría seleccionada:</Text>
        <Text style={styles.randomCategory}>{categoriaActual}</Text>

        {/* Botones */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Categoria' as never)}
        >
          <Text style={styles.buttonText}>🎮 Jugar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.secondaryButton]}
          onPress={() => navigation.navigate('Perfil' as never)}
        >
          <Text style={styles.buttonText}>👤 Perfil</Text>
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
    backgroundColor: 'rgba(10, 10, 10, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  avatar: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  title: {
    color: '#00ff88',
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  statsBox: {
    backgroundColor: '#1a1a1a',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    width: '100%',
  },
  statText: {
    color: '#ccc',
    fontSize: 14,
    marginBottom: 5,
  },
  bold: {
    color: '#00ff88',
    fontWeight: 'bold',
  },
  subtext: {
    color: '#aaa',
    marginTop: 10,
    marginBottom: 5,
    fontSize: 14,
  },
  randomCategory: {
    color: '#00ff88',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#00ff88',
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 12,
    marginVertical: 10,
  },
  secondaryButton: {
    backgroundColor: '#1a1a1a',
    borderWidth: 1,
    borderColor: '#00ff88',
  },
  buttonText: {
    color: '#0a0a0a',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
