import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {User} from "@/app/_core/models/User";

const initialState: User = (new User())

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User>) => {
            state= action.payload
        }
    }
})

export const {setUser} = userSlice.actions
export default userSlice.reducer