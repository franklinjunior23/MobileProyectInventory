import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Image,
  StyleSheet,
  Alert,
  Button,
} from "react-native";
import Carousel from "react-native-snap-carousel";
import Svg, { Path } from "react-native-svg";
import Page from "./Page";
import DataUserAuth from "./state/AuthUser";
import axiosInstance from "./config/AxiosInstance";

const Home = ({ navigation }) => {

  const [empresas, setEmpresas] = useState([]);
  const { DataUser, logout } = DataUserAuth();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("empresas");
        console.log(response.data.data);
        if (!response.data) {
          throw new Error("Error al obtener datos de empresas");
        }

        setEmpresas(response.data);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchData();
  }, []);

  const navigateToDetails = (nombre) => {
    navigation.navigate("Details", { nombre });
  };
  function handlelogout() {
    logout();
    navigation.navigate("Login");
    return Alert.alert("Cerrar Seccion", "Cerrado correctamente");
  }
if(!empresas?.data)return <Text>Cargando...</Text>
  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigateToDetails(item.nombre)}>
      <View
        style={{
          width: 300,
          height: 250,
          backgroundColor: "#484848",
          padding: 20,
          borderRadius: 20,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          TextAlign: "center",
        }}
      >
        <View
          style={{
            display: "flex",
            alignItems: "center",
            TextAlign: "center",
            gap: 20,
          }}
        >
          <Text
            style={{
              fontSize: 36,
              textAlign: "center",
              fontWeight: "bold",
              color: "white",
            }}
          >
            {item.nombre}
          </Text>
          <ComponentImageEmpresa />
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <Page>
      <View style={{ marginTop: 60 }}>
        <Text
          style={{
            marginBottom: 20,
            fontSize: 26,
            color: "#6070FF",
            fontWeight: 800,
          }}
        >
          Bienvenido {DataUser.nombre}
        </Text>
        <Carousel
          style={{ marginTop: 20 }}
          data={empresas?.data}
          renderItem={renderItem}
          sliderWidth={Dimensions.get("window").width}
          itemWidth={300}
          layout={"default"}
        />
        <View>
          <Text
            style={{
              marginTop: 20,
              fontSize: 20,
              fontWeight: 800,
              color: "#6070FF",
            }}
          >
            Detalles
          </Text>
          {Object.keys(empresas?.details).map((item, index) => {
            return (
              <CustomComponent
                key={index}
                color={ColorConteners[index].name}
                label={item}
                data={empresas?.details[item]}
              />
            );
          })}
       
        </View>
      </View>
      <Button onPress={handlelogout} title="Cerrar Seccion"></Button>
    </Page>
  );
};
export const ColorConteners = [
  { name: "#8FC8CC" },
  { name: "#6E3278" },
  { name: "#F3794E" },
  { name: "#FF8484" },
];


export default Home;
const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
  },
  container: {
    maxWidth: '100%',
    height: 140,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    padding: 15,
    marginVertical: 10,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: '#484848', // Change the background color if needed
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'center',
    gap: 3,
  },
  title: {
    fontSize: 30,
    marginLeft:10,
    fontWeight: 'bold',
    color: '#747373',
    flex: 1,
    flexWrap: 'wrap',
  },
  count: {
    fontWeight: 'bold',
    fontSize: 38,
    color:'white',
    marginLeft:20,

  },
  line: {
   
    width: '75%',
    height: 4,
    backgroundColor: '#000000', // Change the default color if needed
    
   
  },
});

