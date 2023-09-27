import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import { useAuth } from "./contexts/AuthContext";
import { useTheme } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

const image = {
  uri: 'https://cdn.discordapp.com/attachments/638525255744225280/1153450485525786734/pexels-yurii-hlei-1545743.jpg'
};
const logo = require('../assets/logo.png');

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [seePassword, setSeePassword] = useState(true);
  const [checkValidEmail, setCheckValidEmail] = useState(false);

  const { handleLogin } = useAuth();

  const handleCheckEmail = (email) => {
    let re = /\S+@\S+\.\S+/;
    let regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

    setEmail(email)
    if (re.test(email) || regex.test(email)) {
      setCheckValidEmail(false);
    }
    else {
      setCheckValidEmail(true);
    }
  }

  return (
    <LinearGradient
      colors={["black", "darkblue"]}
      style={styles.container}
    >
      <View style={styles.logoContainer}>
        <Text style={styles.title}>
          EyeCar
        </Text>
        <Image style={styles.logo} source={logo} />
      </View>

      <Text style={styles.welcomeText}>
        Seja bem-vindo!
      </Text>
      <View style={styles.loginBox}>
        <LinearGradient
          colors={["black", "darkblue"]}
          style={styles.loginBoxGradient}
        >
          <Text style={styles.text}>
            Login
          </Text>
          <TextInput
            placeholderTextColor="white"
            style={styles.textInput}
            placeholder="E-mail"
            clearButtonMode="always"
            onChangeText={(text) => handleCheckEmail(text)}
          />

          {checkValidEmail ? <Text style={styles.wrongTextFormat}>Wrong format email</Text> : <Text></Text>}

          <TextInput
            placeholderTextColor="white"
            style={styles.textInput}
            placeholder="Senha"
            secureTextEntry={seePassword}
            clearButtonMode="always"
            onChangeText={text => setPassword(text)}
          />

          <Text style={styles.forget}>
            Forget Password
          </Text>

          <TouchableOpacity style={styles.btnLogin} onPress={() => handleLogin(email, password)}>
            <Text style={styles.textButton}>
              Login
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btnLogin} onPress={() => navigation.navigate('Cadastro')}>
            <Text style={styles.textButton}>
              Cadastre-se
            </Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 15,
    marginTop: 100,
  },
  logo: {
    width: 110,
    height: 40,
  },
  loginBox: {
    flex: 1,
    width: "85%",
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 20,
    padding: 1,
    marginTop: 50, // Adjust the marginTop to control the distance from the top
  },
  loginBoxGradient: {
    flex: 1,
    borderRadius: 20,
    padding: 15,
  },
  welcomeText: {
    color: 'white',
    fontSize: 30,
    textAlign: "left",
    marginTop: 10,
  },
  wrongTextFormat: {
    alignSelf: 'flex-end',
    color: 'red',
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'white',
    fontSize: 40,
  },
  text: {
    marginTop: 10, // Adjust the marginTop to control the distance from the previous element
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  textInput: {
    padding: 12,
    borderRadius: 25,
    marginTop: 15,
    color: 'black',
    backgroundColor: '#445FD2',
    borderBottomWidth: 9,
    borderBottomColor: "#004aad",
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 20,
  },
  textButton: {
    color: 'white',
    fontWeight: "bold",
    fontSize: 15,
  },
  forget: {
    textAlign: "center",
    color: "white",
    marginTop: 8,
    marginBottom: 20,
    borderWidth: 0,
    borderColor: "white",
    width: "40%",
    alignSelf: "center"
  },
  btnLogin: {
    backgroundColor: "#2D44A4",
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    borderRadius: 20,
    padding: 10,
    alignItems: "center",
    marginTop: 15,
    borderBottomWidth: 9,
    borderBottomColor: "#223582",
    borderWidth: 2,
    borderColor: "white",
  },
});

export default Login;
