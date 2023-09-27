import React, { useState, useEffect } from "react";
import axios from "axios";
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome } from '@expo/vector-icons';
import Footer from './Footer';
import { useAuth } from "./contexts/AuthContext";

const image = { uri: 'https://cdn.discordapp.com/attachments/638525255744225280/1153450485525786734/pexels-yurii-hlei-1545743.jpg' };
const logo = require('../assets/logo.png');

const Home = ({ navigation }) => {
  const { user } = useAuth();
  const API_URL = 'http://192.168.0.109:5000';
  const [carData, setCarData] = useState({ data: [] });

  useEffect(() => {
    const fetchCarFavorites = async () => {
      try {
        const { data } = await axios(`${API_URL}/api/car/car_favorites`,{
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        });
        
        setCarData(data);
      } catch (error) {
        console.error('Erro ao buscar carros favoritos:', error);
      }
    };

    fetchCarFavorites();
  }, []);

  const handleItemClick = async (carId) => {
    try {
      const { data } = await axios(`${API_URL}/api/car/id?car_id=${carId}`, {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      });
      navigation.navigate('Car', { carroSelecionado: data.data });

    } catch (error) {
      console.log(error);
    }
  };
  
  return (
    <View style={styles.container}>
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
            <View style={styles.iconsContainer}>
              <View style={styles.iconContainer}>
                <TouchableOpacity onPress={() => navigation.navigate('Profile')}style={styles.icon}>
                  <FontAwesome name="user" size={25} color="white" />
                </TouchableOpacity>
                <Text style={styles.iconText}>Perfil</Text>
              </View>
              <View style={styles.iconContainer}>
                <TouchableOpacity onPress={() => navigation.navigate('Profile')}style={styles.icon}>
                  <FontAwesome name="heart" size={25} color="white" />
                </TouchableOpacity>
                <Text style={styles.iconText}>Favoritos</Text>
              </View>
              <View style={styles.iconContainer}>
                <TouchableOpacity onPress={() => navigation.navigate('Search')}style={styles.icon}>
                  <FontAwesome name="search" size={25} color="white" />
                </TouchableOpacity>
                <Text style={styles.iconText}>Procurar</Text>
              </View>
              <View style={styles.iconContainer}>
                <TouchableOpacity onPress={() => navigation.navigate('Profile')}style={styles.icon}>
                  <FontAwesome name="car" size={25} color="white" />
                </TouchableOpacity>
                <Text style={styles.iconText}>Veículos</Text>
              </View>
            </View>
            <Text style={styles.carouselTitle}>Carros Favoritos</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
            >
              {carData.data.map((car) => (
                <TouchableOpacity
                  key={car._id}
                  style={styles.carouselItem}
                  onPress={() => handleItemClick(car._id)}
                >
                  <View style={styles.carouselItemBox}>
                    <Image
                      source={{ uri: car.photos[0] }}
                      style={styles.carouselItemImage}
                    />
                    {/* Estrutura para o ícone de coração vermelho e número de favoritos */}
                    <View style={styles.favoriteContainer}>
                      <View style={styles.favoriteIcon}>
                        <FontAwesome name="heart" size={10} color="red" />
                      </View>
                      <Text style={styles.favoriteCount}>{car.favorites}</Text>
                    </View>
                  </View>
                  <Text style={styles.carouselItemText}>{car.name}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </ScrollView>
      </LinearGradient>
      <Footer navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 60,
  },
  logo: {
    width: 110,
    height: 40,
  },
  title: {
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold',
    marginTop: 20,
  },
  topSection: {
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  iconsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
  },
  iconContainer: {
    alignItems: 'center',
    marginHorizontal: 15,
  },
  icon: {
    width: 50,
    height: 50,
    backgroundColor: 'transparent',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    color: 'white',
    fontSize: 12,
    marginTop: 5,
  },
  carouselTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 40,
    marginLeft: 10,
    marginBottom: 30,
  },
  carouselItem: {
    marginLeft: 15,
    alignItems: 'center',
  },
  carouselItemBox: {
    position: 'relative', // Para posicionar o ícone de coração
  },
  carouselItemImage: {
    width: 140,
    height: 180,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'white',
  },
  carouselItemText: {
    color: 'white',
    fontSize: 8,
    marginTop: 5,
  },
  favoriteContainer: {
    position: 'absolute',
    top: 8,
    right: 5,
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 2,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'red',
  },
  favoriteIcon: {
    marginRight: 5,
  },
  favoriteCount: {
    fontSize: 10,
    color: 'red',
    fontWeight: 'bold',
  },
});

export default Home;