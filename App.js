import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginSign from "./screen/LoginSign";
import Home from "./screen/Home";
import Sucursales from "./screen/Sucursales";
import Category from "./screen/Category";

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer initialRouteName="Home">
      <Stack.Navigator>
        {/* <Stack.Screen
          name="Login"
          component={LoginSign}
          options={{ headerShown: false }}
        /> */}

        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Details"
          component={Sucursales}
          options={({ route }) => ({
            title: route.params.nombre,
            headerShown: true,
            headerStyle: { backgroundColor: "#292929" },
            headerTintColor: "#fff",
            headerTitleStyle: { fontWeight: "bold" },
          })}
        />
        <Stack.Screen
          name="Category"
          component={Category}
          options={({ route }) => ({
            title: route.params.nombre,
            headerShown: true,
            headerStyle: { backgroundColor: "#292929" },
            headerTintColor: "#fff",
            headerTitleStyle: { fontWeight: "bold" },
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
