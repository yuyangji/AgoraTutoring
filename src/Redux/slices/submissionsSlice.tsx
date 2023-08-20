import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Submission, SubmissionConverter } from "../../Types/Submission";
import { Assessment } from "../../Types/Assessment";
import { fetchSubmissionsDb } from "../../Firebase/AssessmentsApi";
import { SubmissionsRef } from "../../Firebase/Firebase";
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

export const fetchSubmissions = createAsyncThunk<
  Record<string, Submission>,
  Assessment[],
  { rejectValue: {message: string}; state: RootState }
>(
  "submissions/fetch",
  async (assessments: Assessment[], { rejectWithValue, getState }) => {
    const allSubmissions: Record<string, Submission> = {};
    const user = getState().user.user;
    try {
      for (const assessment of assessments) {
        const ref = SubmissionsRef(
          assessment.programId,
          assessment.assessmentId
        ).where("studentId", "==", user.id);

        const submissionsSnapshot = await ref.get();
        submissionsSnapshot.forEach((doc) => {
      
          allSubmissions[doc.id] = SubmissionConverter.fromFirestore(doc, assessment.assessmentId);
        });
      }
      return allSubmissions;
    } catch (e) {

      return rejectWithValue({ message: e.toString() });
    }
  }
);
const submissionsSlice = createSlice({
  name: "submissions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSubmissions.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      fetchSubmissions.fulfilled,
      (state, action: PayloadAction<Record<string, Submission>>) => {
        state.byId = action.payload;
        state.allIds = Object.keys(action.payload);
        state.loading = false;
        state.byAssessmentId = Object.values(action.payload).reduce((acc, submission) => { acc[submission.assessmentId] = submission; return acc }, {});
      }
    );
    builder.addCase(fetchSubmissions.rejected, (state, action) => {
      state.loading = false;
      state.error = "An unknown error occurred";
    });
  },
});

export default submissionsSlice.reducer;
export const selectSubmissions = (state: RootState) => state.submissions.allIds;
export const selectSubmissionDict = (state: RootState) => state.submissions.byId;
export const selectSubmissionByAssessmentDict = (state: RootState) => state.submissions.byAssessmentId;