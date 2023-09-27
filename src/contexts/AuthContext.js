import { createContext, useContext, useState } from "react";
import axios from "axios"
import { useNavigation } from "@react-navigation/native";

const AuthContext = createContext({})

export function AuthProvider(props) {
    const API_URL = "http://192.168.0.109:5000" 
    const [user, setUser] = useState(null);
    const navigation = useNavigation();

    async function handleLogin(loginText, passText) {
        try {
            const { data } = await axios.post(`${API_URL}/api/auth/login`, {
                email: loginText, password: passText
            })

            setUser({ id: data.data.id, name: data.data.name, email: data.data.email, token: data.data.token });
        }
        catch(e){
            alert("Senha ou email incorretos.")
        }
            
    }

    const logout = () => {
        if (user) {
            setUser(null); // Remove as informações do usuário ao fazer logout
          }
      };

    async function handleCreateUser(name, email, password) {
        const formData = new FormData()

        formData.append('name', name)
        formData.append('email', email)
        formData.append('password', password)

        try {
            await axios.post(`${API_URL}/api/user/`, formData, {
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
            logout
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);