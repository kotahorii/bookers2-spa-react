import { useAppDispatch, useAppSelector } from 'app/hooks'
import { useCallback, useState } from 'react'
import {
  selectIsOpenDeleteBook,
  setDetailBook,
  setIsOpenDeleteBookModal,
} from 'slices/bookSlice'
import { Book } from 'types/bookTypes'
import { useMutateBooks } from './queries/useMutateBooks'
import { useQueryFavorites } from './queries/useQueryFavarites'
import { useBooks } from './useBooks'

type ModeType = 'myBooks' | 'likedBooks'

export const useMyPage = () => {
  const { currentUser, books } = useBooks()
  const { data: favorites } = useQueryFavorites()
  const { deleteBookMutation } = useMutateBooks()
  const dispatch = useAppDispatch()
  const isOpenDeleteBookModal = useAppSelector(selectIsOpenDeleteBook)
  const [booksMode, setBooksMode] =
    useState<'myBooks' | 'likedBooks'>('myBooks')

  const changeBooksMode = useCallback(
    (mode: ModeType) => () => setBooksMode(mode),
    []
  )
  const myBook = useCallback(
    () => books?.filter((book) => book.userId === currentUser?.id),
    [currentUser, books]
  )

  const myFavorites = useCallback(
    () =>
      favorites
        ?.filter((fav) => fav.userId === currentUser?.id)
        .map((fav) => fav.bookId),
    [currentUser, favorites]
  )

  const likedBook = useCallback(
    () => books?.filter((book) => myFavorites()?.includes(book.id)),
    [books, myFavorites]
  )

  const openDeleteBookModal = useCallback(
    (book: Book) => () => {
      dispatch(setDetailBook(book))
      dispatch(setIsOpenDeleteBookModal(true))
    },
    [dispatch]
  )

  const closeDeleteBookModal = useCallback(
    () => dispatch(setIsOpenDeleteBookModal(false)),
    [dispatch]
  )
  const deleteBook = useCallback(
    (id: number) => () => {
      deleteBookMutation.mutate(id)
      closeDeleteBookModal()
    },
    [deleteBookMutation, closeDeleteBookModal]
  )

  return {
    myBook,
    likedBook,
    changeBooksMode,
    booksMode,
    deleteBook,
    isOpenDeleteBookModal,
    openDeleteBookModal,
    closeDeleteBookModal,
  }
}
