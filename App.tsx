
import { useEffect } from 'react';
import BootSplash from 'react-native-bootsplash';
// import ProfilKarti from './src/components/ProfilKarti';
// import FeedbackForm from './src/components/FeedbackForm';
// import UserList from './src/components/UserList';
// import TodoApp from './src/components/TodoApp';
import UserList from './src/components/UserList';


export default function App() {
  useEffect(() => {
    BootSplash.hide({ fade: true });
  }, []);

 
  return  <UserList />;

}
