
import { useEffect } from 'react';
import BootSplash from 'react-native-bootsplash';
import ProfilKarti from './components/ProfilKarti';
import FeedbackForm from './components/FeedbackForm';


export default function App() {
  useEffect(() => {
    BootSplash.hide({ fade: true });
  }, []);

  // return <ProfilKarti />;
  return <FeedbackForm />;

}