const ComponentImageEmpresa = () => {
  return (
    <Svg width={48} height={50} viewBox="0 0 48 50" fill="none">
      <Path
        d="M30.284 49.5766H17.8321C6.44101 49.5766 1.59863 44.7112 1.59863 33.3431V22.9897C1.59863 22.0443 2.38264 21.2603 3.32805 21.2603C4.27347 21.2603 5.05747 22.0443 5.05747 22.9897V33.3431C5.05747 42.7742 8.40101 46.1178 17.8321 46.1178H30.2609C39.692 46.1178 43.0356 42.7742 43.0356 33.3431V22.9897C43.0356 22.0443 43.8196 21.2603 44.765 21.2603C45.7104 21.2603 46.4944 22.0443 46.4944 22.9897V33.3431C46.5175 44.7112 41.652 49.5766 30.284 49.5766Z"
        fill="white"
      />
      <Path
        d="M24.0561 26.5178C21.5196 26.5178 19.2138 25.5262 17.5766 23.7046C15.9394 21.8829 15.1785 19.5078 15.4321 16.9714L16.9771 1.56801C17.0693 0.691768 17.8072 0 18.7065 0H29.4749C30.3742 0 31.1121 0.668709 31.2044 1.56801L32.7493 16.9714C33.003 19.5078 32.242 21.8829 30.6048 23.7046C28.8985 25.5262 26.5926 26.5178 24.0561 26.5178ZM20.2514 3.45884L18.8679 17.3172C18.7065 18.8622 19.1677 20.3149 20.1361 21.3756C22.0961 23.5432 26.0161 23.5432 27.9761 21.3756C28.9446 20.2919 29.4058 18.8391 29.2444 17.3172L27.8608 3.45884H20.2514Z"
        fill="white"
      />
      <Path
        d="M38.6087 26.5178C33.9277 26.5178 29.7541 22.7361 29.2698 18.0782L27.6557 1.91389C27.6096 1.42965 27.771 0.945416 28.0938 0.576473C28.4166 0.20753 28.8778 0 29.3851 0H36.4181C43.1974 0 46.3565 2.83625 47.3019 9.80004L47.9476 16.2104C48.2243 18.9314 47.3941 21.514 45.6186 23.474C43.8431 25.434 41.3527 26.5178 38.6087 26.5178ZM31.299 3.45884L32.7287 17.7323C33.0284 20.6147 35.7033 23.0589 38.6087 23.0589C40.3612 23.0589 41.9292 22.3902 43.0591 21.1681C44.1659 19.946 44.6732 18.3088 44.5118 16.5563L43.8661 10.2151C43.1513 5.00379 41.468 3.45884 36.4181 3.45884H31.299Z"
        fill="white"
      />
      <Path
        d="M9.39106 26.5178C6.64705 26.5178 4.15669 25.434 2.38115 23.474C0.605616 21.514 -0.224505 18.9314 0.0522022 16.2104L0.674793 9.86922C1.64327 2.83625 4.80234 0 11.5817 0H18.6146C19.0989 0 19.56 0.20753 19.9058 0.576473C20.2517 0.945416 20.3901 1.42965 20.344 1.91389L18.7299 18.0782C18.2457 22.7361 14.072 26.5178 9.39106 26.5178ZM11.5817 3.45884C6.53176 3.45884 4.84846 4.98073 4.11057 10.2612L3.48798 16.5563C3.30351 18.3088 3.83386 19.946 4.94069 21.1681C6.04752 22.3902 7.61553 23.0589 9.39106 23.0589C12.2965 23.0589 14.9944 20.6147 15.2711 17.7323L16.7008 3.45884H11.5817Z"
        fill="white"
      />
      <Path
        d="M29.8233 49.5767H18.2939C17.3485 49.5767 16.5645 48.7927 16.5645 47.8473V42.0825C16.5645 37.2402 19.2162 34.5884 24.0586 34.5884C28.901 34.5884 31.5528 37.2402 31.5528 42.0825V47.8473C31.5528 48.7927 30.7687 49.5767 29.8233 49.5767ZM20.0233 46.1178H28.0939V42.0825C28.0939 39.1771 26.964 38.0472 24.0586 38.0472C21.1532 38.0472 20.0233 39.1771 20.0233 42.0825V46.1178Z"
        fill="white"
      />
    </Svg>
  );
};

const CustomComponent=({label,data,color})=>{
  return(
    <View style={styles.container}>
      <View style={styles.header}>
        <ComponenteAzul style={{ color: color || 'white' }} color={color} width={35} height={35} />
        <Text style={styles.title}>{label}</Text>
      </View>
      <Text style={styles.count}>{data}</Text>
      <View style={[styles.line, { backgroundColor: color }]} />
    </View>
  )
}

function ComponenteAzul({color}){
  return(
    <Svg
    xmlns="http://www.w3.org/2000/svg"
    width="35"
    height="35"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ color: `${color}` || 'red' }}
  >
    <Path d="M14 2a5 5 0 0 1 5 5c0 .712 -.232 1.387 -.5 2c1.894 .042 3.5 1.595 3.5 3.5c0 1.869 -1.656 3.4 -3.5 3.5c.333 .625 .5 1.125 .5 1.5a2.5 2.5 0 0 1 -2.5 2.5c-.787 0 -1.542 -.432 -2 -1c-.786 1.73 -2.476 3 -4.5 3a5 5 0 0 1 -4.583 -7a3.5 3.5 0 0 1 -.11 -6.992l.195 0a2.5 2.5 0 0 1 2 -4c.787 0 1.542 .432 2 1c.786 -1.73 2.476 -3 4.5 -3z" />
    <Path d="M8.5 9l-3 -1" />
    <Path d="M9.5 5l-1 4l1 2l5 2l4 -4" />
    <Path d="M18.499 16l-3 -.5l-1 -2.5" />
    <Path d="M14.5 19l1 -3.5" />
    <Path d="M5.417 15l4.083 -4" />
  </Svg>
  );
}