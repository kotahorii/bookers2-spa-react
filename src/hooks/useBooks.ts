import { useAppDispatch, useAppSelector } from 'app/hooks'
import { FormEvent, useCallback } from 'react'
import {
  selectDetailBook,
  selectEditedBook,
  selectIsOpenDetailBookModal,
  setIsOpenDetailBookModal,
} from 'slices/bookSlice'
import { useMutateBooks } from './queries/useMutateBooks'
import { useQueryBooks } from './queries/useQueryBooks'
import { useQueryUser } from './queries/useQueryCurrentUser'

export const useBooks = () => {
  const dispatch = useAppDispatch()
  const isOpenDetailBook = useAppSelector(selectIsOpenDetailBookModal)
  const { data: currentUser } = useQueryUser()
  const { data: books } = useQueryBooks()
  const editedBook = useAppSelector(selectEditedBook)
  const detailBook = useAppSelector(selectDetailBook)
  const { createBookMutation, updateBookMutation } = useMutateBooks()

  const closeDetailBook = useCallback(() => {
    dispatch(setIsOpenDetailBookModal(false))
  }, [dispatch])

  const createOrEditBook = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      if (editedBook.id === 0) {
        createBookMutation.mutate({
          title: editedBook.title,
          body: editedBook.body,
        })
      } else {
        updateBookMutation.mutate({
          id: editedBook.id,
          title: editedBook.title,
          body: editedBook.body,
        })
      }
    },
    [createBookMutation, updateBookMutation, editedBook]
  )

  const isLiked = useCallback(() => {
    return (
      detailBook.favorites.filter((fav) => fav.userId === currentUser?.id)
        .length > 0
    )
  }, [detailBook, currentUser])

  const toggleLike = useCallback(() => {
    if (isLiked()) {
    } else {
    }
  }, [isLiked])

  return {
    books,
    detailBook,
    currentUser,
    createOrEditBook,
    isLiked,
    toggleLike,
    isOpenDetailBook,
    closeDetailBook,
  }
}
