import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Icon, Overlay } from "react-native-elements";
import Modal from "react-native-modal";
import Drawer from "react-native-drawer";
const Header = ({ navigation }) => {
  const [isLogoutModalVisible, setLogoutModalVisible] = useState(false);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const toggleLogoutModal = () => {
    setLogoutModalVisible(!isLogoutModalVisible);
  };
  const handleLogout = () => {
    // Implementa la lógica de cierre de sesión aquí
    // ...

    // Cierra el modal después de realizar la acción
    toggleLogoutModal();
  };
  const openDrawer = () => {
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
  };
  function handleSubmiting() {
   navigation.navigate("Login");
  }
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={openDrawer}>
        <Icon name="bars" type="font-awesome" size={30} color="#fff" />
      </TouchableOpacity>
      <Text style={styles.title}>Intiscorp</Text>
      <TouchableOpacity onPress={toggleLogoutModal}>
        <Icon name="user" type="font-awesome" size={30} color="#fff" />
      </TouchableOpacity>

      {/* Modal para confirmar el cierre de sesión */}
      <Modal
        isVisible={isLogoutModalVisible}
        animationIn="slideInUp"
        animationOut="slideOutDown"
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>
            ¿Seguro que quieres cerrar sesión?
          </Text>
          <TouchableOpacity onPress={handleSubmiting}>
            <Text style={styles.modalButton}>Cerrar Sesión</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleLogout}>
            <Text style={styles.modalButton}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};
const YourCustomDrawerContentComponent = ({ onClose }) => {
  return (
    <View style={{ flex: 1, backgroundColor: "#fff", padding: 20 }}>
      {/* Contenido del panel lateral */}
      <Text>Drawer Content</Text>
      <TouchableOpacity onPress={onClose}>
        <Text>Cerrar Panel</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#007BFF",
    padding: 10,
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  modalContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  modalButton: {
    fontSize: 16,
    color: "#007BFF",
    fontWeight: "bold",
    textAlign: "center",
    padding: 10,
    borderWidth: 1,
    borderColor: "#007BFF",
    borderRadius: 5,
    marginBottom: 10,
  },
});

export default Header;
