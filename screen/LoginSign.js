
import { StyleSheet, Text, TextInput, View, Image, TouchableOpacity } from "react-native";

export default function LoginSign({ navigation }) {
  function handleSubmiting(){
    navigation.navigate('Home')
  }
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
      <View style={styles.ContainerInputs}>
        <View style={styles.ContainerInput}>
          <TextInput
            style={styles.TextInput}
            placeholder="Ingrese su usuario"
          />
        </View>
        <View style={styles.ContainerInput}>
          <TextInput
            style={styles.TextInput}
            
            placeholder="Ingrese su contraseña"
          />
          
        </View>
      </View>
      <TouchableOpacity style={styles.ButtonSubmit} onPress={handleSubmiting}>
      <Text style={styles.buttonText}>Iniciar Sesion</Text>
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
  ButtonSubmit:{
    width: "100%",
    backgroundColor: "black",
    height:45,
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    borderRadius:10,
    marginTop:40,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});