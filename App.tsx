import { configureFirebaseEmulators } from "./src/Firebase/FirebaseEmulators";


import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { View, Text } from 'react-native'
import AuthStack from "./src/Navigation/AuthNavigator";
import StudentStack from "./src/Navigation/StudentNavigator";
import useAuth from "./src/hooks/useAuth";
import { Provider } from "react-redux";
import { store } from "./src/Redux/store";
import TutorStack from "./src/TutorApp/Navigators/TutorNavigator";
import { useEffect } from "react";


const SkipAuth = false;

configureFirebaseEmulators()

const MainApp = () => {
  return (
    <Provider store = {store}>
    <App/>
  </Provider>
  )
}


 function App() {

  const { user, isLoading } = useAuth();


  if (SkipAuth)
  return <StudentStack />

   if (isLoading) {

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor:'black' }}>
        <Text style = {{color:'white'}}> Agora... </Text>
      </View>)
   }
   
  else if (!user) {
    return <AuthStack />;
  }
   else {
     if(user.userType == 'Student')
     
       return <StudentStack />;
     
     if (user.userType == 'Tutor')
       return <TutorStack/>
  }

}

export default MainApp;