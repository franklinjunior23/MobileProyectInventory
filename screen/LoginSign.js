import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  Alert,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import axiosInstance from "./config/AxiosInstance";
import DataUserAuth from "./state/AuthUser";
import axios from "axios";

export default function LoginSign({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setTokenAuth, setDataUser } = DataUserAuth();


  const handleSubmiting = async () => {
    try {
      
      const response = await axiosInstance.post("auth/login", {
        usuario: username,
        contraseña: password,
      });
      const data = response.data;

      // Verificar si el inicio de sesión fue exitoso
      if (data.loged === true) {
        // Guardar el token y los detalles del usuario en algún lugar, por ejemplo, AsyncStorage
        // Aquí puedes manejar el token y el usuario según tus necesidades
        // ...
        setTokenAuth(data.token_user);
        setDataUser(data.user);
        // Navegar a la pantalla Home
        navigation.navigate("Home");
      } else {
        // Mostrar un mensaje de error si el inicio de sesión falló
        Alert.alert("Error", "Inicio de sesión fallido");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      Alert.alert("Error", "Ocurrió un error en la solicitud");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.Text}>Intiscorp</Text>
      <View>
        <Image
          style={styles.ImageLogo}
          source={{
            uri: "https://www.intiscorp.com.pe/wp-content/uploads/2022/10/1-1-1.png",
          }}
        />
      </View>
      <TextInput
        style={styles.TextInput}
        placeholder="Ingrese su usuario"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        style={styles.TextInput2}
        placeholder="Ingrese su contraseña"
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <TouchableOpacity style={styles.ButtonSubmit} onPress={handleSubmiting}>
        <Text style={styles.buttonText}>Iniciar Sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#292929",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    paddingHorizontal: 50,
  },
  ImageLogo: {
    width: 150,
    height: 150,
    marginBottom: 50,
  },
  Text: {
    fontSize: 38,
    color: "white",
    marginBottom: 50,
    textTransform: "uppercase",
  },
  ContainerInputs: {
    width: "100%",

    display: "flex",
    flexDirection: "column",
    gap: 20,
  },
  TextInput: {
    height: 50,
    backgroundColor: "#919191",
    width: "100%",
    paddingHorizontal: 20,
    color: "white",
    borderRadius: 10,
  },
  TextInput2: {
    height: 50,
    backgroundColor: "#919191",
    width: "100%",
    paddingHorizontal: 20,
    color: "white",
    borderRadius: 10,
    marginTop: 10,
  },

  ButtonSubmit: {
    width: "100%",
    backgroundColor: "black",
    height: 45,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginTop: 40,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});




