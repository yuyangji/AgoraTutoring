// useStudentNames.ts
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useAppSelector } from '../Redux/hooks';
import { selectNames, setNames } from '../Redux/slices/namesSlice';
import { UsersDb } from '../Database/Firebase/Firebase';

const useNames = (userIds: string[]) => {
  const userNames = useAppSelector(selectNames); // Adjust the state path accordingly
  const dispatch = useDispatch();

  useEffect(() => {
    // Filter out the student IDs that are not in the Redux store
    const missingIds = userIds.filter(id => !userNames[id]);

    if (missingIds.length > 0) {
      const fetchNames = async () => {
        try {
          const userDocs = await UsersDb.where('id', 'in', missingIds).get();
          const fetchedNames = userDocs.docs.map(doc => ({
            userId: doc.id,
            firstName: doc.data().firstName,
            lastName: doc.data().lastName,
          }));
          dispatch(setNames(fetchedNames));
        } catch (error) {
          console.error("Error fetching students' names:", error);
        }
      };

      fetchNames();
    }
  }, [userIds, userNames, dispatch]);

  // Return the student names from the Redux store
  return userNames;
};

export default useNames;
