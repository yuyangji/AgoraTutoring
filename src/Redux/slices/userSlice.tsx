import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../Types/Users";
import { Program } from "../../Types/Program";
import { RootState } from "../store";
import {
  createUser,
  createUserAuth,
  getUserById,
} from "../../Firebase/AuthenticationApi";
import { FirestoreResult } from "../../Firebase/Types";

interface AppState {
  user: User | null;
  isNew: boolean;
  programs: Program[];
}

let initialState: AppState = {
  user: null,
  isNew: false,
  programs: [],
};

export const fetchUserById = createAsyncThunk<
  User,
  string,
  { rejectValue: {message: string}; state: RootState }
>("users/fetchByIdStatus", async (userId, { rejectWithValue, getState }) => {
  if (getState().user.isNew) return;
  try {
    const response = await getUserById(userId);
    return response;
  } catch (e) {
    return rejectWithValue({ message: e.toString() });
  }
});

export const createUserEmailAndPassword = createAsyncThunk<
  User,
  { password: string } & Omit<User, "id">,
  { rejectValue: Error }
>("users/createUserEmail", async (details, { rejectWithValue }) => {
  const authResult = await createUserAuth(details.email, details.password);
  if (authResult.success == false) return rejectWithValue(authResult.error);

  const { password, ...restOfDetails } = details;

  const newUser: User = {
    id: authResult.data.user.uid,
    ...restOfDetails,
  };
  const createUserResult = await createUser(newUser);
  if (createUserResult.success) return newUser;
  //Unncessarily check for false because typescript complains for some reason
  if (createUserResult.success == false) {
    //TODO: REMOVE USER
    return rejectWithValue(createUserResult.error);
  }
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
    },
    updateUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserById.fulfilled, (state, { payload }) => {
        state.user = payload;
      })

      .addCase(createUserEmailAndPassword.pending, (state, { payload }) => {
        state.isNew = true;
      })
      .addCase(createUserEmailAndPassword.fulfilled, (state, { payload }) => {
        state.user = payload;
      });
  },
});

export const { logout, updateUser } = userSlice.actions;
export const selectUser = (state: RootState) => state.user.user;
export const selectProgramIds = (state: RootState) => state.user.user.programs;
export default userSlice.reducer;
