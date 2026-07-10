import { useEffect } from 'react';
import BootSplash from 'react-native-bootsplash';
import MillionaireGame from './src/MillionaireGame';

export default function App() {
  useEffect(() => {
    BootSplash.hide({ fade: true });
  }, []);

  return <MillionaireGame />;
}
