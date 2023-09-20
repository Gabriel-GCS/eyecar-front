import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';


import { AuthProvider } from './src/contexts/AuthContext';
import { Routes } from './routes';


function App() {
  
  return (
    <NavigationContainer>
      <AuthProvider>
       <Routes/>
      </AuthProvider>
    </NavigationContainer>
  );
}

export default App;