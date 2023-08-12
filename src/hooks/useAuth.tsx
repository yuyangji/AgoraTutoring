import { useState, useEffect } from 'react';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { User } from '../Types/Users';
import { fetchUserById,  logout, selectUser } from '../Redux/userSlice';
import { useAppDispatch, useAppSelector } from '../Redux/hooks';



export default function useAuth(): { user: User | null; isLoading: boolean } {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const user = useAppSelector(selectUser)
  const dispatch = useAppDispatch();


  async function onAuthStateChanged(user : FirebaseAuthTypes.User) {
    if (user) {
      dispatch(fetchUserById(user.uid))
    } else {
      dispatch(logout())
    } 
    
    setIsLoading(false);
  }

  useEffect(() => {


  }, [])


  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  } , []);

  return { user, isLoading };
}