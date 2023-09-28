import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ImageBackground,
  TextInput,
  Image,
  SafeAreaView,
} from "react-native";
import { useAuth } from "./contexts/AuthContext";
import { LinearGradient } from "expo-linear-gradient";

const image = { uri: 'https://cdn.discordapp.com/attachments/638525255744225280/1153450485525786734/pexels-yurii-hlei-1545743.jpg' }
const logo = require('../assets/logo.png')

const Cadastro = ({ navigation }) => {
  const [nameTxt, setNameTxt] = useState("");
  const [emailTxt, setEmailTxt] = useState("");
  const [passTxt, setPassTxt] = useState("");
  const [confirmPassTxt, setConfirmPassTxt] = useState("");
  const { handleCreateUser } = useAuth();
  const [checkValidEmail, setCheckValidEmail] = useState(false);

  const handleCheckEmail = (email) => {
    let re = /\S+@\S+\.\S+/;
    let regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

    setEmailTxt(email);
    if (re.test(email) || regex.test(email)) {
      setCheckValidEmail(false);
    } else {
      setCheckValidEmail(true);
    }
  };

  const createUser = () => {
    if (passTxt.trim() !== confirmPassTxt.trim()) {
      // Senhas não coincidem, exibir alerta
      Alert.alert("Erro", "As senhas não coincidem.", [{ text: "OK" }]);
      return;
    }
    // Senhas coincidem, continuar com a criação do usuário
    handleCreateUser(nameTxt, emailTxt, passTxt);
  };

  return (
    <LinearGradient
      colors={["black", "#03035B"]}
      style={styles.container2}
      start={{ x: 0, y: 0.5 }}
      end={{ x: 1, y: 0.5 }}
    >
      <SafeAreaView>
        <View style={styles.container}>
          <View style={styles.logoContainer}>
            <Text style={styles.title}>
              EyeCar
            </Text>
            <Image style={styles.logo} source={logo} />
          </View>

          <Text style={styles.text}>
            Cadastre-se
          </Text>

          <TextInput style={styles.textInput} placeholderTextColor="white" placeholder="Nome" onChangeText={text => setNameTxt(text)} />
          <TextInput style={styles.textInput} placeholderTextColor="white" placeholder="E-mail" clearButtonMode="always"
            onChangeText={(text) => handleCheckEmail(text)} />
          {checkValidEmail ? <Text style={styles.wrongTextFormat}>Wrong format email</Text> :
            <Text style={{marginTop:-15}}></Text>}
          <TextInput style={styles.textInput} placeholderTextColor="white" placeholder="Senha" secureTextEntry onChangeText={text => setPassTxt(text)} />
          <TextInput style={styles.textInput} placeholderTextColor="white" placeholder="Confirma sua senha" secureTextEntry onChangeText={text => setConfirmPassTxt(text)} />
          <TouchableOpacity style={styles.btnLogin} onPress={createUser}>
            <Text style={styles.textButton}>
              Registrar-se
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.goBackText}>Voltar para o Login</Text>
          </TouchableOpacity>

        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingHorizontal: 16,
  },
  container2: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  logo: {
    width: 110,
    height: 40,
  },
  
  textButton: {
    color: 'white',
    fontWeight: "bold",
    fontSize: 15,
  },

  title: {
    textAlign: "left",
    fontWeight: 'bold',
    color: 'white',
    fontSize: 40,
  },

  text: {
    marginTop: 70, // Adjust the marginTop to control the distance from the previous element
    fontSize: 25,
    fontWeight: "bold",
    color: "white",
    textAlign: "left",
    marginBottom: 10
  },
  textInput: {
    padding: 10,
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

  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },

  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 15,
    marginTop: 20,
  },

   btnLogin: {
    backgroundColor: "#223582",
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    borderRadius: 20,
    padding: 10,
    alignItems: "center",
    marginTop: 40,
    borderBottomWidth: 9,
    borderBottomColor: "#1B2B69",
    borderWidth: 2,
    borderColor: "white",
  },
  goBackText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    marginTop: 20,
    textDecorationLine: 'underline',
  },
  wrongTextFormat: {
    alignSelf: 'flex-end',
    color: 'red',
  },
});

export default Cadastro;
