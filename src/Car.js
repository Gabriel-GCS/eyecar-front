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
  const [consumoVisiveis, setConsumoVisiveis] = useState(false);
  const [dimensoesVisiveis, setDimensoesVisiveis] = useState(false);
  const [motorVisiveis, setMotorVisiveis] = useState(false);
  const [transmissaoVisiveis, setTransmissaoVisiveis] = useState(false);
  const [performanceVisiveis, setPerformanceVisiveis] = useState(false);
  const [pneuVisiveis, setPneuVisiveis] = useState(false);
  const [freiosVisiveis, setFreiosVisiveis] = useState(false);
  const [problemasVisiveis, setProblemasVisiveis] = useState(false);
  const [imageModal, setImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const openImageModal = (imageUrl) => {
    setSelectedImage(imageUrl);
    setImageModal(true);
  };

  const toggleConsumo = () => {
    setConsumoVisiveis(!consumoVisiveis);
  };
  const toggleDimensoes = () => {
    setDimensoesVisiveis(!dimensoesVisiveis);
  };
  const toggleMotor = () => {
    setMotorVisiveis(!motorVisiveis);
  };
  const toggleTransmissao = () => {
    setTransmissaoVisiveis(!transmissaoVisiveis);
  };
  const togglePerformance = () => {
    setPerformanceVisiveis(!performanceVisiveis);
  };
  const togglePneu = () => {
    setPneuVisiveis(!pneuVisiveis);
  };
  const toggleFreios = () => {
    setFreiosVisiveis(!freiosVisiveis);
  };
  const closeImageModal = () => {
    setImageModal(false);
  };
  const toggleProblemas = () => {
    setProblemasVisiveis(!problemasVisiveis);
  };
  const toggleProblemasAndAlert = () => {
    if (!problemasVisiveis) {
      alert('Problemas crônicos são problemas potenciais que um carro pode vir a apresentar, o que não implica necessariamente que seu veículo atualmente as possui.');
    }
    toggleProblemas();
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={["lightslategrey", "darkblue"]}
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
          <View style={styles.separator}></View>
          <View style={styles.content}>

            <View style={styles.infoRow}>
              <View style={styles.infoColumn}>
                <Text style={styles.label} >
                  Montadora
                </Text>
                <Text style={styles.infoTextBlack}>{carroSelecionado.brand}</Text>
              </View>
              <View style={styles.infoColumn}>
                <Text style={styles.label} >
                  Modelo
                </Text>
                <Text style={styles.infoTextBlack}>{carroSelecionado.model}</Text>
              </View>
            </View>

            <View style={styles.infoRow}>
              <View style={styles.infoColumn}>
                <Text style={styles.label} >
                  Versão
                </Text>
                <Text style={styles.infoTextBlack}>{carroSelecionado.version}</Text>
              </View>
              <View style={styles.infoColumn}>
                <Text style={styles.label} >
                  Ano
                </Text>
                <Text style={styles.infoTextBlack}>{carroSelecionado.year}</Text>
              </View>
            </View>

            <View style={styles.priceContainer}>
              <View style={styles.infoColumn}>
                <Text style={styles.label} >
                  Preço R$
                </Text>
                <Text style={styles.infoTextBlack}>
                  {carroSelecionado.price},00
                </Text>
              </View>
            </View>

            <View style={styles.separator}></View>

            <View style={styles.centeredButtonContainer}>
              <TouchableOpacity onPress={toggleConsumo} style={styles.buttonStyle}>
                <View style={styles.medidasCenterContainer}>
                  <Text style={styles.medidasText}>Consumo</Text>
                  <View style={styles.medidasIconContainer}>
                    <Icon name={consumoVisiveis ? "chevron-up" : "chevron-down"} marginLeft={51} size={15} color="white" />
                  </View>
                </View>
              </TouchableOpacity>

              {consumoVisiveis && (
                <View style={styles.medidasInfoContainer}>
                  <View style={styles.medidasInfoRow}>
                    <View style={styles.labelContainer}>
                      <Text style={styles.label}>Urbano:</Text>
                    </View>
                  </View>
                  <View style={styles.medidasInfoRow}>
                    <View style={styles.infoTextContainer}>
                      <Text style={styles.infoTextBlack}>Gasolina: {carroSelecionado.consumption.urban.gasoline} Km/L</Text>
                      <Text style={styles.infoTextBlack}>Etanol: {carroSelecionado.consumption.urban.ethanol} Km/L</Text>
                    </View>
                  </View>
                  <View style={styles.medidasInfoRow}>
                    <View style={styles.labelContainer}>
                      <Text style={styles.label}>Rodoviário:</Text>
                    </View>
                  </View>
                  <View style={styles.medidasInfoRow}>
                    <View style={styles.infoTextContainer}>
                      <Text style={styles.infoTextBlack}>Gasolina: {carroSelecionado.consumption.road.gasoline} Km/L</Text>
                      <Text style={styles.infoTextBlack}>Etanol: {carroSelecionado.consumption.road.ethanol} Km/L</Text>
                    </View>
                  </View>
                </View>
              )}

              <TouchableOpacity onPress={toggleDimensoes} style={styles.buttonStyle}>
                <View style={styles.medidasCenterContainer}>
                  <Text style={styles.medidasText}>Dimensoes</Text>
                  <View style={styles.medidasIconContainer}>
                    <Icon name={dimensoesVisiveis ? "chevron-up" : "chevron-down"} marginLeft={38} size={15} color="white" />
                  </View>
                </View>
              </TouchableOpacity>

              {dimensoesVisiveis && (
                <View style={styles.medidasInfoContainer}>

                  <View style={styles.medidasInfoRow}>
                    <View style={styles.labelContainer}>
                      <Text style={styles.label}>Comprimento:</Text>
                    </View>
                  </View>
                  <View style={styles.medidasInfoRow}>
                    <View style={styles.infoTextContainer}>
                      <Text style={styles.infoTextBlack}>{carroSelecionado.dimensions.length} m</Text>
                    </View>
                  </View>

                  <View style={styles.medidasInfoRow}>
                    <View style={styles.labelContainer}>
                      <Text style={styles.label}>Largura</Text>
                    </View>
                  </View>
                  <View style={styles.medidasInfoRow}>
                    <View style={styles.infoTextContainer}>
                      <Text style={styles.infoTextBlack}>{carroSelecionado.dimensions.width} m</Text>
                    </View>
                  </View>

                  <View style={styles.medidasInfoRow}>
                    <View style={styles.labelContainer}>
                      <Text style={styles.label}>Altura</Text>
                    </View>
                  </View>
                  <View style={styles.medidasInfoRow}>
                    <View style={styles.infoTextContainer}>
                      <Text style={styles.infoTextBlack}>{carroSelecionado.dimensions.height} m</Text>
                    </View>
                  </View>

                  <View style={styles.medidasInfoRow}>
                    <View style={styles.labelContainer}>
                      <Text style={styles.label}>Distância entre eixos</Text>
                    </View>
                  </View>
                  <View style={styles.medidasInfoRow}>
                    <View style={styles.infoTextContainer}>
                      <Text style={styles.infoTextBlack}>{carroSelecionado.dimensions.distance} m</Text>
                    </View>
                  </View>

                  <View style={styles.medidasInfoRow}>
                    <View style={styles.labelContainer}>
                      <Text style={styles.label}>Porta malas</Text>
                    </View>
                  </View>
                  <View style={styles.medidasInfoRow}>
                    <View style={styles.infoTextContainer}>
                      <Text style={styles.infoTextBlack}>{carroSelecionado.dimensions.trunk} L</Text>
                    </View>
                  </View>

                  <View style={styles.medidasInfoRow}>
                    <View style={styles.labelContainer}>
                      <Text style={styles.label}>Peso</Text>
                    </View>
                  </View>
                  <View style={styles.medidasInfoRow}>
                    <View style={styles.infoTextContainer}>
                      <Text style={styles.infoTextBlack}>{carroSelecionado.dimensions.weight} Kg</Text>
                    </View>
                  </View>

                  <View style={styles.medidasInfoRow}>
                    <View style={styles.labelContainer}>
                      <Text style={styles.label}>Tanque de Combustível</Text>
                    </View>
                  </View>
                  <View style={styles.medidasInfoRow}>
                    <View style={styles.infoTextContainer}>
                      <Text style={styles.infoTextBlack}>{carroSelecionado.dimensions.gas_tank} L</Text>
                    </View>
                  </View>

                </View>
              )}
              <TouchableOpacity onPress={toggleMotor} style={styles.buttonStyle}>
                <View style={styles.medidasCenterContainer}>
                  <Text style={styles.medidasText}>Motor</Text>
                  <View style={styles.medidasIconContainer}>
                    <Icon name={motorVisiveis ? "chevron-up" : "chevron-down"} marginLeft={75} size={15} color="white" />
                  </View>
                </View>
              </TouchableOpacity>

              {motorVisiveis && (
                <View style={styles.medidasInfoContainer}>

                  <View style={styles.medidasInfoRow}>
                    <View style={styles.labelContainer}>
                      <Text style={styles.label}>Poder máximo:</Text>
                    </View>
                  </View>
                  <View style={styles.medidasInfoRow}>
                    <View style={styles.infoTextContainer}>
                      <Text style={styles.infoTextBlack}>Gasolina: {carroSelecionado.engine.max_power.gasoline} cavalos</Text>
                      <Text style={styles.infoTextBlack}>Etanol: {carroSelecionado.engine.max_power.ethanol} cavalos</Text>
                    </View>
                  </View>

                  <View style={styles.medidasInfoRow}>
                    <View style={styles.labelContainer}>
                      <Text style={styles.label}>Cilindros:</Text>
                    </View>
                  </View>
                  <View style={styles.medidasInfoRow}>
                    <View style={styles.infoTextContainer}>
                      <Text style={styles.infoTextBlack}>{carroSelecionado.engine.cylinders}</Text>
                    </View>
                  </View>

                  <View style={styles.medidasInfoRow}>
                    <View style={styles.labelContainer}>
                      <Text style={styles.label}>Válvulas:</Text>
                    </View>
                  </View>
                  <View style={styles.medidasInfoRow}>
                    <View style={styles.infoTextContainer}>
                      <Text style={styles.infoTextBlack}>{carroSelecionado.engine.valves}</Text>
                    </View>
                  </View>

                  <View style={styles.medidasInfoRow}>
                    <View style={styles.labelContainer}>
                      <Text style={styles.label}>Deslocamento:</Text>
                    </View>
                  </View>
                  <View style={styles.medidasInfoRow}>
                    <View style={styles.infoTextContainer}>
                      <Text style={styles.infoTextBlack}>{carroSelecionado.engine.displacement}</Text>
                    </View>
                  </View>

                  <View style={styles.medidasInfoRow}>
                    <View style={styles.labelContainer}>
                      <Text style={styles.label}>Código do Motor:</Text>
                    </View>
                  </View>
                  <View style={styles.medidasInfoRow}>
                    <View style={styles.infoTextContainer}>
                      <Text style={styles.infoTextBlack}>{carroSelecionado.engine.engine_code}</Text>
                    </View>
                  </View>
                </View>
              )}

              <TouchableOpacity onPress={toggleTransmissao} style={styles.buttonStyle}>
                <View style={styles.medidasCenterContainer}>
                  <Text style={styles.medidasText}>Transmissão</Text>
                  <View style={styles.medidasIconContainer}>
                    <Icon name={transmissaoVisiveis ? "chevron-up" : "chevron-down"} marginLeft={26} size={15} color="white" />
                  </View>
                </View>
              </TouchableOpacity>

              {transmissaoVisiveis && (
                <View style={styles.medidasInfoContainer}>
                  <View style={styles.medidasInfoRow}>
                    <View style={styles.labelContainer}>
                      <Text style={styles.label}>Câmbio:</Text>
                    </View>
                  </View>
                  <View style={styles.medidasInfoRow}>
                    <View style={styles.infoTextContainer}>
                      <Text style={styles.infoTextBlack}>{carroSelecionado.transmission.shift}</Text>
                    </View>
                  </View>
                  <View style={styles.medidasInfoRow}>
                    <View style={styles.labelContainer}>
                      <Text style={styles.label}>Quantidade de marchas:</Text>
                    </View>
                  </View>
                  <View style={styles.medidasInfoRow}>
                    <View style={styles.infoTextContainer}>
                      <Text style={styles.infoTextBlack}>{carroSelecionado.transmission.gear}</Text>
                    </View>
                  </View>
                </View>
              )}

              <TouchableOpacity onPress={togglePerformance} style={styles.buttonStyle}>
                <View style={styles.medidasCenterContainer}>
                  <Text style={styles.medidasText}>Permormance</Text>
                  <View style={styles.medidasIconContainer}>
                    <Icon name={performanceVisiveis ? "chevron-up" : "chevron-down"} marginLeft={15} size={15} color="white" />
                  </View>
                </View>
              </TouchableOpacity>

              {performanceVisiveis && (
                <View style={styles.medidasInfoContainer}>
                  <View style={styles.medidasInfoRow}>
                    <View style={styles.labelContainer}>
                      <Text style={styles.label}>Velocidade máxima:</Text>
                    </View>
                  </View>
                  <View style={styles.medidasInfoRow}>
                    <View style={styles.infoTextContainer}>
                      <Text style={styles.infoTextBlack}>Gasolina: {carroSelecionado.performance.max_speed.gasoline} km/h</Text>
                      <Text style={styles.infoTextBlack}>Etanol: {carroSelecionado.performance.max_speed.ethanol} km/h</Text>
                    </View>
                  </View>
                  <View style={styles.medidasInfoRow}>
                    <View style={styles.labelContainer}>
                      <Text style={styles.label}>Aceleração:</Text>
                    </View>
                  </View>
                  <View style={styles.medidasInfoRow}>
                    <View style={styles.infoTextContainer}>
                      <Text style={styles.infoTextBlack}>Gasolina: {carroSelecionado.performance.acceleration.gasoline} (0-100 km/h)s</Text>
                      <Text style={styles.infoTextBlack}>Etanol: {carroSelecionado.performance.acceleration.ethanol} (0-100 km/h)s</Text>
                    </View>
                  </View>
                </View>
              )}

              <TouchableOpacity onPress={togglePneu} style={styles.buttonStyle}>
                <View style={styles.medidasCenterContainer}>
                  <Text style={styles.medidasText}>Pneu</Text>
                  <View style={styles.medidasIconContainer}>
                    <Icon name={pneuVisiveis ? "chevron-up" : "chevron-down"} marginLeft={79} size={15} color="white" />
                  </View>
                </View>
              </TouchableOpacity>

              {pneuVisiveis && (
                <View style={styles.medidasInfoContainer}>
                  <View style={styles.medidasInfoRow}>
                    <View style={styles.labelContainer}>
                      <Text style={styles.label}>Frontais:</Text>
                    </View>
                  </View>
                  <View style={styles.medidasInfoRow}>
                    <View style={styles.infoTextContainer}>
                      <Text style={styles.infoTextBlack}>{carroSelecionado.tire.front}</Text>
                    </View>
                  </View>
                  <View style={styles.medidasInfoRow}>
                    <View style={styles.labelContainer}>
                      <Text style={styles.label}>Traseiros:</Text>
                    </View>
                  </View>
                  <View style={styles.medidasInfoRow}>
                    <View style={styles.infoTextContainer}>
                      <Text style={styles.infoTextBlack}>{carroSelecionado.tire.rear}</Text>
                    </View>
                  </View>
                </View>
              )}

              <TouchableOpacity onPress={toggleFreios} style={styles.buttonStyle}>
                <View style={styles.medidasCenterContainer}>
                  <Text style={styles.medidasText}>Freios</Text>
                  <View style={styles.medidasIconContainer}>
                    <Icon name={freiosVisiveis ? "chevron-up" : "chevron-down"} marginLeft={70} size={15} color="white" />
                  </View>
                </View>
              </TouchableOpacity>

              {freiosVisiveis && (
                <View style={styles.medidasInfoContainer}>
                  <View style={styles.medidasInfoRow}>
                    <View style={styles.labelContainer}>
                      <Text style={styles.label}>Frontais:</Text>
                    </View>
                  </View>
                  <View style={styles.medidasInfoRow}>
                    <View style={styles.infoTextContainer}>
                      <Text style={styles.infoTextBlack}>{carroSelecionado.breakes.front}</Text>
                    </View>
                  </View>
                  <View style={styles.medidasInfoRow}>
                    <View style={styles.labelContainer}>
                      <Text style={styles.label}>Traseiros:</Text>
                    </View>
                  </View>
                  <View style={styles.medidasInfoRow}>
                    <View style={styles.infoTextContainer}>
                      <Text style={styles.infoTextBlack}>{carroSelecionado.breakes.rear}</Text>
                    </View>
                  </View>
                </View>
              )}

              <TouchableOpacity onPress={toggleProblemasAndAlert} style={styles.problemaButtonStyle}>
                <View style={styles.medidasCenterContainer}>
                  <Text style={styles.medidasText}>Problemas Crônicos</Text>
                  <View style={styles.medidasIconContainer}>
                    <Icon name={problemasVisiveis ? "chevron-up" : "chevron-down"} marginLeft={45} size={15} color="white" />
                  </View>
                </View>
              </TouchableOpacity>

              {problemasVisiveis && (
                <View style={styles.medidasInfoContainer}>
                  <View style={styles.problemaInfoRow}>
                    <View style={styles.labelContainer}>
                      <Text style={styles.problemaLabel} >
                        Problemas Crônicos
                      </Text>
                      <Text style={styles.infoTextBlack}>
                        {problems.map(item => (
                          <View>
                            <Text style={{ paddingTop: 10, fontWeight: "bold", }}>
                              •{item}.
                            </Text>
                          </View>
                        ))}
                      </Text>
                    </View>
                  </View>
                </View>
              )}
              
            </View>
            <View style={styles.separator}></View>
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
      <Footer navigation={navigation} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  separator: {
    height: 1, // Altura da linha
    backgroundColor: "mediumblue", // Cor da linha
    marginTop: 30,
    marginHorizontal: 20, // Espaço nas laterais
    marginBottom: 20, // Espaço abaixo da linha
  },
  centeredButtonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonStyle: {
    width: 250, // Defina o tamanho desejado para todos os botões
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 30,
    paddingHorizontal: 20,
    paddingVertical: 2,
    borderRadius: 20,
    backgroundColor: "mediumblue",
  },
  problemaButtonStyle: {
    width: 320, // Defina o tamanho desejado para todos os botões
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginTop: 30,
    paddingHorizontal: 20,
    paddingVertical: 2,
    borderRadius: 20,
    backgroundColor: "firebrick",
  },
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
    fontSize: 18,
    fontWeight: "bold",
    color: "mediumblue", // Cor do texto na seção inferior
  },
  problemaLabel: {
    fontSize: 18,
    fontWeight: "bold",
    color: "firebrick", // Cor do texto na seção inferior
  },
  infoTextBlack: {
    color: "black",
    fontSize: 15,
  },
  medidasContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
  medidasCenterContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20, // Ajuste a altura aumentando o valor do paddingVertical
    paddingVertical: 10,
    borderRadius: 15, // Borda arredondada
  },
  medidasText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "white", // Cor do texto na caixa azul
  },
  medidasIconContainer: {
    marginLeft: 30,
    alignItems: "center",

  },
  medidasInfoContainer: {
    marginTop: 10,
    alignItems: "center", // Centraliza os títulos na tela
    backgroundColor: "lightgray", // Cor de fundo cinza
    borderRadius: 10, // Bordas arredondadas
    padding: 10, // Espaçamento interno
  },
  medidasInfoRow: {
    flexDirection: "row",
    alignItems: "center", // Centraliza verticalmente os títulos
    justifyContent: "center", // Centraliza horizontalmente os títulos
    marginBottom: 8,
    marginStart: 50
  },
  problemaInfoRow: {
    flexDirection: "row",
    alignItems: "center", // Centraliza verticalmente os títulos
    justifyContent: "center", // Centraliza horizontalmente os títulos
    marginBottom: 8,
    marginStart: 20
  },
  labelContainer: {
    flex: 1, // Ocupa metade do espaço disponível na largura
    alignItems: "flex-start", // Alinha o início do título à esquerda
  },
  infoTextContainer: {
    flex: 1, // Ocupa metade do espaço disponível na largura
    alignItems: "flex-start", // Alinha o início do texto à esquerda
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    marginTop: 10,
    marginLeft: 10,
  },
  infoColumn: {
    flex: 1,
    alignItems: "center", // Centralize verticalmente
  },
  priceContainer: {
    marginTop: 8, // Adicione um espaçamento na parte superior do Preço
    alignItems: "center", // Centralize verticalmente
    height: 40, // Ajuste a altura para centralizar o Preço
  },
});

export default Car;
