import 'react-native-gesture-handler';
import {Header, createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

import Login from './src/Login';
import Cadastro from './src/Cadastro';
import Home from './src/Home';
import Car from './src/Car'

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='FirstPage' screenOptions = {{headerShown: false}}>
        <Stack.Screen 
          name = 'Login'
          component = {Login}
        />

        <Stack.Screen 
          name = 'Cadastro'
          component={Cadastro}
        />
        
        <Stack.Screen 
          name = 'Home'
          component={Home}
        /> 

        <Stack.Screen
        name="Car"
        component={Car}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;