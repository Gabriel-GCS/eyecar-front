import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  View,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";

import Icon from "react-native-vector-icons/FontAwesome"; // ou escolha um ícone de sua preferência
import Footer from './Footer'; // Importe o componente Footer
import { LinearGradient } from "expo-linear-gradient";

const Car = ({ route, navigation }) => {
  const { carroSelecionado } = route.params;
  const problems = carroSelecionado.canonical_problems.split('; ');
  const [medidasVisiveis, setMedidasVisiveis] = useState(false);
  const [imageModal, setImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const openImageModal = (imageUrl) => {
    setSelectedImage(imageUrl);
    setImageModal(true);
  };

  const toggleMedidas = () => {
    setMedidasVisiveis(!medidasVisiveis);
  };
  const closeImageModal = () => {
    setImageModal(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={["black", "darkblue"]}
        style={styles.topSection}
      >
        <View style={styles.header}>
          <View style={styles.carInfo}>
          <TouchableOpacity onPress={() => openImageModal(carroSelecionado.photos[0])}>
            <Image
              source={{ uri: carroSelecionado.photos[0] }}
              style={styles.carImage}
            />
            </TouchableOpacity>
            <Text style={styles.title}>
              {carroSelecionado.brand} - {carroSelecionado.model}
            </Text>
          </View>
        </View>
      </LinearGradient>

      <View style={styles.bottomSection}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.content}>
            <Text style={styles.subtitle}>
              Informações Gerais:
            </Text>

            <Text style={styles.label} >
              Marca:
              <Text style={styles.infoTextBlack}> {carroSelecionado.brand}</Text>
            </Text>

            <Text style={styles.label} >
              Ano
            </Text>
            <Text style={styles.infoTextBlack}>
              {carroSelecionado.year}
            </Text>

            <Text style={styles.label} >
              Modelo
            </Text>
            <Text style={styles.infoTextBlack}>
              {carroSelecionado.model}
            </Text>

            <Text style={styles.label} >
              Versão
            </Text>
            <Text style={styles.infoTextBlack}>
              {carroSelecionado.version}
            </Text>

            <Text style={styles.label} >
              Performance
            </Text>
            <Text style={styles.infoTextBlack}>
              {carroSelecionado.performance.max_speed.gasoline} Km/h
            </Text>

            <Text style={styles.label} >
              Problemas canônicos
            </Text>
            <Text style={styles.infoTextBlack}>
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
            <Text style={styles.infoTextBlack}>
              Estrada: {carroSelecionado.consumption.road.gasoline}l | Urbano: {carroSelecionado.consumption.urban.gasoline}l
            </Text>
            <Text style={styles.label} >
              Ethanol
            </Text>
            <Text style={styles.infoTextBlack}>
              Estrada: {carroSelecionado.consumption.road.ethanol}l | Urbano: {carroSelecionado.consumption.urban.ethanol}l
            </Text>

            <TouchableOpacity onPress={toggleMedidas} style={styles.medidasContainer}>
              <View style={styles.medidasTextContainer}>
                <Text style={styles.subtitle}>Medidas</Text>
              </View>
              <View style={styles.medidasIconContainer}>
                <Icon name={medidasVisiveis ? "chevron-up" : "chevron-down"} size={24} color="darkblue" />
              </View>
            </TouchableOpacity>

            {medidasVisiveis && (
              <View style={styles.medidasInfoContainer}>
                <Text style={styles.label}>Comprimento:</Text>
                <Text style={styles.infoTextBlack}>{carroSelecionado.dimensions.length} Metros</Text>
                <Text style={styles.label}>Largura:</Text>
                <Text style={styles.infoTextBlack}>{carroSelecionado.dimensions.width} Metros</Text>
                <Text style={styles.label}>Altura:</Text>
                <Text style={styles.infoTextBlack}>{carroSelecionado.dimensions.height} Metros</Text>
                <Text style={styles.label}>Porta malas:</Text>
                <Text style={styles.infoTextBlack}>{carroSelecionado.dimensions.trunk} Litros</Text>
                <Text style={styles.label}>Peso:</Text>
                <Text style={styles.infoTextBlack}>{carroSelecionado.dimensions.weight} Quilos</Text>
                <Text style={styles.label}>Tanque:</Text>
                <Text style={styles.infoTextBlack}>{carroSelecionado.dimensions.gas_tank} Litros</Text>
              </View>
            )}
          </View>
        </ScrollView>
      </View>
      <Modal
          transparent={true}
          visible={imageModal}
          onRequestClose={() => {
            closeImageModal();
          }}
        >
          <TouchableWithoutFeedback onPress={() => closeImageModal()}>
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Image
                  style={styles.modalImage}
                  source={{ uri: selectedImage }}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      <Footer navigation={navigation}/>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  modalImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    borderRadius: 170,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    width: '90%',
    aspectRatio: 1,
    borderRadius: 170,
    position: 'relative',
  },
  container: {
    flex: 1,
  },
  topSection: {
    flex: 0.5,
    alignItems: "center",
    justifyContent: "center"
  },
  bottomSection: {
    flex: 2,
    backgroundColor: "white", // Fundo branco para a seção inferior
  },
  scrollView: {
    flex: 1,
  },
  carImage: {
    width: 100, // Ajuste o tamanho da imagem conforme necessário
    height: 100, // Ajuste o tamanho da imagem conforme necessário
    borderRadius: 50, // Torna a imagem redonda definindo metade do valor da largura
    marginRight: 16, // Espaço entre a imagem e o texto
    objectFit: "contain",
    backgroundColor: "white"
  },
  header: {
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "darkblue",
  },
  carInfo: {
    flexDirection: "row", // Exiba a imagem e o texto na horizontal
    alignItems: "center", // Centralize os elementos verticalmente
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 8,
    color: "black", // Cor do texto na seção inferior
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black", // Cor do texto na seção inferior
  },
  infoTextBlack: {
    color: "black", // Cor branca para informações após ":"
  },
  medidasContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 16,
  },
  medidasTextContainer: {
    flex: 1,
  },
  medidasIconContainer: {
    marginLeft: 10,
  },
  medidasInfoContainer: {
    marginTop: 16,
  },
});

export default Car;
