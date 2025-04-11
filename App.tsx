import { View } from 'react-native';
import AppNavigator from './navigation/AppNavigator';
import PreloadAssets from './components/PreloadAssets';

// App principal con fondo oscuro y preload de imágenes
export default function App() {
  return (
    <View style={{ flex: 1, backgroundColor: '#0a0a0a' }}>
      <PreloadAssets />
      <AppNavigator />
    </View>
  );
}
