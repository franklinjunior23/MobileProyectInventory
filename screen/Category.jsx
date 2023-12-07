import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Page from "./Page";
import axiosInstance from "./config/AxiosInstance";

const Category = ({ route, navigation }) => {
  const [DataDispositivos, setDataDispositivos] = useState(null);
  const [DataUser, setDataUser] = useState(null);
  const { nombre, id, NombreEmpresa } = route.params;

  return (
    <Page scrollEnabled={true}>
      <Text>Category</Text>
      <Text>{NombreEmpresa}</Text>
      <AccordionExample
        navigation={navigation}
        SucursalName={nombre}
        nombreEmpresa={NombreEmpresa}
      />
    </Page>
  );
};

const styles = StyleSheet.create({});

export default Category;

const AccordionItem = ({ title, data, expanded, onPress, navigation }) => {
  const ondanlenavigate = (id, type, nombre) => {
    if(type ==='Dispositivos')return navigation.navigate("ItemDetails", { id, type:'Dispositivos', nombre });
    navigation.navigate("ItemDetails", { id, type:'Users', nombre });
  };
  return (
    <ScrollView
      style={{
        backgroundColor: "#484848",
        padding: 30,
        borderRadius: 30,
        marginVertical: 10,
      }}
    >
      <TouchableOpacity onPress={onPress}>
        <View>
          <Text style={{ color: "white", fontSize: 20 }}>{title}</Text>
        </View>
      </TouchableOpacity>
      {expanded && (
        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => ondanlenavigate(item.id, title, item?.nombre)}
              style={{
                backgroundColor: "black",
                marginVertical: 5,
                borderRadius: 10,
                width: "100%",
                height: "auto",
                padding: 15,
              }}
            >
              <Text
                style={{ color: "white", fontSize: 20, textAlign: "center" }}
              >
                {item.nombre} {item?.apellido ?? item.tipo}
              </Text>
              <Text
                style={{
                  color: "white",
                  backgroundColor: EstatusDevice(item?.estado),
                  marginTop: 10,
                  padding: 10,
                  borderRadius: 20,
                  textAlign: "center",
                }}
              >
                {item?.estado}
              </Text>
            </TouchableOpacity>
          )}
        />
      )}
    </ScrollView>
  );
};
function EstatusDevice(estado) {
  switch (estado) {
    case "Activo":
      return "green";
    case "Retirado":
      return "red";
    case "Inaperativa":
      return "blue";
  }
}

const AccordionExample = ({ nombreEmpresa, SucursalName, navigation }) => {
  const [devices, setDevices] = useState([]);
  const [users, setUsers] = useState([]);
  const [expandedSection, setExpandedSection] = useState(null);

  const fetchDevicesAndUsers = async () => {
    try {
      const usersResponse = await axiosInstance.get(
        `Users/${nombreEmpresa}/${SucursalName}`
      );
      const devicesResponse = await axiosInstance.get(
        `Dispositivos/?empresa=${nombreEmpresa}&sucursal=${SucursalName}`
      );
      setDevices(devicesResponse.data);
      setUsers(usersResponse.data);
    } catch (error) {
      console.error("Error al obtener datos:", error.message);
      // Puedes agregar aquí una lógica para informar al usuario sobre el error.
    }
  };

  useEffect(() => {
    fetchDevicesAndUsers();
  }, []);

  const toggleSection = (sectionName) => {
    setExpandedSection((prev) => (prev === sectionName ? null : sectionName));
  };

  return (
    <View>
      <AccordionItem
        title="Dispositivos"
        data={devices}
        expanded={expandedSection === "devices"}
        onPress={() => toggleSection("devices")}
        navigation={navigation}
      />
      <AccordionItem
        title="Usuarios"
        data={users}
        navigation={navigation}
        expanded={expandedSection === "users"}
        onPress={() => toggleSection("users")}
      />
    </View>
  );
};
