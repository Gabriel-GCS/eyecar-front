import React, { useState, useEffect } from "react";
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  Image,
  Modal,
  TouchableWithoutFeedback
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import mockArray from '../api.json'
import axios from "axios";
import { useAuth } from "./contexts/AuthContext";
import { FontAwesome } from '@expo/vector-icons';
import Footer from './Footer';

const Home = ({ navigation }) => {
  const [text, setText] = useState('');
  const [order_by, setOrder_by] = useState('price');
  const [order_type, setOrder_type] = useState(-1);
  const [apiResponse, setApiResponse] = useState([]);
  const [filter, setFilter] = useState('name');
  const [selectedOption, setSelectedOption] = useState(null);
  const [imageModal, setImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const options = [
    { id: '1', label: 'Selecionar por marca' },
    { id: '2', label: 'Selecionar por modelo' },
  ];
  const [sortModalVisible, setSortModalVisible] = useState(false);
  const [selectedSortOption, setSelectedSortOption] = useState(null);

  const { user } = useAuth();

  const handleSortOptionSelect = (option) => {
    setSelectedSortOption(option);
    setSortModalVisible(false);
    // Atualize os estados order_by e order_type com base na opção selecionada
    switch (option) {
      case 'price-up':
        setOrder_by('price');
        setOrder_type(-1);
        break;
      case 'price-down':
        setOrder_by('price');
        setOrder_type(1);
        break;
      case 'year-up':
        setOrder_by('year');
        setOrder_type(-1);
        break;
      case 'year-down':
        setOrder_by('year');
        setOrder_type(1);
        break;
      case 'brand-up':
        setOrder_by('brand');
        setOrder_type(-1);
        break;
      case 'brand-down':
        setOrder_by('brand');
        setOrder_type(1);
        break;
      case 'model-up':
        setOrder_by('model');
        setOrder_type(-1);
        break;
      case 'model-down':
        setOrder_by('model');
        setOrder_type(1);
        break;
      default:
        // Se nenhuma opção corresponder, redefina order_by e order_type
        setOrder_by('price');
        setOrder_type(-1);
    }
  };

  useEffect(() => {
    // Função para buscar dados da API com base no searchText
    const fetchData = async () => {
      try {
        const { data } = await axios(`http://192.168.1.106:5000/api/car/list?filter_data=${text}&filter_by=${filter}&order_by=${order_by}&order_type=${order_type}&limit=50`);
        setApiResponse(data.data);
        console.log('zzzzz')
        console.log(data.data)

      } catch (error) {
        console.log(error);
      }
    };
    fetchData()
  }, [text, filter, order_by, order_type]);

  const handleItemClick = async (item) => {
    try {
      const { data } = await axios(`http://192.168.1.106:5000/api/car/id?car_id=${item._id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      });

      navigation.navigate('Car', { carroSelecionado: data.data });

    } catch (error) {
      console.log(error);
    }
  };

  const openImageModal = (imageUrl) => {
    setSelectedImage(imageUrl);
    setImageModal(true);
  };

  const closeImageModal = () => {
    setImageModal(false);
  };

  const renderModalItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        setSelectedOption(item.id);
        if (item.label == 'Selecionar por modelo') {
          setFilter('model');
        }
        if (item.label == 'Selecionar por marca') {
          setFilter('brand');
        }
        setModalVisible(false);
      }}
      style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: 'lightgray' }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {selectedOption === item.id ? (
          <View style={styles.selectedOptionCircle}></View>
        ) : (
          <View style={styles.emptyOptionCircle}></View>
        )}
        <Text style={{ marginLeft: 10 }}>{item.label}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleItemClick(item)}>
      <View style={styles.itemContainer}>
        <View style={styles.leftContainer}>
          {item.photos && item.photos.length > 0 ? (
            <TouchableOpacity onPress={() => openImageModal(item.photos[0])}>
              <Image style={styles.imagem} source={{ uri: item.photos[0] }} />
            </TouchableOpacity>
          ) : (
            <Text>No Image Available</Text>
          )}
          <View style={styles.carInfoContainer}>
            <Text style={styles.text}>{item.brand} {item.model}</Text>
            <View style={styles.itemInfoContainer}>
              <Text style={styles.secondaryText}>{item.version}  {item.year}</Text>
            </View>
          </View>
        </View>
        <View style={styles.rightContainer}>
          <View style={styles.likeFavoriteItem}>
            <FontAwesome name="thumbs-up" size={16} color="blue" />
            <Text style={styles.likeFavoriteText}>{item.likes}</Text>
          </View>
          <View style={styles.likeFavoriteItem}>
            <FontAwesome name="star" size={16} color="yellow" />
            <Text style={styles.likeFavoriteText}>{item.favorites}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient
        colors={["black", "darkblue"]}
        style={styles.headerContainer}
      >
        <Text style={styles.headerTitle}>Buscar Carros</Text>
        <View style={styles.searchContainer}>
          <View style={styles.searchInputContainer}>
            <FontAwesome name="search" size={20} color="white" style={styles.searchIcon} />
            <TextInput
              onChangeText={(text) => setText(text)}
              style={styles.searchInput}
              placeholder="Pesquisar"
            />
          </View>
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={styles.filterButton}
          >
            <Image
              source={require('../assets/filter.png')}
              style={styles.filterIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setSortModalVisible(true)}
            style={styles.sortButton}
          >
            <FontAwesome name="sort" size={20} color="white" style={styles.sortIcon} />
          </TouchableOpacity>
        </View>
      </LinearGradient>

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

      <Modal
        transparent={true}
        visible={sortModalVisible}
        onRequestClose={() => {
          setSortModalVisible(false);
        }}
      >
        <TouchableWithoutFeedback onPress={() => setSortModalVisible(false)}>
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
                  maxHeight: 400,
                  width: '80%',
                }}
              >
                <TouchableOpacity
                  onPress={() => handleSortOptionSelect('price-up')}
                  style={styles.sortOption}
                >
                  <Text style={styles.sortOptionText}>Preço ↑</Text>
                  {selectedSortOption === 'price-up' && (
                    <FontAwesome name="check" size={15} color="black" />
                  )}
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleSortOptionSelect('price-down')}
                  style={styles.sortOption}
                >
                  <Text style={styles.sortOptionText}>Preço ↓</Text>
                  {selectedSortOption === 'price-down' && (
                    <FontAwesome name="check" size={15} color="black" />
                  )}
                </TouchableOpacity>
                
                <TouchableOpacity
                  onPress={() => handleSortOptionSelect('year-up')}
                  style={styles.sortOption}
                >
                  <Text style={styles.sortOptionText}>Ano ↑</Text>
                  {selectedSortOption === 'year-up' && (
                    <FontAwesome name="check" size={15} color="black" />
                  )}
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleSortOptionSelect('year-down')}
                  style={styles.sortOption}
                >
                  <Text style={styles.sortOptionText}>Ano ↓</Text>
                  {selectedSortOption === 'year-down' && (
                    <FontAwesome name="check" size={15} color="black" />
                  )}
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => handleSortOptionSelect('brand-up')}
                  style={styles.sortOption}
                >
                  <Text style={styles.sortOptionText}>Marca ↑</Text>
                  {selectedSortOption === 'brand-up' && (
                    <FontAwesome name="check" size={15} color="black" />
                  )}
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleSortOptionSelect('brand-down')}
                  style={styles.sortOption}
                >
                  <Text style={styles.sortOptionText}>Marca ↓</Text>
                  {selectedSortOption === 'brand-down' && (
                    <FontAwesome name="check" size={15} color="black" />
                  )}
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => handleSortOptionSelect('model-up')}
                  style={styles.sortOption}
                >
                  <Text style={styles.sortOptionText}>Modelo ↑</Text>
                  {selectedSortOption === 'model-up' && (
                    <FontAwesome name="check" size={15} color="black" />
                  )}
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleSortOptionSelect('model-down')}
                  style={styles.sortOption}
                >
                  <Text style={styles.sortOptionText}>Modelo ↓</Text>
                  {selectedSortOption === 'model-down' && (
                    <FontAwesome name="check" size={15} color="black" />
                  )}
                </TouchableOpacity>
                
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <FlatList
        data={apiResponse}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />

      <Footer navigation={navigation} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sortButton: {
    marginLeft: 3,
    marginRight:5,
    backgroundColor: 'transparent',
    padding: 5,
  },
  sortIcon: {
    width: 20,
    height: 20,
  },
  sortOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical:10,
  },
  sortOptionText: {
    fontSize: 18,
    marginLeft: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchIcon: {
    marginHorizontal: 10,
  },
  searchInput: {
    flex: 1,
    padding: 10,
  },
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 8,
  },

  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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

  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },

  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  modalContent: {
    backgroundColor: 'white',
    width: '90%',
    aspectRatio: 1,
    borderRadius: 170,
    position: 'relative',
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

  carInfoContainer: {
    flexDirection: 'column',
  },

  itemInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10
  },

  text: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    paddingLeft: 8,
  },

  secondaryText: {
    color: 'black',
    fontSize: 12,
  },

  title: {
    marginTop: 100,
    fontSize: 20,
    fontWeight: "bold",
    color: "#004aad",
    textAlign: "center"
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

  likeFavoriteContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  likeFavoriteItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },

  likeFavoriteText: {
    marginLeft: 4,
  },

  emptyOptionCircle: {
    width: 10,
    height: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginRight: 5,
  },

  selectedOptionCircle: {
    width: 10,
    height: 10,
    borderRadius: 10,
    backgroundColor: 'black',
    marginRight: 5,
  },
  headerContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
    // Defina o gradiente de preto para azul escuro aqui
  },
  headerTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'white',
    marginBottom: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInput: {
    borderWidth: 1,
    backgroundColor: "white",
    borderColor: 'black',
    borderRadius: 5,
    padding: 10,
    flex: 1,
    marginLeft: 8,
    color: 'black',
  },
  filterButton: {
    marginLeft: 15,
    marginRight: 12,
    backgroundColor: "white",
    borderRadius: 5,
    padding: 3,
    borderColor: "black",
    borderWidth: 1,
  },
  filterIcon: {
    width: 20,
    height: 20,
  },
});

export default Home;