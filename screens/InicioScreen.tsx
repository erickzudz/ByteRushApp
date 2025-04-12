import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from '@expo/vector-icons'; // 👈 Íconos

const categorias = [
  '⚙️ Lógica',
  '🧠 Algoritmos',
  '🕸️ Redes',
  '🧩 BD',
  '📐 Matemática',
];

export default function InicioScreen() {
  const navigation = useNavigation();
  const [categoria, setCategoria] = useState('');

  useEffect(() => {
    const random = categorias[Math.floor(Math.random() * categorias.length)];
    setCategoria(random);
  }, []);

  return (
    <ImageBackground
      source={require('../assets/imagenes/fondo.png')}
      style={styles.background}
      resizeMode="cover"
      imageStyle={{ backgroundColor: '#0a0a0a' }}
    >
      <View style={styles.container}>
        {/* 💚 Vidas con icono */}
        <View style={styles.lifeBadge}>
          <FontAwesome name="heart" size={16} color="#00ff88" />
          <Text style={styles.lifeText}> 3</Text>
        </View>

        {/* Botón perfil flotante */}
        <TouchableOpacity
          style={styles.profileButton}
          onPress={() => navigation.navigate('Perfil' as never)}
        >
          <Image
            source={require('../assets/imagenes/logo.png')}
            style={styles.profileIcon}
          />
        </TouchableOpacity>

        <Animatable.Image
          animation="fadeInDown"
          delay={300}
          source={require('../assets/imagenes/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />

        <Animatable.Text animation="fadeInUp" delay={700} style={styles.title}>
          ¡Bienvenido, Desarrollador!
        </Animatable.Text>

        <Animatable.View animation="fadeInUp" delay={1000} style={styles.statsBox}>
          <Text style={styles.statText}>
            🔥 Racha: <Text style={styles.bold}>3</Text>
          </Text>
          <Text style={styles.statText}>
            💰 Monedas: <Text style={styles.bold}>150</Text>
          </Text>
          <Text style={styles.statText}>
            🧠 Nivel: <Text style={styles.bold}>Intermedio</Text>
          </Text>
        </Animatable.View>

        <Text style={styles.subtext}>Categoría seleccionada:</Text>
        <Animatable.Text animation="pulse" iterationCount="infinite" style={styles.category}>
          {categoria}
        </Animatable.Text>
        <Animatable.View animation="tada" iterationCount="infinite" style={styles.button}>
          <TouchableOpacity onPress={() => navigation.navigate('Ruleta' as never)}>
            <LinearGradient colors={['#00ff88', '#00cc66']} style={styles.gradientButton}>
              <Text style={styles.buttonText}>🎮 ¡JUGAR!</Text>
            </LinearGradient>
          </TouchableOpacity>
        </Animatable.View>

      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingTop: 80,
    paddingBottom: 40,
    backgroundColor: 'rgba(10,10,10,0.3)',
  },
  profileButton: {
    position: 'absolute',
    top: 50,
    right: 30,
    zIndex: 10,
  },
  profileIcon: {
    width: 36,
    height: 36,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#00ff88',
  },
  logo: {
    width: 160,
    height: 160,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00ff88',
    marginBottom: 10,
    textAlign: 'center',
  },
  statsBox: {
    backgroundColor: '#1a1a1a',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
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
    fontSize: 14,
    marginBottom: 6,
  },
  category: {
    color: '#00ff88',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    width: '100%',
    borderRadius: 12,
    overflow: 'hidden',
  },
  gradientButton: {
    paddingVertical: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: '#0a0a0a',
    fontWeight: 'bold',
    fontSize: 16,
  },
  // 💚 Badge de vidas con icono
  lifeBadge: {
    position: 'absolute',
    top: 50,
    left: 30,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    zIndex: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  lifeText: {
    color: '#00ff88',
    fontWeight: 'bold',
    marginLeft: 6,
  },
});
