import { View } from 'react-native';
import AppNavigator from './navigation/AppNavigator';
import PreloadAssets from './components/PreloadAssets';
import Toast, { BaseToast, ErrorToast, BaseToastProps } from 'react-native-toast-message';

const toastConfig = {
  success: (props: BaseToastProps) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: '#00ff88', backgroundColor: '#1a1a1a' }}
      text1Style={{
        color: '#00ff88',
        fontWeight: 'bold',
      }}
    />
  ),
  error: (props: BaseToastProps) => (
    <ErrorToast
      {...props}
      style={{ borderLeftColor: '#cc0033', backgroundColor: '#1a1a1a' }}
      text1Style={{
        color: '#fff',
        fontWeight: 'bold',
      }}
    />
  )
};

export default function App() {
  return (
    <View style={{ flex: 1, backgroundColor: '#0a0a0a' }}>
      <PreloadAssets />
      <AppNavigator />
      <Toast config={toastConfig} />
    </View>
  );
}
