import { useAppDispatch, useAppSelector } from 'app/hooks'
import { FormEvent, useCallback } from 'react'
import {
  selectDetailBook,
  selectEditedBook,
  selectIsOpenDetailBookModal,
  setIsOpenDetailBookModal,
} from 'slices/bookSlice'
import { useLikeMutation } from './queries/useLikeMutation'
import { useMutateBooks } from './queries/useMutateBooks'
import { useQueryBooks } from './queries/useQueryBooks'
import { useQueryUser } from './queries/useQueryCurrentUser'
import { useQueryFavorites } from './queries/useQueryFavarites'

export const useBooks = () => {
  const dispatch = useAppDispatch()
  const isOpenDetailBook = useAppSelector(selectIsOpenDetailBookModal)
  const { data: currentUser } = useQueryUser()
  const { data: books } = useQueryBooks()
  const editedBook = useAppSelector(selectEditedBook)
  const detailBook = useAppSelector(selectDetailBook)
  const { createBookMutation, updateBookMutation } = useMutateBooks()
  const { createLikeMutation, deleteLikeMutation } = useLikeMutation()
  const { data: favorites } = useQueryFavorites()

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

  const booksFavorites = useCallback(
    () => favorites?.filter((fav) => fav.bookId === detailBook.id),
    [detailBook, favorites]
  )

  const isLiked = useCallback(() => {
    if (booksFavorites) {
      return (
        booksFavorites()!.filter((fav) => fav.userId === currentUser?.id)
          .length > 0
      )
    }
  }, [booksFavorites, currentUser])

  const toggleLike = useCallback(() => {
    if (isLiked()) {
      const fav = booksFavorites()!.filter(
        (fav) => fav.userId === currentUser?.id
      )[0]
      deleteLikeMutation.mutate({ id: fav.id, bookId: detailBook.id })
    } else {
      createLikeMutation.mutate({ bookId: detailBook.id })
    }
  }, [
    isLiked,
    currentUser,
    createLikeMutation,
    deleteLikeMutation,
    booksFavorites,
    detailBook,
  ])

  return {
    booksFavorites,
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
