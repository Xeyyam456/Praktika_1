
import { useEffect } from 'react';
import BootSplash from 'react-native-bootsplash';
// import ProfilKarti from './components/ProfilKarti';
// import FeedbackForm from './components/FeedbackForm';
import TodoApp from './components/TodoApp';


export default function App() {
  useEffect(() => {
    BootSplash.hide({ fade: true });
  }, []);

  // return <ProfilKarti />;
  // return <FeedbackForm />;
  return <TodoApp />;

}
