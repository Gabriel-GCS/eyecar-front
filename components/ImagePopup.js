import React from 'react';
import { View, Modal, Image, TouchableOpacity, StyleSheet, TouchableWithoutFeedback } from 'react-native';

const ImagePopup = ({ imageUrl, visible, onClose }) => {
  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.container}>
          <TouchableOpacity activeOpacity={1} onPress={() => {}} style={styles.modalContainer}>
            <Image
              source={{ uri: imageUrl }}
              style={{ width: 300, height: 300 }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '80%',
  },
});

export default ImagePopup;
