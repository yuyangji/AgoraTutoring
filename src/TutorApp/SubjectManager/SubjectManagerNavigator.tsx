import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Assessments from "../../StudentApp/Assessments/Assessments";
import { MyTheme } from "../../useGlobalStyles";
import AdminView from "./AdminView";
import AssessmentsView from "./AssessmentsView";
import GroupListView from "./GroupListView";

const Tab = createMaterialTopTabNavigator();

function SubjectManagerNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: MyTheme.colors.secondary,
        tabBarInactiveTintColor: "white",
        tabBarLabelStyle: { fontSize: 10 },
        tabBarStyle: { backgroundColor: MyTheme.colors.primary },
      })}
    >
      <Tab.Screen name="Admin" component={AdminView} />
      <Tab.Screen name="Assessments" component={AssessmentsView} />
      <Tab.Screen name="Lessons" component={GroupListView} />
    </Tab.Navigator>
  );
}

export default SubjectManagerNavigator;
