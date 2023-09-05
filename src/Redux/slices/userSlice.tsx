import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../Types/Users";
import { Program } from "../../Types/Program";
import { RootState } from "../store";
import { createUser, getUserById } from "../../Database/Firebase/AuthenticationApi";

import auth from "@react-native-firebase/auth";

interface AppState {
  entity: User | null;
  isNew: boolean;
  programs: Program[];
}

let initialState: AppState = {
  entity: null,
  isNew: false,
  programs: [],
};

export const fetchUserById = createAsyncThunk<
  User,
  string,
  { rejectValue: { message: string }; state: RootState }
>("users/fetchUser", async (userId, { rejectWithValue, getState }) => {
  if (getState().user.isNew) return rejectWithValue({ message: "User is new" });

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
  { rejectValue: { message: string }; state: RootState }
>("users/createUserEmail", async (details, { rejectWithValue }) => {
  try {
    const authResult = await auth().createUserWithEmailAndPassword(
      details.email,
      details.password
    );
    const { password, ...restOfDetails } = details;

    const newUser: User = {
      id: authResult.user.uid,
      ...restOfDetails,
    };

    const user = await createUser(newUser);
    return newUser;
  } catch (e) {
    return rejectWithValue({ message: e.toString() });
  }
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.entity = null;
    },
    updateUser: (state, action: PayloadAction<User>) => {
      state.entity = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserById.fulfilled, (state, { payload }) => {
        state.entity = payload;
      })
      .addCase(fetchUserById.rejected, (state, { payload }) => {})

      .addCase(createUserEmailAndPassword.pending, (state, { payload }) => {
        state.isNew = true;
      })
      .addCase(createUserEmailAndPassword.fulfilled, (state, { payload }) => {
        state.entity = payload;
      });
  },
});

export const { logout, updateUser } = userSlice.actions;
export const selectUser = (state: RootState) => state.user.entity;
export const selectUserId = (state: RootState) => state.user.entity?.id;
export const selectProgramIds = (state: RootState) => state.user.entity.programs;
export default userSlice.reducer;
