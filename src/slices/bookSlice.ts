import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Book, UpdateBook } from 'types/bookTypes'
import { RootState } from '../app/store'

type stateType = {
  editedBook: UpdateBook
  detailBook: Book
  isOpenDetailBookModal: boolean
  isOpenBookModal: boolean
  isOpenDeleteBookModal: boolean
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
    userId: 0,
    createdAt: '',
  },
  isOpenDetailBookModal: false,
  isOpenBookModal: false,
  isOpenDeleteBookModal: false,
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
    setIsOpenDetailBookModal: (state, action: PayloadAction<boolean>) => {
      state.isOpenDetailBookModal = action.payload
    },
    setIsOpenBookModal: (state, action: PayloadAction<boolean>) => {
      state.isOpenBookModal = action.payload
    },
    setIsOpenDeleteBookModal: (state, action) => {
      state.isOpenDeleteBookModal = action.payload
    },
  },
})

export const {
  setIsOpenDetailBookModal,
  setIsOpenDeleteBookModal,
  setIsOpenBookModal,
  setEditedBook,
  resetEditedBook,
  setDetailBook,
  resetDetailBook,
} = bookSlice.actions
export const selectIsOpenDetailBookModal = (state: RootState) =>
  state.book.isOpenDetailBookModal
export const selectIsOpenBookModal = (state: RootState) =>
  state.book.isOpenBookModal
export const selectEditedBook = (state: RootState) => state.book.editedBook
export const selectDetailBook = (state: RootState) => state.book.detailBook
export const selectIsOpenDeleteBook = (state: RootState) =>
  state.book.isOpenDeleteBookModal
export default bookSlice.reducer
