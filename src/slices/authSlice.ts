import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SignUpData, UpdateUserData, User } from 'types/userTypes'
import { RootState } from '../app/store'

type stateType = {
  authData: SignUpData
  editedUser: UpdateUserData
  detailUser: User
}

const initialState: stateType = {
  authData: {
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    introduction: '',
    image: '',
  },
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
    setAuthData: (state, action: PayloadAction<SignUpData>) => {
      state.authData = action.payload
    },
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
  setAuthData,
  setEditedUser,
  setDetailUser,
  resetEditedUser,
  resetDetailUser,
} = authSlice.actions

export const selectAuthData = (state: RootState) => state.auth.authData
export const selectEditedUser = (state: RootState) => state.auth.editedUser
export const selectDetailUser = (state: RootState) => state.auth.detailUser
export default authSlice.reducer
