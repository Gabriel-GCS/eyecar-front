import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
  TextInput,
  ScrollView,
} from "react-native";

const Car = ({ navigation, route }) => {
  const { carroSelecionado } = route.params;
  console.log(carroSelecionado)
  const problems = carroSelecionado.canonical_problems.split('; ')

  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        {/* <Image style={styles.image} source={{ uri: carroSelecionado.photos[0] }} /> */}
        <Text style={styles.title}>
          {carroSelecionado.brand} - {' '}
          {carroSelecionado.model}
        </Text>

        <Text style={styles.subtitle}>
          Informações Gerais:
        </Text>

        <Text style={styles.label} >
          Marca
        </Text>
        <Text>
          {carroSelecionado.brand}
        </Text>

        <Text style={styles.label} >
          Ano
        </Text>
        <Text>
          {carroSelecionado.year}
        </Text>

        <Text style={styles.label} >
          Modelo
        </Text>
        <Text>
          {carroSelecionado.model}
        </Text>

        <Text style={styles.label} >
          Versão
        </Text>
        <Text>
          {carroSelecionado.version}
        </Text>

        <Text style={styles.label} >
          Performance
        </Text>
        <Text>
          {carroSelecionado.performance.max_speed.gasoline} Km/h
        </Text>

        <Text style={styles.label} >
          Problemas canônicos
        </Text>
        <Text>
          {problems.map(item => (
            <View>
              <Text style={{ paddingTop: 5 }}>
                {item}
              </Text>
            </View>
          ))}
        </Text>

        <Text style={styles.subtitle}>
          Consumo:
        </Text>
        <Text style={styles.label} >
          Gasolina
        </Text>
        <Text>
          Estrada: {carroSelecionado.consumption.road.gasoline}l | Urbano: {carroSelecionado.consumption.urban.gasoline}l
        </Text>
        <Text style={styles.label} >
          Ethanol
        </Text>
        <Text>
          Estrada: {carroSelecionado.consumption.road.ethanol}l | Urbano: {carroSelecionado.consumption.urban.ethanol}l
        </Text>

        <Text style={styles.subtitle}>
          Medidas:
        </Text>
        <Text style={styles.label} >
          Comprimento:
        </Text>
        <Text>
          {carroSelecionado.dimensions.length} Metros
        </Text>
        <Text style={styles.label} >
          Largura:
        </Text>
        <Text>
          {carroSelecionado.dimensions.width} Metros
        </Text>
        <Text style={styles.label} >
          Altura:
        </Text>
        <Text>
          {carroSelecionado.dimensions.height} Metros
        </Text>
        <Text style={styles.label} >
          Porta malas:
        </Text>
        <Text>
          {carroSelecionado.dimensions.trunk} Litros
        </Text>
        <Text style={styles.label} >
          Peso:
        </Text>
        <Text>
          {carroSelecionado.dimensions.weight} Quilos
        </Text>
        <Text style={styles.label} >
          Tanque:
        </Text>
        <Text>
          {carroSelecionado.dimensions.gas_tank} Litros
        </Text>

      </ScrollView>
    </SafeAreaView>
  )
}

export default Car;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },

  image: {
    alignSelf: "center",
    height: 150,
    width: 150,
    objectFit: "contain",
    borderRadius: 100,
    backgroundColor: "white",
    borderWidth: 8,
    borderColor: "darkblue",
  },

  title: {
    alignSelf: "center",
    marginTop: 16,
    fontSize: 32,
    color: 'darkblue',
    fontWeight: "bold",
  },

  subtitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
    marginTop: 32,
    borderBottomColor: 'black',
  },

  label: {
    fontSize: 20,
    color: 'black',
    fontWeight: "bold",
    paddingTop: 10,
  }
})