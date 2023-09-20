import { createContext, useContext, useState } from "react";
import axios from "axios"
import { useNavigation } from "@react-navigation/native";


const AuthContext = createContext({})


export function AuthProvider(props) {
    const [user, setUser] = useState();
    const navigation = useNavigation();

    async function handleLogin(loginText, passText) {
        const { data } = await axios.post('http://192.168.43.234:5000/api/auth/login', {
            email: loginText, password: passText
        })

        setUser({ id: data.data.id, name: data.data.name, email: data.data.email, token: data.data.token });
    }

    async function handleCreateUser(name, email, password) {
        const formData = new FormData()

        formData.append('name', name)
        formData.append('email', email)
        formData.append('password', password)

        try {
            await axios.post('http://192.168.43.234:5000/api/user/', formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })

            navigation.navigate('Login');
        } catch (e) {
            console.log(e.message)
        }

    }

    return (
        <AuthContext.Provider value={{
            handleLogin,
            handleCreateUser,
            user,
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);