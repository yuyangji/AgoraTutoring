import { configureFirebaseEmulators } from "./src/Database/Firebase/FirebaseEmulators";
import { View, Text } from "react-native";
import AuthStack from "./src/Navigation/AuthNavigator";
import StudentStack from "./src/Navigation/Student/StudentNavigator";
import useAuth from "./src/hooks/useAuth";
import { Provider } from "react-redux";
import { store } from "./src/Redux/store";
import { useEffect } from "react";
import TutorStack from "./src/Navigation/Tutor/TutorNavigator";
import { useAppDispatch, useAppSelector } from "./src/Redux/hooks";
import { selectGroups } from "./src/Redux/slices/programSlice";

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
