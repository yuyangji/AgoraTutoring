// usersSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

import { Group } from "../../Types/Group";
import { ShallowUser } from "../../Types/Users";
import { UsersDb } from "../../Database/Firebase/Firebase";
import { RootState } from "../store";

interface namesRecord {
  [id: string]: ShallowUser;
}
const initialState: namesRecord = {};
// Async thunk to fetch all students managed by a tutor from a list of groups
export const fetchStudentsFromGroups = createAsyncThunk(
  "users/fetchNamesFromGroups",
  async (groups: Group[]) => {
    // Extract student IDs from the provided groups
    const studentIds = groups.flatMap((group) => group.students);

    // Fetch student details
    const uniqueStudentIds = [...new Set(studentIds)]; // Remove duplicates
    const studentSnapshots = await Promise.all(
      uniqueStudentIds.map((id) => UsersDb.doc(id.id).get())
    );

    // Extract and return student details
    return studentSnapshots.map((doc) => ({
      userId: doc.id,
      firstName: doc.data().firstName,
      lastName: doc.data().lastName,
    })) as ShallowUser[];
  }
);

const namesSlice = createSlice({
  name: "names",
  initialState: initialState,
  reducers: {
    setNames: (state, action: PayloadAction<ShallowUser[]>) => {
      for (const user of action.payload) {
        state[user.userId] = user;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchStudentsFromGroups.fulfilled,
      (state, action: PayloadAction<ShallowUser[]>) => {
        action.payload.forEach((user) => {
          state[user.userId] = user;
        });
      }
    );
  },
});

export default namesSlice.reducer;
export const selectNames = (state:RootState) => state.names
export const { setNames } = namesSlice.actions;
