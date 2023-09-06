import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  TextInput,
} from "react-native";

const Login = ({ navigation }) => {
  return (
    <View style = {styles.container}>
      <Text style = {styles.text}>
        Login
      </Text>
      <TextInput style={styles.textInput} placeholder= "Usuário" />
      <TextInput style={styles.textInput} placeholder= "Senha" secureTextEntry/>
    
      <Text style = {styles.forget}>
        Forget Password
      </Text>

      <TouchableOpacity style={styles.touch} onPress={() => navigation.navigate('Home')}>
        <Text style={styles.btnLogin}>
          Login
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.touch} onPress={() => navigation.navigate('Cadastro')}>
        <Text style={styles.btnLogin}>
          Cadastre-se
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

  text:{
    marginTop: 100,
    fontSize: 20,
    fontWeight: "bold",
    color: "#004aad",
    textAlign: "center",
  },

  textInput: {
    borderWidth: 2,
    padding: 10,
    borderRadius: 25,
    marginTop: 10,
    borderColor:"black"
  },

  forget: {
    textAlign: "center",
    color: "#004aad",
    marginTop: 10,
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
})

export default Login;