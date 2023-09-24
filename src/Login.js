import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
  TextInput,
  ImageBackground
} from "react-native";
import { useAuth } from "./contexts/AuthContext";
import { useTheme } from "@react-navigation/native";

const image = { uri: 'https://cdn.discordapp.com/attachments/638525255744225280/1153450485525786734/pexels-yurii-hlei-1545743.jpg' };
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
    <ImageBackground source={image} style={styles.image} blurRadius={8}>
      <SafeAreaView style={styles.tela}>
        <View style={styles.container}>

          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 15 }}>
            <Text style={styles.title}>
              EyeCar
            </Text>
            <Image style={styles.logo} source={logo} />
          </View>

          <Text style={styles.text}>
            Login
          </Text>
          <TextInput placeholderTextColor="#000" style={styles.textInput} placeholder="E-mail" clearButtonMode="always" 
          onChangeText={(text) => handleCheckEmail(text)} />

          {checkValidEmail ? <Text style = {styles.wrongTextFormat}>Wrong format email</Text> : 
          <Text></Text>}

          <TextInput placeholderTextColor="#000" style={styles.textInput} placeholder="Senha" secureTextEntry={seePassword}
           clearButtonMode="always" onChangeText={text => setPassword(text)} />

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
        </View>

      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingHorizontal: 16,
  },

  logo: {
    width: 110,
    height: 40,
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
    marginTop: 100,
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    textTransform: "uppercase",
  },

  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',

  },

  textInput: {
    padding: 16,
    borderRadius: 8,
    marginTop: 10,
    color: 'black',
    backgroundColor: 'white',
    borderBottomWidth: 3,
    borderBottomColor: "#004aad"
  },

  textButton: {
    color: 'white',
  },

  forget: {
    textAlign: "center",
    color: "white",
    marginTop: 8,
    marginBottom: 56,
    borderWidth: 0,
    borderColor: "white",
    width: "40%",
    alignSelf: "center"
  },

  btnLogin: {
    backgroundColor: "#004aad",
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    borderRadius: 5,
    padding: 10,
    alignItems: "center",
    marginTop: 10,
  },
})

export default Login;