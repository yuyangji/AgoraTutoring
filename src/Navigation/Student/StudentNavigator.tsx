import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StudentAppNavigator } from "./StudentApp";
import { MyTheme } from "../../useGlobalStyles";
import Submit from "../../Screens/Student/Assessments/Submit";
import ProgramSearch from "../../Screens/Student/BrowsePrograms/ProgramSearch";

//To do navigation types.
export type StudentRootStackParamList = {
  Main: undefined;
  Enrol: undefined;
  Submit: { assessmentId: string; submissionId: string };
};

const Stack = createNativeStackNavigator<StudentRootStackParamList>();

export default function StudentStack() {
  const screenOptions = {
    headerShown: false,
  };

  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen name="Main" component={StudentAppNavigator} />
        <Stack.Screen
          name="Enrol"
          component={ProgramSearch}
          options={{
            headerBackButtonMenuEnabled: true,
            headerTintColor: "white",
            headerShown: true,
            headerStyle: {
              backgroundColor: MyTheme.colors.primary,
            },
            headerTitleStyle: {
              color: "white",
            },
          }}
        />
        <Stack.Screen
          name="Submit"
          component={Submit}
          options={{
            headerBackButtonMenuEnabled: true,
            headerTintColor: "white",
            headerShown: true,
            headerStyle: {
              backgroundColor: MyTheme.colors.primary,
            },
            headerTitleStyle: {
              color: "white",
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
