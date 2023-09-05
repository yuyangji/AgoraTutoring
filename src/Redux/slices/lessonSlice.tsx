import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Lesson, LessonConverter } from "../../Types/Lesson";
import { getLessonsForGroup } from "../../Database/Firebase/AttendanceApi";
import { RootState } from "../store";
import { LessonsDb } from "../../Database/Firebase/Firebase";
import firestore from '@react-native-firebase/firestore'
type LessonsState = {
  lessons: Lesson[];
  loading: boolean;
  error: Error | null;
  fetchedDates: { [date: string]: Lesson[] };
};

const initialState: LessonsState = {
  lessons: [],
  fetchedDates: {},
  loading: false,
  error: null,
};

const fetchLessons = createAsyncThunk<
  Lesson[],
  {
    groupIds: string[];
    startDate: Date;
    endDate?: Date;
  },
  {
    rejectValue: Error;
    state: RootState;
  }
>("lessons/fetch", async ({ groupIds, startDate, endDate }, thunkAPI) => {
  try {

    const start = firestore.Timestamp.fromDate(startDate);
    const end = firestore.Timestamp.fromDate(endDate);

    const promises = groupIds.map(async (groupId) => {

      try {
        const lessonsRef = LessonsDb(groupId)
        .where("end", ">=", start)
        .where("end", "<=", end);
      const lessonsSnapshot = await lessonsRef.get();
      const result = lessonsSnapshot.docs.map((doc) =>
        LessonConverter.fromFirestore(doc, groupId)
      );
      return result;
      }catch(e){
        console.error(e)
        return []
      }

    });

    // Execute all promises in parallel
    const lessonsArrays = await Promise.all(promises);

    // Flatten the arrays of lessons into a single array
    const allLessons = lessonsArrays.flat();
    console.log("found lessons ", allLessons);
    return allLessons;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.message);
  }
});

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
      state.lessons.map((lesson) => {
        //add lesson to fetchedDates
        const dateStr = new Date(lesson.start).toISOString();
        state.fetchedDates[dateStr] = state.fetchedDates[dateStr] || [];
        state.fetchedDates[dateStr].push(lesson);
        
      })

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

export const selectLessons = (state: RootState) => state.lessons.lessons;
export const selectLessonsByDate = (state: RootState) => state.lessons.fetchedDates;
// Export the reducer to use it in your store
export default lessonsSlice.reducer;
