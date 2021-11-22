import { useCallback, useState } from 'react'
import { useQueryFavorites } from './queries/useQueryFavarites'
import { useBooks } from './useBooks'

type ModeType = 'myBooks' | 'likedBooks'

export const useMyPage = () => {
  const { currentUser, books } = useBooks()
  const { data: favorites } = useQueryFavorites()
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
  return { myBook, likedBook, changeBooksMode, booksMode }
}
