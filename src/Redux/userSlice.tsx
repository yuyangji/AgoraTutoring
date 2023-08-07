import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { User } from '../Types/Types'
import { RootState } from './store'

interface UserState {
    user: User | null
}


let initialState: UserState = {
    user: null
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action:PayloadAction<User>) => {
            state.user = action.payload
        },
        logout: (state) => {
            state.user = null
        }

    }

})


export const { login, logout } = userSlice.actions;
export const selectUser = (state:RootState) => state.user

export default userSlice.reducer