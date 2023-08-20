import { TypedUseSelectorHook } from "react-redux";
import { AppDispatch, RootState } from "./store";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./hooks";
import { selectUser } from "./slices/userSlice";
import {
  fetchGroups,
  fetchProgramData,
  selectGroups,
  setProgram,
} from "./slices/programSlice";
import { GroupsRef, ProgramsCol } from "../Firebase/Firebase";
import { ProgramConverter } from "../Types/Program";
import { fetchAssessments } from "./slices/assessmentsSlice";


export const FetchInitialTutorData = async({dispatch, selector} : {dispatch :AppDispatch, selector : TypedUseSelectorHook<RootState>}) => {
  const user = selector(selectUser);
  const groups = selector(selectGroups);
  try {
    await dispatch(fetchProgramData(user.programs));
    await dispatch(fetchGroups(user.programs));

    if (groups.length > 0) await dispatch(fetchAssessments(groups));
  } catch (error) {}
}

const useTutor = () => {
  //User has a field "programs" that is kept in sync with enrolment data.
  const user = useAppSelector(selectUser);
  const groups = useAppSelector(selectGroups);
  const dispatch = useAppDispatch();

  const fetchUserData = async () => {
    try {
      await dispatch(fetchProgramData(user.programs));
      await dispatch(fetchGroups(user.programs));

      if (groups.length > 0) await dispatch(fetchAssessments(groups));
    } catch (error) {}
  };

  useEffect(() => {
    if (user && user.programs.length > 0) {
      const promise = fetchUserData();

      //setup listeners for program changes
      // const programUnsubscribe = user.programs.map((programId) =>
      //   ProgramsCol.doc(programId).onSnapshot((doc) => {
      //     const program = ProgramConverter.fromFirestore(doc);
      //     dispatch(setProgram(program));
      //   })
      // );

      // Set up listeners for group changes
      //   const groupUnsubscribes = user.programs.map((programId) =>
      //   GroupsRef(programId)
      //     .where("students", "array-contains", user.id)
      //     .onSnapshot((querySnapshot) => {
      //       const groups = querySnapshot.docs.map((doc) => doc.data());
      //       dispatch(updateGroups(groups));
      //     })
      // );
    }
  }, [user, dispatch]);
};

export default useTutor;
