import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
  Modal,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { auth, db } from '../firebase/firebaseConfig';
import { collection, doc, getDoc, getDocs, updateDoc } from 'firebase/firestore';
import Toast from 'react-native-toast-message';

export default function InicioScreen() {
  const navigation = useNavigation();
  const [racha, setRacha] = useState(0);
  const [monedas, setMonedas] = useState(0);
  const [nivel, setNivel] = useState('Principiante');
  const [vidas, setVidas] = useState(3);
  const [nickname, setNickname] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const cargarDatos = async () => {
      const user = auth.currentUser;
      if (user) {
        const docRef = doc(db, 'usuarios', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setRacha(Number(data.racha) || 0);
          setMonedas(Number(data.monedas) || 0);
          setNivel((data.nivel || 'Principiante').trim());
          setVidas(Number(data.vidas) || 3);
          setNickname(data.nickname || '');
        }
      }
    };
    cargarDatos();
  }, []);

  const comprarCorazones = async (cantidad: number, precio: number) => {
    if (monedas < precio) {
      Toast.show({
        type: 'error',
        text1: 'No tienes suficientes monedas.',
      });
      return;
    }

    const user = auth.currentUser;
    if (!user) return;

    try {
      const usuarioRef = doc(db, 'usuarios', user.uid);
      await updateDoc(usuarioRef, {
        vidas: vidas + cantidad,
        monedas: monedas - precio,
      });
      setVidas(vidas + cantidad);
      setMonedas(monedas - precio);
      Toast.show({ type: 'success', text1: `¡Has comprado ${cantidad} ❤️!` });
      setModalVisible(false);
    } catch (error) {
      Toast.show({ type: 'error', text1: 'Error al realizar la compra.' });
    }
  };

  return (
    <ImageBackground
      source={require('../assets/imagenes/fondo.png')}
      style={styles.background}
      resizeMode="cover"
      imageStyle={{ backgroundColor: '#0a0a0a' }}
    >
      <View style={styles.container}>
        <View style={styles.lifeBadge}>
          <TouchableOpacity onPress={() => setModalVisible(true)} style={{ flexDirection: 'row', alignItems: 'center' }}>
            <FontAwesome name="heart" size={16} color="#00ff88" />
            <Text style={styles.lifeText}> {vidas}</Text>
          </TouchableOpacity>
        </View>

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
          ¡Bienvenido, {nickname || 'Desarrollador'}!
        </Animatable.Text>

        <Animatable.View animation="fadeInUp" delay={1000} style={styles.statsBox}>
          <View style={styles.statRow}>
            <FontAwesome5 name="fire" size={14} color="#00ff88" style={styles.icon} />
            <Text style={styles.statText}>Racha: <Text style={styles.bold}>{racha}</Text></Text>
          </View>
          <View style={styles.statRow}>
            <FontAwesome5 name="coins" size={14} color="#00ff88" style={styles.icon} />
            <Text style={styles.statText}>Monedas: <Text style={styles.bold}>{monedas}</Text></Text>
          </View>
          <View style={styles.statRow}>
            <FontAwesome5 name="medal" size={14} color="#00ff88" style={styles.icon} />
            <Text style={styles.statText}>Nivel: <Text style={styles.bold}>{nivel}</Text></Text>
          </View>
        </Animatable.View>

        <Animatable.View animation="tada" iterationCount="infinite" style={styles.button}>
          <TouchableOpacity onPress={() => navigation.navigate('Ruleta' as never)}>
            <LinearGradient colors={['#00ff88', '#00cc66']} style={styles.gradientButton}>
              <Text style={styles.buttonText}>🎮 ¡JUGAR!</Text>
            </LinearGradient>
          </TouchableOpacity>
        </Animatable.View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Comprar corazones</Text>
              <TouchableOpacity style={styles.option} onPress={() => comprarCorazones(1, 100)}>
                <Text style={styles.optionText}>1 ❤️ por 100 monedas</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.option} onPress={() => comprarCorazones(2, 180)}>
                <Text style={styles.optionText}>2 ❤️ por 180 monedas</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.option} onPress={() => comprarCorazones(3, 250)}>
                <Text style={styles.optionText}>3 ❤️ por 250 monedas</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={styles.cancel}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

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
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  statText: {
    color: '#ccc',
    fontSize: 14,
  },
  icon: {
    marginRight: 8,
  },
  bold: {
    color: '#00ff88',
    fontWeight: 'bold',
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#1a1a1a',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    color: '#00ff88',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  option: {
    backgroundColor: '#2e2e2e',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    width: '100%',
    alignItems: 'center',
  },
  optionText: {
    color: '#fff',
  },
  cancel: {
    marginTop: 10,
    color: '#cc0033',
  },
});
