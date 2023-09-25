import React from "react";
import { View, Text, StyleSheet, ImageBackground, Image, SafeAreaView, ScrollView } from "react-native";
import Footer from './Footer'; // Importe o componente Footer
import { LinearGradient } from "expo-linear-gradient";

const image = { uri: 'https://cdn.discordapp.com/attachments/638525255744225280/1153450485525786734/pexels-yurii-hlei-1545743.jpg' };
const logo = require('../assets/logo.png');

const Home = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={["black", "darkblue"]}
        style={styles.background}
      >
        <ScrollView style={styles.scrollView}>
          <View style={styles.topSection}>
            <View style={styles.logoContainer}>
              <Image source={logo} style={styles.logo} />
              <Text style={styles.title}>EyeCar</Text>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
      <Footer navigation={navigation} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    alignItems: 'center', // Centralize o conteúdo na horizontal
    justifyContent: 'center', // Centralize o conteúdo na vertical
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 180, // Ajuste esta margem superior conforme necessário
  },
  logo: {
    width: 110,
    height: 40,
  },
  title: {
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold',
    marginTop: 20
  },
  topSection: {
    alignItems: "center",
    justifyContent: "center",
    height: "100%" // Defina a altura como 100% para ocupar a tela inteira
  },
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
});

export default Home;
