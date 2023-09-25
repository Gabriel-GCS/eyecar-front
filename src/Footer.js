import React from "react";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const Footer = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.footerItem}
        onPress={() => navigation.navigate('Cadastro')}
      >
        <Icon name="home" size={20} color="white" />
        <Text style={styles.footerText}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.footerItem}
        onPress={() => navigation.goBack()}
      >
        <Icon name="chevron-left" size={20} color="white" />
        <Text style={styles.footerText}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "darkblue",
    paddingVertical: 3,
  },
  footerItem: {
    alignItems: "center",
    paddingVertical: 3,
  },
  footerText: {
    color: "white",
    marginTop: 3,
    fontSize:10
  },
});

export default Footer;