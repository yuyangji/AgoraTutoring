import { configureFirebaseEmulators } from "./src/Firebase/FirebaseEmulators";

import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { View, Text } from "react-native";
import AuthStack from "./src/Navigation/AuthNavigator";
import StudentStack from "./src/Navigation/Student/StudentNavigator";
import useAuth from "./src/hooks/useAuth";
import { Provider } from "react-redux";
import { store } from "./src/Redux/store";
import { useEffect } from "react";
import TutorStack from "./src/Navigation/Tutor/TutorNavigator";
import { useAppDispatch, useAppSelector } from "./src/Redux/hooks";
import {
  fetchGroups,
  fetchProgramData,
  selectGroups,
} from "./src/Redux/slices/programSlice";
import { selectUser } from "./src/Redux/slices/userSlice";
import { fetchAssessments } from "./src/Redux/slices/assessmentsSlice";
import { fetchLessons } from "./src/Redux/slices/lessonSlice";

configureFirebaseEmulators();

const MainApp = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

function App() {
  const { user, isLoading } = useAuth();

  const dispatch = useAppDispatch();
  const groups = useAppSelector(selectGroups);

  const fetchTutor = async () => {
    try {
      await dispatch(fetchProgramData(user.programs));
      await dispatch(fetchGroups(user.programs)).unwrap();

      if (groups.length > 0) {
        console.log("fetchin lessons")
        await dispatch(fetchAssessments(groups));
      }
    } catch (error) {}
  };

  const fetchStudent = async () => {
    try {
      await dispatch(fetchProgramData(user.programs));
      
      const groupsResult = await dispatch(fetchGroups(user.programs)).unwrap()
      if (groupsResult.length > 0) {
        await dispatch(fetchLessons(groupsResult.map((group) => group.groupId)));
        await dispatch(fetchAssessments(groupsResult));
      }
    } catch (error) {
      console.error("Error in fetchStudent:", error);
    }
  };
  
  useEffect(() => {
    console.log(user)
    if (user) {
      switch (user.userType) {
        case "Student":
          fetchStudent();
          break;
        case "Tutor":
          fetchTutor();
      }
    }
  }, [user]);

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "black",
        }}
      >
        <Text style={{ color: "white" }}> Agora... </Text>
      </View>
    );
  } else if (!user) {
    return <AuthStack />;
  } else {
    if (user.userType == "Student") return <StudentStack />;

    if (user.userType == "Tutor") return <TutorStack />;
  }
}

export default MainApp;
