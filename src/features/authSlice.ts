import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UpdateUserData, User } from 'types/userTypes'
import { RootState } from '../app/store'

type stateType = {
  editedUser: UpdateUserData
  detailUser: User
}

const initialState: stateType = {
  editedUser: {
    id: 0,
    name: '',
    introduction: '',
    image: '',
  },
  detailUser: {
    id: 0,
    uid: '',
    email: '',
    name: '',
    image: {
      url: '',
    },
    introduction: '',
  },
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,

  reducers: {
    setEditedUser: (state, action: PayloadAction<UpdateUserData>) => {
      state.editedUser = action.payload
    },
    resetEditedUser: (state) => {
      state.editedUser = initialState.editedUser
    },
    setDetailUser: (state, action: PayloadAction<User>) => {
      state.detailUser = action.payload
    },
    resetDetailUser: (state) => {
      state.detailUser = initialState.detailUser
    },
  },
})

export const {
  setEditedUser,
  setDetailUser,
  resetEditedUser,
  resetDetailUser,
} = authSlice.actions

export const editedUser = (state: RootState) => state.auth.editedUser
export const detailUser = (state: RootState) => state.auth.detailUser
export default authSlice.reducer
