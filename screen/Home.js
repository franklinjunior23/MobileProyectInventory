import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, FlatList } from "react-native";
import Header from "./components/Header";
import { TouchableOpacity } from "react-native-web";

const Home = ({ navigation }) => {
  // Estado para almacenar la lista de empresas
  const [empresas, setEmpresas] = useState([]);

  // Efecto para realizar la petición al montar el componente
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Realizar la petición a la API
        const response = await fetch("https://dev.intisoft.com.pe/api/v1/empresas");
        
        if (!response.ok) {
          throw new Error("Error al obtener datos de empresas");
        }

        // Obtener los datos en formato JSON
        const data = await response.json();

        // Actualizar el estado con los datos de empresas
        setEmpresas(data.data);
      } catch (error) {
        console.error(error.message);
      }
    };

    // Llamar a la función para obtener los datos
    fetchData();
  }, []); // El segundo argumento es un array de dependencias, vacío para ejecutar solo al montar

  return (
    <View style={styles.container}>
      <Header navigation={navigation} />

      {/* Renderizar la lista de empresas */}
      <FlatList
        data={empresas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigateToDetails(item.id)}>
            <View>
              <Text>{item.nombre}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Home;

