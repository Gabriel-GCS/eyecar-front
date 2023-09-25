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
    <ImageBackground source={image} style={styles.image} blurRadius={8}>
      <SafeAreaView>
        <View style={styles.container}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 15 }}>
            <Text style={styles.title}>
              EyeCar
            </Text>
            <Image style={styles.logo} source={logo} />
          </View>

          <Text style={styles.text}>
            Cadastre-se
          </Text>

          <TextInput style={styles.textInput} placeholder="Nome" onChangeText={text => setNameTxt(text)} />
          <TextInput style={styles.textInput} placeholder="E-mail" clearButtonMode="always"
            onChangeText={(text) => handleCheckEmail(text)} />
          {checkValidEmail ? <Text style={styles.wrongTextFormat}>Wrong format email</Text> :
            <Text></Text>}
          <TextInput style={styles.textInput} placeholder="Senha" secureTextEntry onChangeText={text => setPassTxt(text)} />
          <TextInput style={styles.textInput} placeholder="Confirma sua senha" secureTextEntry onChangeText={text => setConfirmPassTxt(text)} />
          <TouchableOpacity style={styles.touch} onPress={createUser}>
            <Text style={styles.btnLogin}>
              Registrar-se
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.goBackText}>Voltar para o Login</Text>
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

  textInput: {
    padding: 16,
    borderRadius: 8,
    marginTop: 10,
    color: 'black',
    backgroundColor: 'white',
    borderBottomWidth: 3,
    borderBottomColor: "#004aad"
  },

  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },

  btnLogin: {
    backgroundColor: "#004aad",
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    borderRadius: 15,
    padding: 15,
    marginTop: 10,
  },

  goBackText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    marginTop: 20,
    textDecorationLine: 'underline',
  }
});

export default Cadastro;
