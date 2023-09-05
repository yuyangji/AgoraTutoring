import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MyTheme } from '../../Styles/useGlobalStyles';
import { TutorApp } from './TutorApp';

import ProgramNavigator from './ProgramNavigator';
import TutorCalendar from '../../Screens/Tutor/TutorCalendar';
import { TutorRootStackParamList } from './NavigatorTypes';
import useTutor from '../../Redux/useTutor';
import CreateAssessment from '../../Screens/Tutor/CreateAssessment';
import Attendance from '../../Screens/Tutor/Attendance';
import AssessmentView from '../../Screens/Tutor/Assessment/AssessmentView';


const Stack = createNativeStackNavigator<TutorRootStackParamList>()

export default function TutorStack() {

  useTutor()

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
        <Stack.Screen name="CreateAssessment" component={CreateAssessment} />
        <Stack.Screen name="Attendance" component={Attendance} />
        <Stack.Screen name = "Assessment" component={AssessmentView}/>
        {/* <Stack.Screen name="LessonCalendar" component={LessonCalendar}
          options={{
            headerShown: true,
            headerStyle: { backgroundColor: MyTheme.colors.primary },
            headerTitleStyle: { color: 'white', fontWeight: '400' },
          headerTintColor : 'white'
          }}
        /> */}
      </Stack.Navigator>
    </NavigationContainer>
  )
}
