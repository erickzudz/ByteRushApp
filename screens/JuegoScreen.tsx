import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Animated,
  BackHandler,
  Alert,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { RootStackParamList } from '../navigation/AppNavigator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { db, auth } from '../firebase/firebaseConfig';
import { collection, query, where, getDocs, updateDoc, doc, getDoc } from 'firebase/firestore';

export default function JuegoScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute();
  const { categoria } = route.params as { categoria: string };

  const [preguntas, setPreguntas] = useState<any[]>([]);
  const [indice, setIndice] = useState(0);
  const [respuestaSeleccionada, setRespuestaSeleccionada] = useState<number | null>(null);
  const [respuestaCorrecta, setRespuestaCorrecta] = useState<number | null>(null);
  const [vidas, setVidas] = useState(2);
  const [corazones, setCorazones] = useState(0);
  const [errores, setErrores] = useState(0);
  const [correctas, setCorrectas] = useState(0);
  const [jugadas, setJugadas] = useState(0);
  const progresoAnim = useRef(new Animated.Value(1)).current;
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const obtenerDatos = async () => {
      const user = auth.currentUser;
      if (!user) return;
      setUserId(user.uid);

      const userDoc = await getDoc(doc(db, 'usuarios', user.uid));
      const data = userDoc.data();
      setCorazones(data?.vidas || 0);

      const q = query(collection(db, 'preguntas'), where('categoria', '==', categoria));
      const snap = await getDocs(q);
      const preguntasDB = snap.docs.map(d => d.data());
      setPreguntas(preguntasDB.sort(() => Math.random() - 0.5));
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      Alert.alert('¿Salir?', '¿Deseas abandonar la partida?', [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Sí', onPress: () => navigation.navigate('Inicio' as never) },
      ]);
      return true;
    });

    obtenerDatos();
    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    if (preguntas.length === 0) return;
    setRespuestaSeleccionada(null);
    setRespuestaCorrecta(null);
    progresoAnim.setValue(1);
    Animated.timing(progresoAnim, {
      toValue: 0,
      duration: 10000,
      useNativeDriver: false,
    }).start(() => {
      if (respuestaSeleccionada === null) {
        setErrores(e => e + 1);
        manejarErrores();
      }
    });
  }, [indice]);

  const manejarErrores = () => {
    const totalErrores = errores + 1;
    if (totalErrores >= 2) {
      Alert.alert('¡Oops!', 'Has cometido 2 errores. ¿Deseas continuar?', [
        corazones > 0
          ? { text: 'Usar corazón', onPress: usarCorazon }
          : {},
        { text: 'Ver anuncio', onPress: () => reiniciarErrores() },
        { text: 'Rendirse', onPress: () => finalizarPartida() },
      ]);
    }
  };

  const usarCorazon = async () => {
    const nuevoTotal = corazones - 1;
    setCorazones(nuevoTotal);
    setErrores(0);
    await updateDoc(doc(db, 'usuarios', userId), {
      vidas: nuevoTotal,
    });
  };

  const reiniciarErrores = () => {
    setErrores(0);
  };

  const finalizarPartida = async () => {
    const monedasGanadas = Math.floor(correctas / 5) * 10;
    const userRef = doc(db, 'usuarios', userId);
    const userSnap = await getDoc(userRef);
    const datos = userSnap.data();

    await updateDoc(userRef, {
      racha: correctas > (datos?.racha || 0) ? correctas : datos?.racha || 0,
      monedas: (datos?.monedas || 0) + monedasGanadas,
    });

    navigation.navigate('Inicio' as never);
  };

  const handleRespuesta = (index: number) => {
    if (respuestaSeleccionada !== null) return;
    setRespuestaSeleccionada(index);
    setRespuestaCorrecta(preguntas[indice].respuestaCorrecta);
    const esCorrecta = index === preguntas[indice].respuestaCorrecta;

    if (esCorrecta) {
      setCorrectas(prev => prev + 1);
    } else {
      setErrores(e => e + 1);
      manejarErrores();
    }

    setTimeout(() => {
      const nuevaJugadas = jugadas + 1;
      if (nuevaJugadas % 4 === 0) {
        navigation.replace('Ruleta');
      } else {
        setJugadas(nuevaJugadas);
        setIndice(i => i + 1);
      }
    }, 1200);
  };

  const interpolado = progresoAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  if (preguntas.length === 0) return null;

  return (
    <ImageBackground
      source={require('../assets/imagenes/fondo.png')}
      style={styles.container}
      resizeMode="cover"
      imageStyle={{ opacity: 1 }}
    >
      <View style={styles.vidasContainer}>
        <Ionicons name="heart" size={22} color="#00ff88" />
        <Text style={styles.vidasTexto}> {corazones}</Text>
      </View>

      <View style={styles.contentBox}>
        <Text style={styles.categoria}>Categoría: <Text style={styles.categoriaValue}>{categoria}</Text></Text>

        <View style={styles.timerContainer}>
          <Animated.View style={[styles.timerBar, { width: interpolado }]} />
        </View>

        <Text style={styles.pregunta}>{preguntas[indice].pregunta}</Text>

        {preguntas[indice].opciones.map((opcion: string, index: number) => {
          let bgColor = '#1a1a1a';
          if (respuestaSeleccionada !== null) {
            if (index === respuestaCorrecta) bgColor = '#00cc66';
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
