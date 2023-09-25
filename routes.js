import { Header, createStackNavigator } from '@react-navigation/stack';

import Login from './src/Login';
import Cadastro from './src/Cadastro';
import Home from './src/Home';
import Car from './src/Car';
import { useAuth } from './src/contexts/AuthContext';

const Stack = createStackNavigator();


export function Routes() {
    const { user } = useAuth()

    return (
        <Stack.Navigator initialRouteName='FirstPage' screenOptions={{ headerShown: false }}>
            {user ? (
                <>
                    <Stack.Screen
                        name="Home"
                        component={Home}
                    />

                    <Stack.Screen
                        name="Car"
                        component={Car}
                    />
                </>
            ) : (
                <>
                    <Stack.Screen
                        name="Login"
                        component={Login}
                    />
                    <Stack.Screen
                        name="Cadastro"
                        component={Cadastro}
                    />
                </>
            )}
        </Stack.Navigator>
    )
}