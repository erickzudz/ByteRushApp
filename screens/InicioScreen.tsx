import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function InicioScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Inicio Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a', // 👈 Fondo oscuro para evitar parpadeos
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#00ff88', // Color neón estilo ByteRush
    fontSize: 24,
    fontWeight: 'bold',
  },
});
