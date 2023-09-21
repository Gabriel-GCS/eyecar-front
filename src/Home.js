import React, { useState, useEffect } from "react";
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  TextInput,
  SafeAreaView,
  Image,
} from "react-native";

import mockArray from '../api.json'
import axios from "axios";
import { useAuth } from "./contexts/AuthContext";

const Home = ({ navigation }) => {

  const [text, setText] = useState('');
  const [order_by, setOrder_by] = useState('price');
  const [order_type, setOrder_type] = useState('-1');
  const [apiResponse, setApiResponse] = useState([]);
  const [filter, setFilter] = useState('model');

  const { user } = useAuth();


  useEffect(() => {
    // Função para buscar dados da API com base no searchText
    const fetchData = async () => {
      try {
        const { data } = await axios(`http://192.168.0.43:5000/api/car/list?filter_data=${text}&filter_by=${filter}&order_by=${order_by}&order_type=${order_type}`);
        setApiResponse(data.data);

      } catch (error) {
        console.log(error);
      }
    };
    fetchData()
  }, [text]);


  const handleItemClick = async (item) => {
    try {
      const { data } = await axios(`http://192.168.0.43:5000/api/car/id?car_id=${item._id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      });

      navigation.navigate('Car', { carroSelecionado: data.data });

    } catch (error) {
      console.log(error);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleItemClick(item)}>
      <View style={styles.itemContainer}>
        {item.photos && item.photos.length > 0 ? (
          <Image style={styles.imagem} source={{ uri: item.photos[0] }} />
        ) : (
          <Text>No Image Available</Text>
        )}
        <Text style={styles.text}>{item.brand} {item.model}</Text>
      </View>
    </TouchableOpacity>
  );


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }} id="screen">
        <View style={styles.topPage} id="buscar-e-searchBar">
          <Text style={styles.BuscarText}>Buscar</Text>
          <View style={styles.searchBar}>
            <TextInput style={styles.textInput} placeholder="Qual carro deseja procurar?" onChangeText={newText => setText(newText)} />
            <TextInput style={styles.textInput} placeholder="filtro" onChangeText={newText => setFilter(newText)} />
            <TextInput style={styles.textInput} placeholder="order_by" onChangeText={newText => setOrder_by(newText)} />
            <TextInput style={styles.textInput} placeholder="order_type" onChangeText={newText => setOrder_type(newText)} />
          </View>
        </View>
        <FlatList
          data={apiResponse}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 8,
  },

  searchBar: {
    height: '12%',
    flexDirection: "row",
    gap: 3
  },

  topPage: {
    paddingLeft: 16,
  },

  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },

  BuscarText: {
    fontWeight: 'bold',
    fontSize: 20,

  },

  imagem: {
    width: 64,
    height: 64,
    marginRight: 10,
    borderRadius: 32,
    objectFit: "cover",
    backgroundColor: "white"
  },

  title: {
    marginTop: 100,
    fontSize: 20,
    fontWeight: "bold",
    color: "#004aad",
    textAlign: "center"
  },

  text: {
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
    margin: 10,
  },

  textInput: {
    borderWidth: 2,
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    borderColor: "black",
    width: '20%',
  },

  btnSearch: {
    backgroundColor: "#004aad",
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    borderRadius: 15,
    padding: 15,
    marginTop: 10,
  },
});

export default Home;