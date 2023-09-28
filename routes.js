import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import { useAuth } from './src/contexts/AuthContext';
import UserProfile from './src/UserProfile';
import Login from './src/Login'; // Certifique-se de que a tela de login está importada corretamente
import Cadastro from './src/Cadastro';
import Search from './src/Search';
import Car from './src/Car';
import Home from "./src/Home";
import UserCar from "./src/UserCar"

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
                        name="Search"
                        component={Search}
                    />

                    <Stack.Screen
                        name="Profile"
                        component={UserProfile}
                    />

                    <Stack.Screen
                        name="Car"
                        component={Car}
                    />

                    <Stack.Screen
                        name="UserCar"
                        component={UserCar}
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
