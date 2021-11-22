import { useCallback } from 'react'
import { Book } from 'types/bookTypes'
import { useLikeMutation } from './queries/useLikeMutation'
import { useQueryFavorites } from './queries/useQueryFavarites'
import { useBooks } from './useBooks'

export const useLikes = () => {
  const { createLikeMutation, deleteLikeMutation } = useLikeMutation()
  const { data: favorites } = useQueryFavorites()
  const { currentUser } = useBooks()

  const booksFavorites = useCallback(
    (book: Book) => favorites?.filter((fav) => fav.bookId === book.id),
    [favorites]
  )
  const isLiked = useCallback(
    (book: Book) =>
      booksFavorites(book) &&
      booksFavorites(book)!.filter((fav) => fav.userId === currentUser?.id)
        .length > 0,
    [booksFavorites, currentUser]
  )
  const toggleLike = useCallback(
    (book: Book) => () => {
      if (isLiked(book)) {
        const fav = booksFavorites(book)!.filter(
          (fav) => fav.userId === currentUser?.id
        )[0]
        deleteLikeMutation.mutate({ id: fav.id, bookId: book.id })
      } else {
        createLikeMutation.mutate({ bookId: book.id })
      }
    },
    [
      isLiked,
      currentUser,
      createLikeMutation,
      deleteLikeMutation,
      booksFavorites,
    ]
  )
  return { booksFavorites, isLiked, toggleLike }
}
