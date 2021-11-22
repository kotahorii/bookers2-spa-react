import { useAppDispatch, useAppSelector } from 'app/hooks'
import { ChangeEvent, FormEvent, useCallback } from 'react'
import {
  resetEditedBook,
  selectDetailBook,
  selectEditedBook,
  selectIsOpenDetailBookModal,
  setDetailBook,
  setEditedBook,
  setIsOpenDetailBookModal,
} from 'slices/bookSlice'
import { Book } from 'types/bookTypes'
import { useMutateBooks } from './queries/useMutateBooks'
import { useQueryBooks } from './queries/useQueryBooks'
import { useQueryUser } from './queries/useQueryCurrentUser'
import { useHeader } from './useHeader'

export const useBooks = () => {
  const dispatch = useAppDispatch()
  const isOpenDetailBook = useAppSelector(selectIsOpenDetailBookModal)
  const { data: currentUser, isLoading: isLoadingUser } = useQueryUser()
  const { data: books, isLoading: isLoadingBooks } = useQueryBooks()
  const detailBook = useAppSelector(selectDetailBook)
  const { createBookMutation, updateBookMutation } = useMutateBooks()
  const { closeCreateBookModal } = useHeader()
  const editedBook = useAppSelector(selectEditedBook)

  const closeDetailBook = useCallback(
    () => dispatch(setIsOpenDetailBookModal(false)),
    [dispatch]
  )

  const changeBook = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const name = e.target.name
      const value = e.target.value

      dispatch(setEditedBook({ ...editedBook, [name]: value }))
    },
    [dispatch, editedBook]
  )

  const openDetailBook = useCallback(
    (book: Book) => () => {
      dispatch(setDetailBook(book))
      dispatch(setIsOpenDetailBookModal(true))
    },
    [dispatch]
  )

  const submitBook = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      if (editedBook.id === 0) {
        createBookMutation.mutate(editedBook)
      } else {
        updateBookMutation.mutate(editedBook)
      }
      closeCreateBookModal()
      dispatch(resetEditedBook())
    },
    [
      createBookMutation,
      updateBookMutation,
      editedBook,
      dispatch,
      closeCreateBookModal,
    ]
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
    changeBook,
    submitBook,
    editedBook,
  }
}
