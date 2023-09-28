import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import axios from "axios";
import Footer from './Footer';
import { useAuth } from "./contexts/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

const logo = require('../assets/logo.png');
const API_URL = 'http://192.168.43.234:5000';

const UserProfile = () => {
    const navigation = useNavigation();
    const { user, logout } = useAuth();
    const [userCars, setUserCars] = useState([]);

    useEffect(() => {
        const fetchUserCars = async () => {
            try {
                const response = await axios.get(`${API_URL}/api/user_car/list_user_cars`, {
                    headers: {
                        Authorization: `Bearer ${user.token}`
                    }
                });

                setUserCars(response.data.data);
            } catch (error) {
                console.error('Erro ao buscar carros do usuário:', error);
            }
        };

        if (user) {
            fetchUserCars();
        }
    }, [user]);

    const handleLogout = async () => {
        await logout();
        navigation.navigate('Login');
    };

    const UserInfoCar = async (car) => {
        navigation.navigate('UserCar' , {carroSelecionado: car} )
    }

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={["black", "#020272"]}
                style={styles.header}
            >
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Icon name="chevron-left" size={20} color="white" marginTop={25} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Perfil do Usuário</Text>
            </LinearGradient>

            <View style={styles.content}>
                <ScrollView style={styles.scrollView}>
                    {user ? (
                        <>
                            <View style={styles.userInfoContainer}>
                                <LinearGradient
                                    colors={["black", "darkblue"]}
                                    style={styles.userContainerGradient}
                                    start={{ x: 0, y: 0.5 }}
                                    end={{ x: 1, y: 0.5 }}
                                >
                                    <Icon name="user" size={24} color="white" marginLeft={7} />
                                    <Text style={styles.userInfo}>Nome: {user.name}</Text>
                                </LinearGradient>
                            </View>
                            <View style={styles.userInfoContainer}>
                                <LinearGradient
                                    colors={["black", "darkblue"]}
                                    style={styles.userContainerGradient}
                                    start={{ x: 0, y: 0.5 }}
                                    end={{ x: 1, y: 0.5 }}
                                >
                                    <Icon name="envelope" size={24} color="white" />
                                    <Text style={styles.userInfo}>Email: {user.email}</Text>
                                </LinearGradient>
                            </View>
                            <View style={styles.userInfoContainer2}>
                                <Text style={styles.carInfo}>Meus Veículos:</Text>
                            </View>
                            {userCars.map((car) => (
                                <TouchableOpacity
                                key={car._id}
                                style={styles.carouselItem}
                                onPress={() => UserInfoCar(car)}
                              >
                                <View key={car._id} style={styles.carBox}>
                                    <Image
                                        source={{ uri: car.car[0].photos[0] }}
                                        style={styles.carImage}
                                    />
                                    <View style={styles.carInfoContainer}>
                                        <Text style={styles.text}>{car.car[0].brand} {car.car[0].model}</Text>
                                        <View style={styles.itemInfoContainer}>
                                            <Text style={styles.secondaryText}>{car.car[0].version}  {car.car[0].year}</Text>
                                        </View>
                                        <Text style={styles.plateText}>Placa: {car.placa}</Text>
                                    </View>
                                </View>
                                </TouchableOpacity>
                            ))}
                            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                                <Text style={styles.logoutButtonText}>Logout</Text>
                            </TouchableOpacity>
                        </>
                    ) : null}
                </ScrollView>
            </View>
            <Footer navigation={navigation} />
        </View>
    );
};

const styles = StyleSheet.create({
    userContainerGradient: {
        width: "80%",
        borderRadius: 10,
        padding: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        backgroundColor: "#020272",
    },
    scrollView: {
        flex: 1,
    },
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: 10,
    },
    backButton: {
        marginRight: 16,
    },
    headerTitle: {
        marginTop: 25,
        fontSize: 20,
        fontWeight: "bold",
        color: "white",
    },
    content: {
        backgroundColor: "#03035B",
        flex: 1,
        paddingHorizontal: 16,
        paddingVertical: 2,
    },
    userInfoContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 16,
    },
    userInfoContainer2: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center", // Centralizar horizontalmente
        marginBottom: 20,
        marginTop: 45
    },
    userInfo: {
        fontSize: 16,
        marginLeft: 10,
        color: "white",
    },
    carBox: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 40,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        padding: 8,
    },
    carInfo: {
        fontSize: 20,
        marginLeft: 10,
        fontWeight: "bold",
        color: "white",
    },
    logoutButton: {
        backgroundColor: "darkred",
        padding: 10,
        borderRadius: 5,
        alignItems: "center",
        marginTop: 20,
    },
    logoutButtonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
    carContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 16,
    },
    carImage: {
        width: 160, // Ajuste o tamanho da imagem conforme necessário
        height: 100, // Ajuste o tamanho da imagem conforme necessário
        borderRadius: 40,
        marginRight: 10,
    },
    carName: {
        fontSize: 16,
        color: "white",
    },
    carInfoContainer: {
        flexDirection: 'column',
    },

    itemInfoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10
    },

    text: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        paddingLeft: 8,
    },

    secondaryText: {
        color: 'white',
        fontSize: 12,
    },
    plateText: {
        color: '#B4B4B4',
        fontSize: 15,
        paddingLeft: 8,
        paddingTop:10
    },
});

export default UserProfile;
