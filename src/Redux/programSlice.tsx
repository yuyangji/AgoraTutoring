import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { User } from "../Types/Users";
import { Program } from "../Types/Program";
import { RootState } from "./store";
import { FirestoreResult } from "../Firebase/Types";
import functions from "@react-native-firebase/functions";
import { getGroupsForStudent } from "../Firebase/AttendanceApi";
import { getEnrolledPrograms, getProgramData, sendEnrolmentRequest } from "../Firebase/EnrolmentApi";
import { Group } from "../Types/Group";


interface EnrolmentState {
  programs : {
    [programId: string ]: Program
  },
  groups: Group[];
  pendingPrograms: string[];
}

let initialState: EnrolmentState = {
  programs: {},
  pendingPrograms: [],
  groups: [],
};

//For tutors only. calls a cloud function.
export const enrolInProgram = createAsyncThunk<
  string,
  string,
  {
    rejectValue: Error;
    state: RootState;
  }
>(
  "program/enrol",
  async (programId, { rejectWithValue, getState, dispatch }) => {
    // if (getState().programs.enrolledPrograms.includes(programId))
    //   return true
    const user = getState().user.user;
    const enrolResult = await sendEnrolmentRequest(programId, user);
    if (enrolResult.success) return programId;
    if (enrolResult.success == false) return rejectWithValue(enrolResult.error);
  }
);

export const updatePrograms = createAsyncThunk<
  Program[],
  string[],
  {
    rejectValue: Error;
    state: RootState;
  }
>("programs", async (programs, { rejectWithValue, getState }) => {

  const result = await getProgramData( programs);
  if (result.success)
    return result.courses;
  if (result.success == false)
    return rejectWithValue(new Error(result.error.toString()));
});

export const updateGroups = createAsyncThunk<
  Group[],
  string[],
  {
    rejectValue: Error;
    state: RootState;
  }
>("groups", async (programs, { rejectWithValue, getState }) => {
  const user = getState().user.user;
  const groupsResult = await getGroupsForStudent(user.id, programs);
  if (groupsResult.success) return groupsResult.data;
  if (groupsResult.success == false)
    return rejectWithValue(new Error(groupsResult.error.toString()));
});

export const programSlice = createSlice({
  name: "programs",
  initialState,
  reducers: {
    addProgram: (state, action: PayloadAction<Program>) => {
      //state.programs.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(enrolInProgram.fulfilled, (state, { payload }) => {
        state.pendingPrograms.push(payload);
      })
      .addCase(updateGroups.fulfilled, (state, { payload }) => {
        state.groups = payload;
      })
      .addCase(updatePrograms.fulfilled, (state, { payload }) => {
        payload.map(p => {
         state.programs[p.programId] = p
       })
    });
  },
});

export const selectGroups = (state: RootState) => state.programs.groups;

export default programSlice.reducer;
