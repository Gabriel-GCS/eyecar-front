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
  Modal,
  TouchableWithoutFeedback
} from "react-native";

import mockArray from '../api.json'
import axios from "axios";
import { useAuth } from "./contexts/AuthContext";
import { FontAwesome } from '@expo/vector-icons';

const Home = ({ navigation }) => {

  const [text, setText] = useState('');
  const [order_by, setOrder_by] = useState('price');
  const [order_type, setOrder_type] = useState('-1');
  const [apiResponse, setApiResponse] = useState([]);
  const [filter, setFilter] = useState('model');

  const [imageModal, setImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  const openImageModal = (imageUrl) => {
    setSelectedImage(imageUrl);
    setImageModal(true);
  };

  const closeImageModal = () => {
    setImageModal(false);
  };

  const [modalVisible, setModalVisible] = useState(false);
  const options = [
    { id: '1', label: 'Selecionar por marca' },
    { id: '2', label: 'Selecionar por modelo' },
  ];

  const { user } = useAuth();


  useEffect(() => {
    // Função para buscar dados da API com base no searchText
    const fetchData = async () => {
      try {
        const { data } = await axios(`http://192.168.0.106:5000/api/car/list?filter_data=${text}&filter_by=${filter}&order_by=${order_by}&order_type=${order_type}`);
        setApiResponse(data.data);

      } catch (error) {
        console.log(error);
      }
    };
    fetchData()
  }, [text, filter]);


  const handleItemClick = async (item) => {
    try {
      const { data } = await axios(`http://192.168.0.106:5000/api/car/id?car_id=${item._id}`, {
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
    <View style={styles.itemContainer}>
      {item.photos && item.photos.length > 0 ? (
        <View>
          <TouchableOpacity onPress={() => openImageModal(item.photos[0])}>
            <Image style={styles.imagem} source={{ uri: item.photos[0] }} />
          </TouchableOpacity>
        </View>
      ) : (
        <Text>No Image Available</Text> // Correção aqui
      )}
      <TouchableOpacity onPress={() => handleItemClick(item)}>
        <Text style={styles.text}>{item.brand} {item.model}</Text>
      </TouchableOpacity>
    </View>
  );

  const renderModalItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        if (item.label == 'Selecionar por modelo') {
          setFilter('model')
        }
        if (item.label == 'Selecionar por marca') {
          setFilter('brand')
        }
        setModalVisible(false)
        console.log(filter)
      }}
      style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: 'lightgray' }}
    >

      <Text>{item.label}</Text>
    </TouchableOpacity>
  );


  return (

    <SafeAreaView style={{ backgroundColor: "lightgray", flex: 1 }}>
      <View>
        <Text style={styles.BuscarText}>Buscar</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TextInput
            onChangeText={(text) => setText(text)}
            style={{
              borderWidth: 1,
              backgroundColor: "white",
              borderColor: 'black',
              borderRadius: 5,
              padding: 10,
              flex: 1,
              marginLeft: 8,
            }}
            placeholder="Qual carro deseja buscar"
          />
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={{
              marginLeft: 8,
              marginRight: 12,
              backgroundColor: "white",
              borderRadius: 5,
              padding: 3,
              borderColor: "black",
              borderWidth: 1,
            }
            }
          >
            <Image
              source={require('../assets/filter.png')} // Substitua pelo caminho da sua imagem
              style={{ width: 30, height: 30 }}
            />
          </TouchableOpacity>
        </View>

        <Modal
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(false);
          }}
        >
          <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'rgba(0,0,0,0.5)',
              }}
            >
              <TouchableWithoutFeedback>
                <View
                  style={{
                    backgroundColor: 'white',
                    padding: 20,
                    borderRadius: 10,
                    maxHeight: 200,
                    width: '80%',
                  }}
                >
                  <FlatList
                    data={options}
                    renderItem={renderModalItem}
                    keyExtractor={(item) => item.id}
                  />
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>

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

  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },

  BuscarText: {
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 16,
    marginLeft: 8,
    marginBottom: 12,
  },

  imagem: {
    width: 64,
    height: 64,
    marginRight: 10,
    borderRadius: 32,
    objectFit: "contain",
    backgroundColor: "white"
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
    position: 'relative', // Usar position absolute
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  modalImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    borderRadius: 170,
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
    padding: 15,
    borderRadius: 5,
    marginTop: 10,
    borderColor: "black",
    width: '80%',
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
