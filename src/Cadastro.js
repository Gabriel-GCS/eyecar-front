import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  TextInput,
} from "react-native";

const Cadastro = ({ navigation }) => {
  return (
    
    <View style = {styles.container}>
      <Text style = {styles.title}>
        Cadastre-se
      </Text>

    <TextInput style = {styles.textInput} placeholder="Nome"/>
    <TextInput style = {styles.textInput} placeholder="E-mail"/>
    <TextInput style = {styles.textInput} placeholder="Senha" secureTextEntry/>
    <TextInput style = {styles.textInput} placeholder="Confirma sua senha" secureTextEntry/>

    <TouchableOpacity style={styles.touch} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.btnLogin}>
          Registrar-se
        </Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    paddingTop: 20,
  },

  title:{
    marginTop: 100,
    fontSize: 20,
    fontWeight: "bold",
    color: "#004aad",
    textAlign: "center"
  },

  textInput: {
    borderWidth: 2,
    padding: 10,
    borderRadius: 25,
    marginTop: 10,
    borderColor:"black"
  },

  btnLogin: {
    backgroundColor: "#004aad",
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    borderRadius: 15,
    padding: 15,
    marginTop:10,
  },
});

export default Cadastro;