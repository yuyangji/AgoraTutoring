import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  Keyboard,
  Alert,
} from "react-native";
import { CTAButton } from "../../Components/CTAButton/CTAButton";

import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import RoundTextField from "../../Components/RoundTextField";
import { MaterialIcons } from '@expo/vector-icons';
import { loginUser } from "../../Firebase/AuthenticationApi";

const lockIcon = <MaterialIcons name="lock-outline" size={24} color="black" />
const emailIcon = <MaterialIcons name="mail-outline" size={24} color="black" />

export const Login = () => {
  const [email, setEmail] = useState<string | undefined>();
  const [password, setPassword] = useState<string | undefined>();

  const nav = useNavigation<NativeStackNavigationProp<any>>();

  const goToRegistration = () => {
    nav.push("Register");
  };

  const onPressLogin = async () => {
    // Disable buttons
    console.log("logging in")
    const response = await loginUser(email!, password!);
    console.log(response)
    //log in, nav stack automatically changes higher in the tree.
  };

  const goToResetPassword = () => {

  }

  return (
    <Pressable style={styles.screen} onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.screen}>
        <Image source={require('../../Images/Logo.png')} style={styles.logo} />

        <View style = {{alignItems:'center'}}>
          <View style={styles.textFields}>
          <Text style={styles.loginOrCreate}>Login or create a new account</Text>
            <RoundTextField
              icon={emailIcon}
              placeholder="Email"
              onChangeText={setEmail}
              inputMode='email' />
            <RoundTextField
              isPassword={true}
              icon={lockIcon}
              placeholder="Password"
              onChangeText={setPassword}
              inputMode='text' />
          </View>

          <Pressable onPress={goToResetPassword} style={{ alignSelf: 'flex-end', marginRight: 10, marginVertical:10 }}>
            <Text style={{ color: '#0E81F5' }}>Forgot Password?</Text>
          </Pressable>
          <View style={{marginBottom: 20}}></View>
          <CTAButton title="Login" onPress={onPressLogin} variant="primary" />

          <View style={{ flexDirection: 'row', gap: 5, marginTop: 30 }}>
            <Text style={{ fontWeight: '300', fontSize: 15 }} >Don't have an account?</Text>
            <Pressable onPress={goToRegistration}><Text style={{ color: '#0E81F5', fontWeight: '400',fontSize: 15  }}>Sign up</Text></Pressable>
          </View>
    
        </View>


      </SafeAreaView>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: 15,
    backgroundColor: "white",
    paddingTop: 20,
    alignItems: 'center'
  },
  logo: {
    width: 300,
    height: 300
  },
  titleContainer: {
    alignSelf: 'center',
    justifyContent: "center",
  },
  loginOrCreate: {
    color: "#707070"
  },
  titleText: {
    fontSize: 45,
    textAlign: "center",
    fontWeight: "200",
  },
  loginTextField: {
    borderBottomWidth: 1,
    height: 60,
    fontSize: 30,
    marginVertical: 10,
    fontWeight: "300",
  },
  textFields: {
    gap: 20,
    alignItems: 'center'
  },
});