import { useState, useEffect } from 'react';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { User } from '../Types/Users';

import { useAppDispatch, useAppSelector } from '../Redux/hooks';
import { fetchUserById, logout, selectUser } from '../Redux/slices/userSlice';
import { UsersDb } from '../Database/Firebase/Firebase';


//Controls the updating and setting of user data based on auth state.
export default function useAuth(): { user: User | null; isLoading: boolean } {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [authUser, setAuthUser] = useState<FirebaseAuthTypes.User | null>(null);
  const user = useAppSelector(selectUser)
  const dispatch = useAppDispatch();


  async function onAuthStateChanged(authUser: FirebaseAuthTypes.User) {
    setAuthUser(authUser)
    if (authUser) {
      const response = await dispatch(fetchUserById(authUser.uid))
      console.log(response)
    } else {
       dispatch(logout())
    } 
    
    setIsLoading(false);
  }

  // useEffect(() => {
  //   if (user) {
  //     const unsubscribe = UsersRef.doc(user.id).onSnapshot(doc => {
  //       if (doc.exists) {
  //         const newData = doc.data() as User;
  //         if (newData == user) return;
  //         // Dispatch an action to update the Redux state
  //         dispatch(updateUser(newData));
  //       }
  //     });
  
  //     return unsubscribe
  //   }

  // }, [authUser])


  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  } , []);

  return { user, isLoading };
}