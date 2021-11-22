import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SignUpData, User } from 'types/userTypes'
import { RootState } from '../app/store'

type stateType = {
  authData: SignUpData & { id: number }
  detailUser: User
  isOpenEditUserModal: boolean
  preview: string
}

const initialState: stateType = {
  authData: {
    id: 0,
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
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
  isOpenEditUserModal: false,
  preview: '',
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,

  reducers: {
    setAuthData: (
      state,
      action: PayloadAction<SignUpData & { id: number }>
    ) => {
      state.authData = action.payload
    },
    setDetailUser: (state, action: PayloadAction<User>) => {
      state.detailUser = action.payload
    },
    resetDetailUser: (state) => {
      state.detailUser = initialState.detailUser
    },
    setIsOpenEditUserModal: (state, action: PayloadAction<boolean>) => {
      state.isOpenEditUserModal = action.payload
    },
    setPreview: (state, action: PayloadAction<string>) => {
      state.preview = action.payload
    },
  },
})

export const {
  setAuthData,
  setDetailUser,
  resetDetailUser,
  setIsOpenEditUserModal,
  setPreview,
} = authSlice.actions

export const selectIsOpenEditUserModal = (state: RootState) =>
  state.auth.isOpenEditUserModal
export const selectAuthData = (state: RootState) => state.auth.authData
export const selectDetailUser = (state: RootState) => state.auth.detailUser
export const selectPreview = (state: RootState) => state.auth.preview
export default authSlice.reducer
