import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginSign from "./screen/LoginSign";
import Home from "./screen/Home";

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer initialRouteName="Login">
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginSign}
          options={{ headerShown: false }}
        />

        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
