
import { useEffect } from 'react';
import BootSplash from 'react-native-bootsplash';
// import ProfilKarti from './src/components/ProfilKarti';
// import FeedbackForm from './src/components/FeedbackForm';
import TodoApp from './src/components/TodoApp';


export default function App() {
  useEffect(() => {
    BootSplash.hide({ fade: true });
  }, []);

  // return <ProfilKarti />;
  // return <FeedbackForm />;
  return <TodoApp />;

}
