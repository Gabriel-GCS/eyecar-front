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

const Home = ({ navigation }) => {

    const [text, setText] = useState('');
    const [apiResponse, setApiResponse] = useState([]);

    // useEffect(() => {
    //     // Função para buscar dados da API com base no searchText
    //     const fetchData = async () => {
    //       try {
    //         const response = await fetch(`http://localhost:5000/api/car/list?filter_data=${text}&filter_by=model`);
    //         const data = await response.json();
    //         setApiResponse(data);
    //         console.log(apiResponse.data)
    //       } catch (error) {
    //         console.error('Erro ao buscar dados da API:', error);
    //       }
    //     };

    //     if (text !== '') {
    //         fetchData();
    //       } else {
    //         setApiResponse([]);
    //       }
    //     }, [text]);


    useEffect(() => {
      if(text != '') {
        const resultados = mockArray.filter(item => {
          return item.model.toLowerCase().startsWith(text.toLowerCase());
        }); 
        setApiResponse(resultados)
      }
      else{
        setApiResponse(mockArray)
      } 
      
      
    }, [text])

    const handleItemClick = (item) => {
      navigation.navigate('Car', { carroSelecionado: item });
    };

    const renderItem = ({item}) => (
        <TouchableOpacity onPress={() => handleItemClick(item)}>
          <View style = {styles.itemContainer}>
            <Image style = {styles.imagem} source ={{uri:item.img_url}}/>
            <Text style = {styles.text}>{item.brand} {item.model}</Text>
          </View>
        </TouchableOpacity>
      );
 
    return (
        <SafeAreaView style={{flex: 1}}>
          <View style={{flex: 1}}>        
            <View style={{paddingHorizontal: 16}}>
              <Text style={styles.BuscarText}>Buscar</Text>
              <View>
                <TextInput style={styles.textInput} placeholder="Qual carro deseja procurar?" onChangeText = {newText => setText(newText)} />
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
  container:{
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 8,
  },

  searchBar: {
    flex:1,
    alignItems:"center",
  },

  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },

  BuscarText:{
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

  title:{
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
    margin:10,
  },

  textInput: {
    borderWidth: 2,
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    borderColor:"black"
  },
  

  btnSearch: {
    backgroundColor: "#004aad",
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    borderRadius: 15,
    padding: 15,
    marginTop:10,
  },
});

export default Home;