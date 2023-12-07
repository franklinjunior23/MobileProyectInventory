import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, FlatList, TouchableOpacity } from "react-native";
import Page from "./Page";
import BottomSucursl from "./components/ButtonSucursal";
import axios from "axios";
import axiosInstance from "./config/AxiosInstance";

const Sucursales = ({ route ,navigation}) => {
  const { nombre } = route.params;
  const [sucursalesData, setSucursalesData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Realizar la petición a /sucursales/${nombre}
        const response = await axiosInstance.get((
          `sucursales/${nombre}`
        ))
  
          
        // Actualizar el estado con los datos de la petición
        setSucursalesData(response.data);
      } catch (error) {
       
      } finally {
        // Marcar la carga como completa, ya sea exitosa o fallida
        setLoading(false);
      }
    };

    // Llamar a la función para realizar la petición
    fetchData();
  }, [nombre]); // Dependencia para que la petición se realice cuando 'nombre' cambie
function navigateToSucursales(id,nombre,NombreEmpresa) {
    navigation.navigate("Category", { id,nombre,NombreEmpresa });
  }
  return (
    <Page scrollEnabled={false}>
        
      {loading ? (
        // Muestra un indicador de carga mientras se obtienen los datos
        <ActivityIndicator size="large" color="#ffffff" />
      ) : (
        <>
          <Text style={{ marginTop:10,marginBottom:15,fontSize:26 ,color:'white' }}>Sucursales</Text>
          {/* Renderiza los detalles de la empresa */}
          <FlatList
            data={sucursalesData}
            keyExtractor={(empresa) => empresa.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => navigateToSucursales(item.id, item.nombre,nombre)}
              style={{ width:"100%" ,backgroundColor:"#484848", height:70 ,marginVertical:10,padding:20,borderRadius:12 }}>
                <View>
                  <Text style={{ color:'white' ,textAlign:'center',fontSize:20 }}>{item.nombre}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
         
        </>
      )}
       <BottomSucursl nombre={nombre} id={sucursalesData[0]?.id_empresa} />
    </Page>
  );
};

export default Sucursales;
