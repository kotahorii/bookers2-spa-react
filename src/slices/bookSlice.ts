import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Book, UpdateBook } from 'types/bookTypes'
import { RootState } from '../app/store'

type stateType = {
  editedBook: UpdateBook
  detailBook: Book
  isOpenBookModal: boolean
}

const initialState: stateType = {
  editedBook: {
    id: 0,
    body: '',
    title: '',
  },
  detailBook: {
    id: 0,
    title: '',
    body: '',
    user_id: 0,
    createdAt: '',
    comments: [],
    favorites: [],
  },
  isOpenBookModal: false,
}

export const bookSlice = createSlice({
  name: 'book',
  initialState,

  reducers: {
    setEditedBook: (state, action: PayloadAction<UpdateBook>) => {
      state.editedBook = action.payload
    },
    resetEditedBook: (state) => {
      state.editedBook = initialState.editedBook
    },
    setDetailBook: (state, action: PayloadAction<Book>) => {
      state.detailBook = action.payload
    },
    resetDetailBook: (state) => {
      state.detailBook = initialState.detailBook
    },
    setIsOpenBookModal: (state, action: PayloadAction<boolean>) => {
      state.isOpenBookModal = action.payload
    },
  },
})

export const {
  setIsOpenBookModal,
  setEditedBook,
  resetEditedBook,
  setDetailBook,
  resetDetailBook,
} = bookSlice.actions
export const selectIsOpenBookModal = (state: RootState) =>
  state.book.isOpenBookModal
export const selectEditedBook = (state: RootState) => state.book.editedBook
export const selectDetailBook = (state: RootState) => state.book.detailBook
export default bookSlice.reducer