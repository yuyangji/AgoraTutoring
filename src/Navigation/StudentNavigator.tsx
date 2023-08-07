import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StudentMainWithBottomTab } from '../StudentApp/Main/StudentMain';
import { MyTheme } from '../useGlobalStyles';
import Submit from '../StudentApp/Assessments/Submit';

import { NativeStackNavigationProp } from '@react-navigation/native-stack'
//To do navigation types.
export type RootStackParamList = {
  Submit: { submissionId: String,
    submissionTitle: String,
    submissionDueDate: String,
    isSubmitted: boolean};
};

const Stack = createNativeStackNavigator()

export default function StudentStack() {

  const screenOptions = {
    headerShown :false
  }

  return (
    <NavigationContainer theme = {MyTheme}>
      <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen name="Main" component={StudentMainWithBottomTab} />
        <Stack.Screen name="Submit" component={Submit} options={{
          headerBackButtonMenuEnabled: true,
          headerTintColor:'white',
          headerShown: true,
          headerStyle: {
            backgroundColor: MyTheme.colors.primary,
          },
          headerTitleStyle: {
            color:'white'
          }
        }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
