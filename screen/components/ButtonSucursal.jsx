import React, { useState } from "react";
import Modal from "react-native-modal";
import {
  View,
  Text,
  TouchableOpacity,
  Button,
  TextInput,
  Alert,
} from "react-native";
import axios from "axios";
import axiosInstance from "../config/AxiosInstance";

const BottomSucursl = ({ nombre, id }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [WriteNameSucursal, setWriteNameSucursal] = useState("");
  const [DataCreate, setDataCreate] = useState(null);

  const abrirModal = () => {
    setModalVisible(true);
  };

  const cerrarModal = () => {
    setModalVisible(false);
  };

  const handleCreateSucursal = async () => {
    try {
      const { data } = await axiosInstance.post("sucursales", {
        nombre: nombre,
        empresa: id,
      });
      if (data.create) {
        Alert.alert("Sucursal creada correctamente");
      }
      console.log(data.data);
      return setDataCreate(data.data);
    } catch (error) {
      Alert.alert("Error", error);
    }
  };
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "flex-end",
        margin: 20,
      }}
    >
      {/* Botón flotante */}
      <TouchableOpacity
        style={{
          backgroundColor: "#2196F3",
          borderRadius: 25,
          height: 50,
          width: 50,
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
          bottom: 10,
          right: -25,
        }}
        onPress={abrirModal}
      >
        <Text style={{ color: "white", fontSize: 24 }}>+</Text>
      </TouchableOpacity>

      {/* Modal */}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={cerrarModal}
        onBackdropPress={() => cerrarModal()}
      >
        <View style={{ flex: 1 }}>
          <View
            style={{ backgroundColor: "white", padding: 20, borderRadius: 10 }}
          >
            <Text>Crear una sucursal | Empresa : {nombre}</Text>
            <Text>{id}</Text>
            <View style={{ marginTop: 20 }}>
              <Text>Nombre</Text>
              <TextInput
                style={{
                  marginVertical: 10,
                  borderWidth: 1,
                  borderColor: "rgba(0, 0, 0, 0.2)",
                  paddingVertical: 1,
                  paddingHorizontal: 5,
                  borderRadius: 5,
                }}
                onChangeText={(text) => {
                  setWriteNameSucursal(text);
                }}
                placeholder="Escribe aquí"
              />
            </View>

            <View style={{ flexDirection: "row", marginTop: 10 }}>
              <TouchableOpacity
                style={{
                  backgroundColor: "black",
                  borderRadius: 4,
                  padding: 10,
                  paddingHorizontal: 20,
                  marginRight: 5,
                }}
                onPress={handleCreateSucursal}
              >
                <Text style={{ color: "white" }}>Crear Sucursal</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: "rgba(0, 0, 0, 0.6)",
                  borderRadius: 4,
                  padding: 10,
                  paddingHorizontal: 20,
                }}
                onPress={cerrarModal}
              >
                <Text style={{ color: "white" }}>Cerrar Modal</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default BottomSucursl;
