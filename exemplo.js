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
import Intl from 'intl';
import 'intl/locale-data/jsonp/pt-BR'; // Importe a localização desejada, por exemplo, pt-BR para o português brasileiro

const UserCar = ({ route, navigation }) => {
    const { carroSelecionado } = route.params;
    const [infoGeraisVisiveis, setInfoGeraisVisiveis] = useState(false);
    const problems = carroSelecionado.car[0].canonical_problems.split('; ');
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

    const toggleInfoGerais = () => {
        setInfoGeraisVisiveis(!infoGeraisVisiveis);
    };

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
                colors={["white", "#03035B"]}
                style={styles.topSection}
            >
                <View style={styles.header}>
                    <View style={styles.carInfo}>
                        <TouchableOpacity onPress={() => openImageModal(carroSelecionado.car[0].photos[0])}>
                            <Image
                                source={{ uri: carroSelecionado.car[0].photos[0] }}
                                style={styles.carImage}
                            />
                        </TouchableOpacity>
                        <Text style={styles.title}>
                            {carroSelecionado.car[0].brand} - {carroSelecionado.car[0].model}
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
                                <Text style={styles.infoTextBlack}>{carroSelecionado.car[0].brand}</Text>
                            </View>
                            <View style={styles.infoColumn}>
                                <Text style={styles.label} >
                                    Modelo
                                </Text>
                                <Text style={styles.infoTextBlack}>{carroSelecionado.car[0].model}</Text>
                            </View>
                        </View>

                        <View style={styles.infoRow}>
                            <View style={styles.infoColumn}>
                                <Text style={styles.label} >
                                    Versão
                                </Text>
                                <Text style={styles.infoTextBlack}>{carroSelecionado.car[0].version}</Text>
                            </View>
                            <View style={styles.infoColumn}>
                                <Text style={styles.label} >
                                    Ano
                                </Text>
                                <Text style={styles.infoTextBlack}>{carroSelecionado.car[0].year}</Text>
                            </View>
                        </View>

                        <View style={styles.priceContainer}>
                            <View style={styles.infoColumn}>
                                <Text style={styles.label} >
                                    Preço R$
                                </Text>
                                <Text style={styles.infoTextBlack}>
                                    {parseFloat(carroSelecionado.car[0].price).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                </Text>
                            </View>
                        </View>

                        <View style={styles.separator}></View>

                        <View style={styles.centeredButtonContainer}>

                            <TouchableOpacity onPress={toggleInfoGerais} style={styles.buttonStyle}>
                                <View style={styles.medidasCenterContainer}>
                                    <Text style={styles.medidasText}>Informações Gerais</Text>
                                    <View style={styles.medidasIconContainer}>
                                        <Icon name={infoGeraisVisiveis ? "chevron-up" : "chevron-down"} marginLeft={0} size={15} color="white" />
                                    </View>
                                </View>
                            </TouchableOpacity>

                            {infoGeraisVisiveis && (
                                <View>
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
                                                    <Text style={styles.infoTextBlack}>Gasolina: {carroSelecionado.car[0].consumption.urban.gasoline} Km/L</Text>
                                                    <Text style={styles.infoTextBlack}>Etanol: {carroSelecionado.car[0].consumption.urban.ethanol} Km/L</Text>
                                                </View>
                                            </View>
                                            <View style={styles.medidasInfoRow}>
                                                <View style={styles.labelContainer}>
                                                    <Text style={styles.label}>Rodoviário:</Text>
                                                </View>
                                            </View>
                                            <View style={styles.medidasInfoRow}>
                                                <View style={styles.infoTextContainer}>
                                                    <Text style={styles.infoTextBlack}>Gasolina: {carroSelecionado.car[0].consumption.road.gasoline} Km/L</Text>
                                                    <Text style={styles.infoTextBlack}>Etanol: {carroSelecionado.car[0].consumption.road.ethanol} Km/L</Text>
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
                                                    <Text style={styles.infoTextBlack}>{carroSelecionado.car[0].dimensions.length} m</Text>
                                                </View>
                                            </View>

                                            <View style={styles.medidasInfoRow}>
                                                <View style={styles.labelContainer}>
                                                    <Text style={styles.label}>Largura</Text>
                                                </View>
                                            </View>
                                            <View style={styles.medidasInfoRow}>
                                                <View style={styles.infoTextContainer}>
                                                    <Text style={styles.infoTextBlack}>{carroSelecionado.car[0].dimensions.width} m</Text>
                                                </View>
                                            </View>

                                            <View style={styles.medidasInfoRow}>
                                                <View style={styles.labelContainer}>
                                                    <Text style={styles.label}>Altura</Text>
                                                </View>
                                            </View>
                                            <View style={styles.medidasInfoRow}>
                                                <View style={styles.infoTextContainer}>
                                                    <Text style={styles.infoTextBlack}>{carroSelecionado.car[0].dimensions.height} m</Text>
                                                </View>
                                            </View>

                                            <View style={styles.medidasInfoRow}>
                                                <View style={styles.labelContainer}>
                                                    <Text style={styles.label}>Distância entre eixos</Text>
                                                </View>
                                            </View>
                                            <View style={styles.medidasInfoRow}>
                                                <View style={styles.infoTextContainer}>
                                                    <Text style={styles.infoTextBlack}>{carroSelecionado.car[0].dimensions.distance} m</Text>
                                                </View>
                                            </View>

                                            <View style={styles.medidasInfoRow}>
                                                <View style={styles.labelContainer}>
                                                    <Text style={styles.label}>Porta malas</Text>
                                                </View>
                                            </View>
                                            <View style={styles.medidasInfoRow}>
                                                <View style={styles.infoTextContainer}>
                                                    <Text style={styles.infoTextBlack}>{carroSelecionado.car[0].dimensions.trunk} L</Text>
                                                </View>
                                            </View>

                                            <View style={styles.medidasInfoRow}>
                                                <View style={styles.labelContainer}>
                                                    <Text style={styles.label}>Peso</Text>
                                                </View>
                                            </View>
                                            <View style={styles.medidasInfoRow}>
                                                <View style={styles.infoTextContainer}>
                                                    <Text style={styles.infoTextBlack}>{carroSelecionado.car[0].dimensions.weight} Kg</Text>
                                                </View>
                                            </View>

                                            <View style={styles.medidasInfoRow}>
                                                <View style={styles.labelContainer}>
                                                    <Text style={styles.label}>Tanque de Combustível</Text>
                                                </View>
                                            </View>
                                            <View style={styles.medidasInfoRow}>
                                                <View style={styles.infoTextContainer}>
                                                    <Text style={styles.infoTextBlack}>{carroSelecionado.car[0].dimensions.gas_tank} L</Text>
                                                </View>
                                            </View>

                                        </View>
                                    )}

                            ... outros botoes

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
    ... outros styles
});

export default UserCar;
