import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import Page from "./Page";
import axiosInstance from "./config/AxiosInstance";

const ItemDetails = ({ route }) => {
  const [data, setData] = useState(null);
  const { id, type, nombre } = route.params;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(`${type}/${id}`);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, [id, type]);

  return (
    <Page scrollEnabled={true}>
      {type === "Dispositivos" ? (
        <DeviceDetailsComponent deviceData={data?.data} />
      ) : (
        <UserDetailsComponent userData={data?.resp} />
      )}
    </Page>
  );
};

const UserDetailsComponent = ({ userData }) => {
  const {
    nombre,
    apellido,
    genero,
    cargo,
    tipo_usuario,
    usuario,
    anydesk_id,
    estado,
    Dispositivo,
  } = userData || {};

  function PcUsed({ Dispositivo }) {
    const { nombre, tipo, marca, modelo, estado } = Dispositivo || {};
    return (
      <View style={{ flexDirection: "column" }}>
        <View
          style={{
            fontSize: 20,
            backgroundColor: "#484848",
            padding: 10,
            marginTop: 10,
            borderRadius: 15,
          }}
        >
          <Text style={{ color: "white", textAlign: "center", fontSize: 30 }}>
            Pc En Uso
          </Text>
          <Text style={{ color: "white", fontSize: 20 }}>
            Nombre de la Pc : {nombre}
          </Text>
          <Text style={{ color: "white", fontSize: 20 }}>Tipo : {tipo}</Text>
          <Text style={{ color: "white", fontSize: 20 }}>Marca : {marca}</Text>
          <Text style={{ color: "white", fontSize: 20 }}>
            modelo : {modelo}
          </Text>
          <Text style={{ color: "white", fontSize: 20 }}>
            modelo : {estado}
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View>
      <Text
        style={{ color: "white", fontSize: 20 }}
      >{`Nombre:  ${nombre} ${apellido}`}</Text>
      <Text
        style={{ color: "white", fontSize: 20 }}
      >{`Género:  ${genero}`}</Text>
      <Text style={{ color: "white", fontSize: 20 }}>{`Cargo:  ${cargo}`}</Text>
      <Text
        style={{ color: "white", fontSize: 20 }}
      >{`Tipo de usuario:  ${tipo_usuario}`}</Text>
      <Text
        style={{ color: "white", fontSize: 20 }}
      >{`Usuario:  ${usuario}`}</Text>
      <Text
        style={{ color: "white", fontSize: 20 }}
      >{`ID de AnyDesk:  ${anydesk_id}`}</Text>
      <Text
        style={{
          color: "white",
          fontSize: 20,
          backgroundColor: EstatusDevice(estado),
          padding: 10,
          marginTop: 10,
          borderRadius: 15,
        }}
      >{`Estado :  ${estado}`}</Text>
      {Dispositivo?.length === 0 ? (
        <Text
          style={{
            color: "white",
            fontSize: 20,
            backgroundColor: "red",
            padding: 10,
            marginTop: 10,
            borderRadius: 15,
          }}
        >{`Sin Dispositivo`}</Text>
      ) : (
        <PcUsed Dispositivo={Dispositivo} />
      )}
    </View>
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
const DeviceDetailsComponent = ({ deviceData }) => {
    const { nombre, tipo, marca, modelo, estado, DetalleDispositivos } =
      deviceData || {};
  
    return (
      <View>
        <Text style={styles.detailText}>{`Nombre: ${nombre}`}</Text>
        <Text style={styles.detailText}>{`Tipo: ${tipo}`}</Text>
        <Text style={styles.detailText}>{`Marca: ${marca}`}</Text>
        <Text style={styles.detailText}>{`Modelo: ${modelo || "N/A"}`}</Text>
        <ActionDevice data={DetalleDispositivos} />
      </View>
    );
  };
  
  const ActionDevice = ({ data }) => {
    const {
      Config_ip,
      Placa_modelo,
      Placa_detalle,
      Procesador_marca,
      Procesador_modelo,
      Ram_cantidad,
      Ram_Modulos,
      Almacenamiento_canti,
      Almacenamiento_detalle,
    } =data && data.length > 0 ? data[0] : {};
  
    return (
      <View>
        <Text style={styles.detailText}>{`Ip: ${Config_ip || ""}`}</Text>
        <Text style={styles.detailText}>{`Placa_modelo: ${Placa_modelo || ""}`}</Text>
        <Text style={styles.detailText}>{`Placa_detalle: ${Placa_detalle || ""}`}</Text>
        <Text style={styles.detailText}>{`Procesador_marca: ${Procesador_marca}`}</Text>
        <Text style={styles.detailText}>{`Procesador_modelo: ${Procesador_modelo}`}</Text>
        <Text style={styles.detailText}>{`Ram_cantidad: ${Ram_cantidad}`}</Text>
  
        {Ram_Modulos?.map((item, index) => (
          <View key={index} style={{ backgroundColor:"#484848" ,padding:20,borderRadius:20,marginVertical:5}}>
            <Text style={styles.detailText}>{`Gb: ${item.gb}`}</Text>
            <Text style={styles.detailText}>{`Tipo: ${item.tipo}`}</Text>
            <Text style={styles.detailText}>{`Marca: ${item.marca}`}</Text>
          </View>
        ))}
  
        <Text style={styles.detailText}>{`Almacenamiento_canti: ${Almacenamiento_canti}`}</Text>
        {Almacenamiento_detalle?.map((item, index) => (
          <View key={index}  style={{ backgroundColor:"#484848",padding:20,borderRadius:20,marginVertical:5 }}>
            <Text style={styles.detailText}>{`Gb: ${item.gb}`}</Text>
            <Text style={styles.detailText}>{`Tipo: ${item.tipo}`}</Text>
            <Text style={styles.detailText}>{`Marca: ${item.marca}`}</Text>
          </View>
        ))}
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    detailText: {
      color: "white",
      fontSize: 20,
    },
  });
export default ItemDetails;
