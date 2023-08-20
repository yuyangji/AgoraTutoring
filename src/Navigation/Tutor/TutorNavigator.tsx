import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MyTheme } from '../../useGlobalStyles';
import { TutorApp } from './TutorApp';

import ProgramNavigator from './ProgramNavigator';
import LessonCalendar from '../../Screens/Tutor/LessonCalendar';
import { TutorRootStackParamList } from './NavigatorTypes';





const Stack = createNativeStackNavigator<TutorRootStackParamList>()

export default function TutorStack() {

  const screenOptions = {
    headerShown :false
  }

  return (
    <NavigationContainer theme = {MyTheme}>
      <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen name="Main" component={TutorApp} />
        <Stack.Screen name="ProgramNavigator" component={ProgramNavigator}
          options={({route}) =>({
            headerShown: true,
            headerStyle: { backgroundColor: MyTheme.colors.primary },
            headerTitleStyle: { color: 'white', fontWeight: '400' },
             headerTitle: route.params.headerTitle,
          headerTintColor : 'white'
          })}
        />
        <Stack.Screen name="LessonCalendar" component={LessonCalendar}
          options={{
            headerShown: true,
            headerStyle: { backgroundColor: MyTheme.colors.primary },
            headerTitleStyle: { color: 'white', fontWeight: '400' },
          headerTintColor : 'white'
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
