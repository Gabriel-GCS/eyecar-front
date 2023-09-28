import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Footer from './Footer'; // Importe o componente Footer
import { useAuth } from "./contexts/AuthContext";
import { useNavigation } from "@react-navigation/native"; // Importe useNavigation
import { LinearGradient } from "expo-linear-gradient";

const logo = require('../assets/logo.png');

const UserProfile = () => {
    const navigation = useNavigation();
    const { user, logout } = useAuth(); // Importe a função de logout do seu contexto

    const handleLogout = async () => {
        // Chame a função de logout do contexto aqui
        await logout();
        // Navegue de volta para a tela de login
        navigation.navigate('Login');
    };

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={["black", "darkblue"]}
                style={styles.header}
            >
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Icon name="chevron-left" size={20} color="white" marginTop={15} />
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
        width:"80%",
        borderRadius: 10,
        padding: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        backgroundColor: "darkblue",
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
        paddingVertical: 20,
    },
    backButton: {
        marginRight: 16,
    },
    headerTitle: {
        marginTop: 15,
        fontSize: 20,
        fontWeight: "bold",
        color: "white",
    },
    content: {
        backgroundColor: "darkblue",
        flex: 1,
        paddingHorizontal: 16,
        paddingVertical: 20,
    },
    userInfoContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 16,
    },
    userInfo: {
        fontSize: 16,
        marginLeft: 10,
        color: "white"
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
    // Adicione mais estilos conforme necessário para o conteúdo do perfil do usuário.
});

export default UserProfile;