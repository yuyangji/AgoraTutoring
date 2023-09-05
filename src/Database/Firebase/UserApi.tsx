
import firestore from '@react-native-firebase/firestore';
import { User } from '../../Types/Users';
import { Program } from "../../Types/Program";
import { FirestoreResult } from './Types';
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';



export const getUsersNames = async (userIds: string[]) => {
    try {
      // Retrieve the user documents for the given tutor IDs
      const userDocs = await Promise.all(userIds.map(id => firestore().collection('Users').doc(id).get()));
  
      // Extract the first and last names from the user documents
      const names = userDocs.map(doc => {
        const user = doc.data() as User;
        return `${user.firstName} ${user.lastName}`;
      });
  
      return names
    } catch (error) {
      console.error('Error retrieving names:', error);
      throw error
    }
  };
  