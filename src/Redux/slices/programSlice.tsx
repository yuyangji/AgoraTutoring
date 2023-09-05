import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../Types/Users";
import { Program, ProgramConverter } from "../../Types/Program";
import { RootState } from "../store";
import { FirestoreResult } from "../../Database/Firebase/Types";
import functions from "@react-native-firebase/functions";
import {
  getGroupsForStudent,
  getGroupsForTutor,
} from "../../Database/Firebase/AttendanceApi";
import { sendEnrolmentRequest } from "../../Database/Firebase/EnrolmentApi";
import { Group, GroupConverter } from "../../Types/Group";
import {
  GroupDb,
  GroupsByProgramId,
  ProgramsDb,
} from "../../Database/Firebase/Firebase";

interface ProgramState {
  programById: {
    [programId: string]: Program;
  };
  programIds: string[];
  programs: Program[];
  groups: Group[];
  groupIds: string[];
}

let initialState: ProgramState = {
  programById: {},
  programIds: [],
  programs: [],
  groups: [],
  groupIds: [],
};

//For students only
export const enrolInProgram = createAsyncThunk<
  string,
  string,
  { rejectValue: { message: string }; state: RootState }
>(
  "program/enrol",
  async (programId, { rejectWithValue, getState, dispatch }) => {
    const user = getState().user.entity;
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
  { rejectValue: { message: string }; state: RootState }
>("programs", async (programIds, { rejectWithValue, getState }) => {
  try {
    const docs = await Promise.all(
      programIds.map((id) => ProgramsDb.doc(id).get())
    );
    console.log("fetched programs")
    return docs.map((doc) => ProgramConverter.fromFirestore(doc));
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
>("groups", async (groupIds, { rejectWithValue, getState }) => {
  try {
    const docs = await Promise.all(groupIds.map((id) => GroupDb(id).get()));
    console.log("fetched groups")
    return docs.map((doc) => GroupConverter.fromFirestore(doc));
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
      state.programById[program.programId] = program;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGroups.fulfilled, (state, { payload }) => {
        state.groups = payload;
        state.groupIds = payload.map((g) => g.groupId);
      })
      .addCase(fetchProgramData.fulfilled, (state, { payload }) => {
        payload.map((p) => {
          state.programById[p.programId] = p;
        });
        state.programIds = payload.map((p) => p.programId);
        state.programs = payload;
      });
  },
});

export const selectGroups = (state: RootState) => state.programs.groups;
export const selectGroupIds = (state: RootState) => state.programs.groupIds;
export const selectGroupName = (groupId:string) => (state: RootState) => state.programs.groups.find(g => g.groupId == groupId)?.name ?? "Undefined group";

export const selectProgramIds = (state: RootState) => state.programs.programIds;
export const selectPrograms = (state: RootState) =>
  state.programs.programs;
export const selectProgramById = (state: RootState) => state.programs.programById;

export const { setProgram } = programSlice.actions;

export default programSlice.reducer;
