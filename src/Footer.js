import React from "react";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { LinearGradient } from "expo-linear-gradient";

const Footer = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["black", "#03035B"]}
        style={styles.topSection}
      >
      <TouchableOpacity
        style={styles.footerItem}
        onPress={() => navigation.goBack()}
      >
        <Icon name="chevron-left" size={20} color="white" />
        <Text style={styles.footerText}>Voltar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.footerItem}
        onPress={() => navigation.navigate('Home')}
      >
        <Icon name="home" size={20} color="white" />
        <Text style={styles.footerText}>Home</Text>
      </TouchableOpacity>

      {/* Ícone de perfil de usuário */}
      <TouchableOpacity
        style={styles.footerItem}
        onPress={() => navigation.navigate('Profile')}
      >
        <Icon name="user" size={20} color="white" />
        <Text style={styles.footerText}>Perfil</Text>
      </TouchableOpacity>

      {/* Ícone de busca */}
      <TouchableOpacity
        style={styles.footerItem}
        onPress={() => navigation.navigate('Search')}
      >
        <Icon name="search" size={20} color="white" />
        <Text style={styles.footerText}>Buscar</Text>
      </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#03035B",
  },
  footerItem: {
    alignItems: "center",
    paddingVertical: 3,
  },
  footerText: {
    color: "white",
    marginTop: 3,
    fontSize: 10,
  },
  topSection: {
    paddingVertical: 3,
    flexDirection: "row",
    justifyContent: "space-around",
    flex: 1,
    alignItems: "center",
  },
});

export default Footer;
