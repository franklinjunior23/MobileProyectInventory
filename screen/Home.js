import { View, StyleSheet, Text } from "react-native";
import Header from "./components/Header";

const Home = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Header navigation={navigation}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
   
  },
});

export default Home;
