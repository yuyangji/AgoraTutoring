import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Assessment } from "../../Types/Assessment";
import { fetchAssessmentsDb } from "../../Database/Firebase/AssessmentsApi";
import { Group } from "../../Types/Group";
import { RootState } from "../store";

interface AssessmentsSliceState {
  entities: Assessment[],
  ids: string[],
  byId: Record<string, Assessment>,
  error: string | null,
  
}

let initialState: AssessmentsSliceState = {
  byId: {},
  ids: [],
    entities: [],
    error: null
}

export const fetchAssessments = createAsyncThunk<
  Assessment[], // Return type for the fulfilled action
  Group[], // Argument type
  {
    rejectValue: {message:string}; // Type for the rejected value
  }
>(
  'assessments/fetch',
  async (groups: Group[], thunkAPI) => {
    try {
      const assessments = await fetchAssessmentsDb(groups);
      console.log("found assessments: " + assessments.toString());
      return assessments
    } catch (e) {
      return thunkAPI.rejectWithValue({message:e.toString()});
    }
  }
);


export const assessmentsSlice = createSlice({
    name: 'assessments',
    initialState,
    reducers: {
      // Your regular reducers here
    },
    extraReducers: (builder) => {
      builder.addCase(fetchAssessments.fulfilled, (state, action) => {
        // Handle the fulfilled action here
        state.entities = action.payload;
        state.byId = action.payload.reduce((acc, assessment) => { acc[assessment.assessmentId] = assessment; return acc }, {})
        state.ids = action.payload.map(assessment => assessment.assessmentId);
      });
      builder.addCase(fetchAssessments.rejected, (state, action) => {
        // Handle the rejected action here, e.g., storing the error
        state.error = action.payload.message;
      });
    },
  });

export const selectAssessmentIds = (state: RootState) => state.assessments.ids
export const selectAssessments = (state: RootState) => state.assessments.entities
export const assessmentDict = (state: RootState) => state.assessments.byId
export default assessmentsSlice.reducer;