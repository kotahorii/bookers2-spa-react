import { useAppDispatch, useAppSelector } from 'app/hooks'
import { useCallback } from 'react'
import {
  selectDetailBook,
  selectIsOpenDetailBookModal,
  setDetailBook,
  setIsOpenDetailBookModal,
} from 'slices/bookSlice'
import { Book } from 'types/bookTypes'
import { useQueryBooks } from './queries/useQueryBooks'
import { useQueryUser } from './queries/useQueryCurrentUser'

export const useBooks = () => {
  const dispatch = useAppDispatch()
  const isOpenDetailBook = useAppSelector(selectIsOpenDetailBookModal)
  const { data: currentUser, isLoading: isLoadingUser } = useQueryUser()
  const { data: books, isLoading: isLoadingBooks } = useQueryBooks()
  const detailBook = useAppSelector(selectDetailBook)

  const closeDetailBook = useCallback(
    () => dispatch(setIsOpenDetailBookModal(false)),
    [dispatch]
  )

  const openDetailBook = useCallback(
    (book: Book) => () => {
      dispatch(setDetailBook(book))
      dispatch(setIsOpenDetailBookModal(true))
    },
    [dispatch]
  )

  return {
    books,
    detailBook,
    currentUser,
    isOpenDetailBook,
    openDetailBook,
    closeDetailBook,
    isLoadingUser,
    isLoadingBooks,
  }
}
