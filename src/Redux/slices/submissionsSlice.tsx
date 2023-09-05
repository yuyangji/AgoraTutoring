import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Submission, SubmissionConverter } from "../../Types/Submission";
import { Assessment } from "../../Types/Assessment";
import { fetchSubmissionsDb } from "../../Database/Firebase/AssessmentsApi";
import { SubmissionsDb } from "../../Database/Firebase/Firebase";
import { RootState } from "../store";

export interface SubmissionsState {
  byId: Record<string, Submission>;
  allIds: string[];
  byAssessmentId: Record<string, Submission>;
  loading: boolean;
  error: string | null;
}

const initialState: SubmissionsState = {
  byId: {},
  byAssessmentId: {},
  allIds: [],
  loading: false,
  error: null,
};

const submissionsSlice = createSlice({
  name: "submissions",
  initialState,
  reducers: {
    addSubmissions: (state, action: PayloadAction<Submission[]>) => {
      action.payload.forEach((submission) => {
        state.byId[submission.submissionId] = submission;
        state.allIds.push(submission.submissionId);
        state.byAssessmentId[submission.assessmentId] = submission;
      });
    },
  },
});

export default submissionsSlice.reducer;
export const { addSubmissions } = submissionsSlice.actions;
export const selectSubmissions = (state: RootState) => state.submissions.allIds;
export const selectSubmissionById = (state: RootState) => state.submissions.byId;
export const selectSubmissionUsingAssessmentId = (state: RootState) =>
  state.submissions.byAssessmentId;
