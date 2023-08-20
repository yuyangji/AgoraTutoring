import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../Types/Users";
import { Program, ProgramConverter } from "../../Types/Program";
import { RootState } from "../store";
import { FirestoreResult } from "../../Firebase/Types";
import functions from "@react-native-firebase/functions";
import {
  getGroupsForStudent,
  getGroupsForTutor,
} from "../../Firebase/AttendanceApi";
import {
  getProgramData,
  sendEnrolmentRequest,
} from "../../Firebase/EnrolmentApi";
import { Group } from "../../Types/Group";

interface ProgramState {
  byId: {
    [programId: string]: Program;
  };
  allIds: string[],
  groups: Group[];
}

let initialState: ProgramState = {
  byId: {},
  allIds: [],
  groups: [],
};

//For students only
export const enrolInProgram = createAsyncThunk<
  string,
  string,
  { rejectValue: {message: string}; state: RootState }
>(
  "program/enrol",
  async (programId, { rejectWithValue, getState, dispatch }) => {
    const user = getState().user.user;
    try {
      const enrolResult = await sendEnrolmentRequest(programId, user);
      return enrolResult;
    } catch (e) {
      return rejectWithValue({ message: e.toString() });
    }
  }
);

export const fetchProgramData = createAsyncThunk<
  Program[],
  string[],
  { rejectValue: {message: string}; state: RootState }
>("programs", async (programIds, { rejectWithValue, getState }) => {
  try {
    const result = await getProgramData(programIds);
    console.log("found programs: " + result.toString());
    return result;
  } catch (e) {
    return rejectWithValue({ message: e.toString() });
  }
});

//Fetch groups for a student.
export const fetchGroups = createAsyncThunk<
  Group[],
  string[],
  {
    rejectValue: Error;
    state: RootState;
  }
>("groups", async (programs, { rejectWithValue, getState }) => {
  const user = getState().user.user;
  try {
    let groups: Group[];
    if (user.userType == "Tutor")
      groups = await getGroupsForTutor(user.id, programs);
    else if (user.userType == "Student")
      groups = await getGroupsForStudent(user.id, programs);
    
    console.log("found groups", groups)
    return groups;
  } catch (e) {
    return rejectWithValue(e);
  }
});


export const programSlice = createSlice({
  name: "programs",
  initialState,
  reducers: {
    addProgram: (state, action: PayloadAction<Program>) => {
      //state.programs.push(action.payload);
    },
    setProgram: (state, action: PayloadAction<Program>) => {
      const program = action.payload;
      state.byId[program.programId] = program;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGroups.fulfilled, (state, { payload }) => {
        state.groups = payload;
      })
      .addCase(fetchProgramData.fulfilled, (state, { payload }) => {
        payload.map((p) => {
          state.byId[p.programId] = p;
        });
        state.allIds = payload.map((p) => p.programId);
      });
  },
});

export const selectGroups = (state: RootState) => state.programs.groups;
export const selectPrograms = (state: RootState) => state.programs.allIds;
export const selectProgramById = (state:RootState) => state.programs.byId;

export const { setProgram } = programSlice.actions;

export default programSlice.reducer;
