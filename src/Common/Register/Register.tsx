import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Keyboard,
  Alert,
} from "react-native";
import { CTAButton } from "../../Components/CTAButton/CTAButton";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'
import db from '@react-native-firebase/firestore'
import RoundTextField from "../../Components/RoundTextField";
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { MyTheme } from "../../useGlobalStyles";
import { User } from "../../Types/Types";
import { createUser, createUserWithEmailAndPassword } from "../../Firebase/Firebase";
import { useAppDispatch } from "../../Redux/hooks";
import { login } from "../../Redux/userSlice";


const personIcon = <Ionicons name="person-outline" size={24} color={MyTheme.colors.primary} />
const lockIcon = <MaterialIcons name="lock-outline" size={24}color={MyTheme.colors.primary}  />
const emailIcon = <MaterialIcons name="mail-outline" size={24} color={MyTheme.colors.primary}  />
const backIcon = <Ionicons name="arrow-back" size={35} color={MyTheme.colors.primary} />


export const Register = () => {
  const [firstName, setFirstName] = useState<string | undefined>()
  const [lastName, setLastName] = useState<string | undefined>();
  const [email, setEmail] = useState<string | undefined>();
  const [password, setPassword] = useState<string | undefined>();

  const nav = useNavigation<NativeStackNavigationProp<any>>();

  const dispatch = useAppDispatch();

  const createAccount = async () => {

    const userData: Omit<User, 'id'> = {
      email:email,
      firstName: firstName,
      lastName: lastName,
      userType: 'Student',
      linkedCourseIDs: [],
    };

    if (email && password) {
      //validate email and password

      //Register user
      try {
        const response = await createUserWithEmailAndPassword(email, password, userData)
        if(response.data)
          dispatch(login(response.data))

      } catch (e) {

      }

    }


  };

  const returnToLogin = () => {
    nav.goBack()
  }

  return (
    <Pressable style={styles.contentView} onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.contentView}>
        <Pressable onPress={returnToLogin}>
          {backIcon}
        </Pressable>
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>Sign Up</Text>
            <Text style={styles.welcomeText}>Welcome to Agora!</Text>
          </View>
          <View style={styles.textFields}>
            <RoundTextField
              style={styles.textField}
              placeholder="First name"

              onChangeText={setFirstName}
              icon={personIcon}
            />
            <RoundTextField
              style={styles.textField}
              placeholder="Last name"
              onChangeText={setLastName}
              icon={personIcon}
            />
            <RoundTextField
              style={styles.textField}
              placeholder="Email"
              icon={emailIcon}
              onChangeText={setEmail}
              inputMode="email"
            />
            <RoundTextField
              style={styles.textField}
              placeholder="Password"
              onChangeText={setPassword}
              isPassword={true}
              icon={lockIcon}
            />
            <RoundTextField
              style={styles.textField}
              placeholder="Confirm password"
              icon={lockIcon}

              onChangeText={setPassword}
              isPassword={true}

            />
          </View>
          <View style = {{flex: 1, alignSelf:'center', marginTop: 30}}>
          <CTAButton
            title="Create Account"
            onPress={createAccount}
            variant="primary"
          />
          </View>

        </View>
      </SafeAreaView>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  contentView: {
    flex: 1,
    flexDirection:'column',
    backgroundColor: "white",
    paddingHorizontal: 8,
    paddingTop: 10
  },
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 20,
    paddingHorizontal:20
  },
  titleContainer: {
    justifyContent: "center",
    gap: 10
  },
  titleText: {
    fontSize: 22,
    fontWeight: '500',
    color: MyTheme.colors.primary
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: '300',

  },
  textField: {


  },
  textFields: {
    gap: 20,
    marginTop: 30
  },
});