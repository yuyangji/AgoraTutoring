import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MyTheme } from '../useGlobalStyles';
import { TutorApp } from '../TutorApp/Main/TutorMain';

import SubjectManagerNavigator from '../TutorApp/SubjectManager/SubjectManagerNavigator';
import GroupListView from '../TutorApp/SubjectManager/GroupListView';
import LessonCalendar from '../TutorApp/SubjectManager/LessonCalendar';

const Stack = createNativeStackNavigator()

export default function TutorStack() {

  const screenOptions = {
    headerShown :false
  }

  return (
    <NavigationContainer theme = {MyTheme}>
      <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen name="Main" component={TutorApp} />
        <Stack.Screen name="Subject" component={SubjectManagerNavigator}
          options={{
            headerShown: true,
            headerStyle: { backgroundColor: MyTheme.colors.primary },
            headerTitleStyle: { color: 'white', fontWeight: '400' },
          headerTintColor : 'white'
          }}
        />
        <Stack.Screen name="Lesson" component={LessonCalendar}
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
