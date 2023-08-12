import { configureFirebaseEmulators } from "./src/Firebase/FirebaseEmulators";


import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { View, Text } from 'react-native'
import AuthStack from "./src/Navigation/AuthNavigator";
import StudentStack from "./src/Navigation/Student/StudentNavigator";
import useAuth from "./src/hooks/useAuth";
import { Provider } from "react-redux";
import { store } from "./src/Redux/store";
import { useEffect } from "react";
import TutorStack from "./src/Navigation/Tutor/TutorNavigator";
import { useAppDispatch } from "./src/Redux/hooks";
import { updateGroups, updatePrograms } from "./src/Redux/programSlice";


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

  const dispatch = useAppDispatch()

   const GetCoreData = () => {
     if (user) {
       console.log("getting groups")
       dispatch(updatePrograms(user.programs))
         .then(() => {
          dispatch(updateGroups(user.programs))
       })
     
    }
   
  }
  
  const SetUpDataListeners = () => {
  
  }
  useEffect(() => {
    GetCoreData()

  }, [user])
   
   
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