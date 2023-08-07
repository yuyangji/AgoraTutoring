import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Register } from '../Common/Register/Register';
import { Login } from '../Common/Login/Login';



const Stack = createNativeStackNavigator()

export default function AuthStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={({ route }) => ({
          headerShown: false

        })}
      >
        <Stack.Screen name="SignIn" component={Login} />
        <Stack.Screen name="Register" component={Register} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}