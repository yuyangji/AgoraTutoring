import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { EnrolmentRequest, User } from '../Types/Users';
import useAuth from '../hooks/useAuth';
import { useAppSelector } from '../Redux/hooks';
import { selectUser } from '../Redux/userSlice';
import { FirestoreResult } from './Types';
