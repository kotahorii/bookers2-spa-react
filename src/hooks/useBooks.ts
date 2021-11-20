import { useAppDispatch, useAppSelector } from 'app/hooks'
import { useCallback } from 'react'
import {
  selectDetailBook,
  selectIsOpenDetailBookModal,
  setIsOpenDetailBookModal,
} from 'slices/bookSlice'
import { useLikeMutation } from './queries/useLikeMutation'
import { useQueryBooks } from './queries/useQueryBooks'
import { useQueryUser } from './queries/useQueryCurrentUser'
import { useQueryFavorites } from './queries/useQueryFavarites'

export const useBooks = () => {
  const dispatch = useAppDispatch()
  const isOpenDetailBook = useAppSelector(selectIsOpenDetailBookModal)
  const { data: currentUser, isLoading: isLoadingUser } = useQueryUser()
  const { data: books, isLoading: isLoadingBooks } = useQueryBooks()
  const detailBook = useAppSelector(selectDetailBook)
  const { createLikeMutation, deleteLikeMutation } = useLikeMutation()
  const { data: favorites } = useQueryFavorites()

  const closeDetailBook = useCallback(() => {
    dispatch(setIsOpenDetailBookModal(false))
  }, [dispatch])

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
    isLiked,
    toggleLike,
    isOpenDetailBook,
    closeDetailBook,
    isLoadingUser,
    isLoadingBooks,
  }
}
