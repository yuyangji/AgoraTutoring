import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Program, User } from "../Types/ModelTypes";
import { RootState } from "./store";
import { FirestoreResult } from "../Firebase/Types";
import {sendEnrolmentRequest} from '../Firebase/FirebaseStudent'
interface ProgramState {
  enrolledPrograms: Program[];
  pendingPrograms: string[];
}

let initialState: ProgramState = {
  enrolledPrograms: [],
  pendingPrograms: [],
};

//For tutors only. calls a cloud function.
export const enrolInProgram = createAsyncThunk<
    string,
    string,
    {
        rejectValue: Error;
        state: RootState
  }>('program/enrol', async (programId, { rejectWithValue, getState,dispatch }) => {
   
    // if (getState().programs.enrolledPrograms.includes(programId))
    //   return true
    const user = getState().user.user
    const enrolResult = await sendEnrolmentRequest(programId, user)
    if(enrolResult.success)
        return programId
    if(enrolResult.success == false)
      return rejectWithValue(enrolResult.error)
})


export const programSlice = createSlice({
  name: "programs",
  initialState,
  reducers: {
    addProgram: (state, action: PayloadAction<Program>) => {
      //state.programs.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(enrolInProgram.fulfilled, (state, { payload }) => {
      state.pendingPrograms.push(payload)
    })

  },
});

export default programSlice.reducer;
