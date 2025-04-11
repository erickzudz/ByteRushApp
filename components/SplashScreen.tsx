import { View, StyleSheet, Image, ImageBackground } from 'react-native';
import { useEffect } from 'react';

type Props = {
  onFinish?: () => void;
};

export default function SplashScreen({ onFinish }: Props) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish?.();
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ImageBackground
      source={require('../assets/imagenes/fondo.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Image
          source={require('../assets/imagenes/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
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
    backgroundColor: 'rgba(10,10,10,0.6)', // 👈 Un poco más claro que en login/register
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 220,
    height: 220,
  },
});
