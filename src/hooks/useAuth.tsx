import { useState, useEffect } from 'react';
import auth from '@react-native-firebase/auth';
import { User } from '../Types/Types';


import { useSelector } from 'react-redux';
import { login, logout, selectUser } from '../Redux/userSlice';
import { useAppDispatch, useAppSelector } from '../Redux/hooks';
import { getUserById } from '../Firebase/Firebase';

export default function useAuth(): { user: User | null; isLoading: boolean } {

  const userState = useAppSelector(selectUser)
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  async function onAuthStateChanged(user) {
    if (user) {
      console.log(user.uid)
      const { data, error } = await getUserById(user.uid);

      if (error) {
        console.log('Error getting user:', error);
        
        // handle the error
      } else {
        dispatch(login(data));
      }
    } else {
      dispatch(logout())
    } 
    
    setIsLoading(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  } , []);

  return { user: userState.user, isLoading };
}