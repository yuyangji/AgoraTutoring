import { useState, useEffect } from 'react';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { User } from '../Types/ModelTypes';


import { useSelector } from 'react-redux';
import { fetchUserById,  logout, selectUser } from '../Redux/userSlice';
import { useAppDispatch, useAppSelector } from '../Redux/hooks';
import { getUserById } from '../Firebase/Authentication';
import { getEnrolledPrograms } from '../Firebase/Firebase';


export default function useAuth(): { user: User | null; isLoading: boolean } {

  const user = useAppSelector(selectUser)
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(true);
 
  async function onAuthStateChanged(user : FirebaseAuthTypes.User) {
    if (user) {
      dispatch(fetchUserById(user.uid))
    } else {
      dispatch(logout())
    } 
    
    setIsLoading(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  } , []);

  return { user, isLoading };
}