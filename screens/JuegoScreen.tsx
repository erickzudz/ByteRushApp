import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function JuegoScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Pantalla de Juego</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    color: '#96D5FF',
    fontSize: 20
  }
});
