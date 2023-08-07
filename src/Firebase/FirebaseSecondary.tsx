import firebase from '@react-native-firebase/app';

// Your secondary Firebase project credentials...
const credentials = {
  clientId: '',
  appId: '',
  apiKey: '',
  databaseURL: '',
  storageBucket: '',
  messagingSenderId: '',
  projectId: '',
};

const config = {
  name: 'SECONDARY_APP',
};

async function initialize() {
    const result = await firebase.initializeApp(credentials, config);
}
  

initialize();