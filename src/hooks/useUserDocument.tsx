import { useDispatch } from 'react-redux';

import { useEffect } from 'react';
import firestore from '@react-native-firebase/firestore';
import { updateUser } from '../Redux/userSlice';
import { User } from '../Types/Users';

export default function useUserDocument(uid: string) {
  const dispatch = useDispatch();

  useEffect(() => {
    const userRef = firestore().collection('Users').doc(uid);

    // Attach listener for changes
    const unsubscribe = userRef.onSnapshot(doc => {
      if (doc.exists) {
        const userData = doc.data() as User;
        // Dispatch an action to update the Redux state
        dispatch(updateUser(userData));
      }
    });

    // Return a cleanup function to unsubscribe when the component unmounts
    return () => unsubscribe();
  }, [uid, dispatch]);
}
