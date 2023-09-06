import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  TextInput,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Button } from "react-native-web";

const mockArray = [
    {'Marca': 'Gol', 'id':1},
    {'Marca': 'Gol', 'id':2},
    {'Marca': 'Gol', 'id':3},
    {'Marca': 'Gol', 'id':4},
    {'Marca': 'Gol', 'id':5},
    {'Marca': 'Gol', 'id':6},
    {'Marca': 'Gol', 'id':7}
]

const Home = ({ navigation }) => {

    const [text, setText] = useState('');
    const [apiResponse, setApiResponse] = useState([]);

    useEffect(() => {
        // Função para buscar dados da API com base no searchText
        const fetchData = async () => {
          try {
            const response = await fetch(`http://localhost:5000/api/car/list?filter_data=${text}&filter_by=model`);
            const data = await response.json();
            setApiResponse(data);
            console.log(apiResponse.data)
          } catch (error) {
            console.error('Erro ao buscar dados da API:', error);
          }
        };

        if (text !== '') {
            fetchData();
          } else {
            setApiResponse([]);
          }
        }, [text]);

        const renderItem = ({item}) => (
            <View>
              <Button>mostrar carro</Button>
              <Text style = {styles.text}>{item.Marca}</Text>
            </View>
          );

    return (
        <View>
    
            <TextInput style={styles.textInput} placeholder="Procurar carro" onChangeText = {newText => setText(newText)} />
                
            <FlatList
                data={mockArray}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    paddingTop: 20,
  },

  searchBar: {
    flex:1,
    alignItems:"center",
  },

  title:{
    marginTop: 100,
    fontSize: 20,
    fontWeight: "bold",
    color: "#004aad",
    textAlign: "center"
  },

  text: {
    color: "#004aad",
    fontSize: 20,
    fontWeight: "bold",
    margin:10,
  },

  textInput: {
    borderWidth: 2,
    padding: 10,
    borderRadius: 25,
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