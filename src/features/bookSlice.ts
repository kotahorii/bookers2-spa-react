import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UpdateUserData } from 'types/userTypes'
import { RootState } from '../app/store'

type stateType = {
  editedUser: UpdateUserData
}

const initialState: stateType = {
  editedUser: {
    id: 0,
    name: '',
    introduction: '',
    image: '',
  },
}

export const bookSlice = createSlice({
  name: 'book',
  initialState,

  reducers: {
    setEditedUser: (state, action: PayloadAction<UpdateUserData>) => {
      state.editedUser = action.payload
    },
  },
})

export const { setEditedUser } = bookSlice.actions
export const editedUser = (state: RootState) => state.auth.editedUser
export default bookSlice.reducer
