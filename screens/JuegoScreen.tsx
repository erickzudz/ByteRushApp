import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Animated,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { RootStackParamList } from '../navigation/AppNavigator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

const preguntas = [
  {
    categoria: 'BD',
    pregunta: '¿Qué significa SQL?',
    opciones: ['Simple Query Language', 'Structured Query Language', 'Sequential Query Language', 'Systematic Query Logic'],
    respuestaCorrecta: 1,
  },
];

export default function JuegoScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute();
  const { categoria } = route.params as { categoria: string };

  const pregunta = preguntas.find(p => p.categoria === categoria) || preguntas[0];
  const [respuestaSeleccionada, setRespuestaSeleccionada] = useState<number | null>(null);
  const [respuestaCorrecta, setRespuestaCorrecta] = useState<number | null>(null);
  const [vidas] = useState(3);
  const progresoAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.timing(progresoAnim, {
      toValue: 0,
      duration: 10000,
      useNativeDriver: false,
    }).start(() => {
      if (respuestaSeleccionada === null) {
        setRespuestaCorrecta(pregunta.respuestaCorrecta);
      }
    });
  }, []);

  const handleRespuesta = (index: number) => {
    if (respuestaSeleccionada !== null) return;
    setRespuestaSeleccionada(index);
    setRespuestaCorrecta(pregunta.respuestaCorrecta);
  };

  const interpolado = progresoAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <ImageBackground
      source={require('../assets/imagenes/fondo.png')}
      style={styles.container}
      resizeMode="cover"
      imageStyle={{ opacity: 1 }} // más claro
    >
      <View style={styles.vidasContainer}>
        <Ionicons name="heart" size={22} color="#00ff88" />
        <Text style={styles.vidasTexto}> {vidas}</Text>
      </View>

      <View style={styles.contentBox}>
        <Text style={styles.categoria}>Categoría: <Text style={styles.categoriaValue}>{categoria}</Text></Text>

        <View style={styles.timerContainer}>
          <Animated.View style={[styles.timerBar, { width: interpolado }]} />
        </View>

        <Text style={styles.pregunta}>{pregunta.pregunta}</Text>

        {pregunta.opciones.map((opcion, index) => {
          let bgColor = '#1a1a1a';
          if (respuestaSeleccionada !== null) {
            if (index === pregunta.respuestaCorrecta) bgColor = '#00cc66';
            else if (index === respuestaSeleccionada) bgColor = '#cc0033';
          }

          return (
            <TouchableOpacity
              key={index}
              style={[styles.opcion, { backgroundColor: bgColor }]}
              onPress={() => handleRespuesta(index)}
              activeOpacity={0.8}
            >
              <Text style={styles.opcionTexto}>{opcion}</Text>
            </TouchableOpacity>
          );
        })}
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
  vidasContainer: {
    position: 'absolute',
    top: 40,
    left: 20,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 99,
  },
  vidasTexto: {
    color: '#00ff88',
    fontSize: 16,
    fontWeight: 'bold',
  },
  contentBox: {
    backgroundColor: 'rgba(10,10,10,0.9)',
    padding: 20,
    borderRadius: 16,
    width: '90%',
    alignItems: 'center',
  },
  categoria: {
    color: '#ccc',
    fontSize: 16,
    marginBottom: 5,
  },
  categoriaValue: {
    color: '#00ff88',
    fontWeight: 'bold',
  },
  pregunta: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 20,
    textAlign: 'center',
  },
  opcion: {
    width: '100%',
    paddingVertical: 12,
    borderRadius: 10,
    marginVertical: 6,
    alignItems: 'center',
  },
  opcionTexto: {
    color: '#fff',
    fontSize: 15,
  },
  timerContainer: {
    width: '100%',
    height: 8,
    backgroundColor: '#222',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 16,
  },
  timerBar: {
    height: 8,
    backgroundColor: '#00ff88',
  },
});
