import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

 
 const Routes = () => {
    return (
        <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Details" component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
 }
 
 
 const styles = StyleSheet.create({})
 
 export default Routes;
 