import { TypedUseSelectorHook } from "react-redux";
import { AppDispatch, RootState } from "./store";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./hooks";
import { selectProgramIds, selectUser } from "./slices/userSlice";
import {
  fetchGroups,
  fetchProgramData,
  selectGroups,
} from "./slices/programSlice";
import { GroupsByProgramId, ProgramsDb } from "../Database/Firebase/Firebase";
import { ProgramConverter } from "../Types/Program";
import { fetchAssessments } from "./slices/assessmentsSlice";
import { fetchLessons } from "./slices/lessonSlice";
import { ca } from "date-fns/locale";


const useTutor = () => {
  //User has a field "programs" that is kept in sync with enrolment data.
  const user = useAppSelector(selectUser);
  const groups = useAppSelector(selectGroups);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (groups.length > 0) {
      try {
   
        dispatch(fetchAssessments(groups));
      } catch (e) {
        console.error(e);
      }
    }
  }, [groups]);

  useEffect(() => {
    if (user) {
      try {
        dispatch(fetchProgramData(user.programs.map(p => p.programId)));
        dispatch(fetchGroups(user.programs.filter(p => p.groupId != null).map(p => p.groupId)));
      } catch (e) {
        console.error(e);
      }
    }
  }, [user]);
};

export default useTutor;
