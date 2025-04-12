import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  ImageBackground,
} from 'react-native';
import Svg, { G, Path, Text as SvgText } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

const { width } = Dimensions.get('window');
const size = width * 0.9;
const radius = size / 2;

const categorias = ['Lógica', 'Algoritmos', 'Redes', 'BD', 'Matemática'];
const colors = ['#00ff88', '#00cc66', '#009966', '#00b386', '#00e699'];

export default function RuletaScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [selected, setSelected] = useState<string | null>(null);
  const rotateAnim = useRef(new Animated.Value(0)).current;

  const spin = () => {
    const spins = 5 + Math.floor(Math.random() * 3);
    const segmentAngle = 360 / categorias.length;
    const selectedIndex = Math.floor(Math.random() * categorias.length);
    const finalAngle = spins * 360 + selectedIndex * segmentAngle + segmentAngle / 2;

    Animated.timing(rotateAnim, {
      toValue: finalAngle,
      duration: 4000,
      useNativeDriver: true,
    }).start(() => {
      setSelected(categorias[selectedIndex]);
      setTimeout(() => {
        navigation.navigate('Juego', { categoria: categorias[selectedIndex] });
      }, 1000);
    });
  };

  useEffect(() => {
    spin();
  }, []);

  const renderSlices = () => {
    const angle = 360 / categorias.length;
    return categorias.map((cat, i) => {
      const startAngle = angle * i;
      const endAngle = startAngle + angle;
      const largeArc = endAngle - startAngle <= 180 ? 0 : 1;
      const x1 = radius + radius * Math.cos((startAngle * Math.PI) / 180);
      const y1 = radius + radius * Math.sin((startAngle * Math.PI) / 180);
      const x2 = radius + radius * Math.cos((endAngle * Math.PI) / 180);
      const y2 = radius + radius * Math.sin((endAngle * Math.PI) / 180);

      const path = `M${radius},${radius} L${x1},${y1} A${radius},${radius} 0 ${largeArc},1 ${x2},${y2} Z`;

      // Calcular ángulo del texto para rotarlo en dirección de lectura
      const midAngle = startAngle + angle / 2;
      const rotate = midAngle + 90; // sumar 90 grados para apuntar hacia abajo

      const textX = radius + radius * 0.6 * Math.cos((midAngle * Math.PI) / 180);
      const textY = radius + radius * 0.6 * Math.sin((midAngle * Math.PI) / 180);

      return (
        <G key={i}>
          <Path d={path} fill={colors[i % colors.length]} />
          <SvgText
            fill="#0a0a0a"
            fontSize="14"
            fontWeight="bold"
            fontFamily="System"
            x={textX}
            y={textY}
            transform={`rotate(${rotate}, ${textX}, ${textY})`}
            textAnchor="middle"
            alignmentBaseline="middle"
          >
            {cat}
          </SvgText>
        </G>
      );
    });
  };

  return (
    <ImageBackground
      source={require('../assets/imagenes/fondo.png')}
      style={styles.container}
      resizeMode="cover"
      imageStyle={{ opacity: 0.6 }}
    >
      <Animated.View
        style={{
          transform: [
            {
              rotate: rotateAnim.interpolate({
                inputRange: [0, 360],
                outputRange: ['0deg', '360deg'],
              }),
            },
          ],
        }}
      >
        <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          {renderSlices()}
        </Svg>
      </Animated.View>
      <View style={styles.pointer} />
      <Text style={styles.label}>Girando...</Text>
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
  pointer: {
    position: 'absolute',
    top: '24%',
    width: 0,
    height: 0,
    borderLeftWidth: 14,
    borderRightWidth: 14,
    borderTopWidth: 18,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#fff',
    zIndex: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
  },
  label: {
    color: '#00ff88',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 30,
    fontFamily: 'System',
  },
});
