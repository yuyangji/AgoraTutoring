import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import {firebase} from '@react-native-firebase/functions';
import functions from '@react-native-firebase/functions'

export const configureFirebaseEmulators = () => {
  console.log("starting");

  if (__DEV__) {
    console.log("in dev mode");
    firestore().useEmulator('localhost', 8080)
    functions().useEmulator('localhost', 5001)
    // Connect Authentication emulator
    auth().useEmulator("http://localhost:9099");
  }
};

// // Your secondary Firebase project credentials...
// const credentials = {
//   clientId: '',
//   appId: '',
//   apiKey: '',
//   databaseURL: '',
//   storageBucket: '',
//   messagingSenderId: '',
//   projectId: '',
// };

// const config = {
//   name: 'SECONDARY_APP',
// };

// async function initialize() {
//     const result = await firebase.initializeApp(credentials, config);
// }

// initialize();
