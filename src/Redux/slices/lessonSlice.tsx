import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Lesson } from "../../Types/Lesson";
import { getLessonsForStudent } from "../../Firebase/AttendanceApi";
import { RootState } from "../store";

type LessonsState = {
  lessons: Lesson[];
  loading: boolean;
  error: Error | null;
};

const initialState: LessonsState = {
  lessons: [],
  loading: false,
  error: null,
};

const fetchLessons = createAsyncThunk<
  Lesson[],
  string[],
  {
    rejectValue: Error;
  }
  >("lessons/fetch", async (studentGroups, thunkAPI) => {
    try {
      const lessons = await getLessonsForStudent(studentGroups);
      console.log("found lessons ", lessons)
      return lessons;
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const lessonsSlice = createSlice({
  name: "lessons",
  initialState,
  reducers: {
    // You can define additional reducers here if needed
  },
  extraReducers: (builder) => {
    builder.addCase(fetchLessons.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchLessons.fulfilled, (state, action) => {
      state.loading = false;
      state.lessons = action.payload;
    });
    builder.addCase(fetchLessons.rejected, (state, action) => {
      state.loading = false;
      if (action.payload) {
        state.error = action.payload;
      } else {
        state.error = new Error("An unknown error occurred");
      }
    });
  },
});

// Export the async thunk to use it in your component
export { fetchLessons };

export const selectLessons = (state:RootState) => state.lessons.lessons
// Export the reducer to use it in your store
export default lessonsSlice.reducer;
