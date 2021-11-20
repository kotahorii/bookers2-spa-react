import axios from 'axios'
import client from 'lib/client'
import { useMutation, useQueryClient } from 'react-query'
import { Book, CreateFavorite, DeleteFavorite, Favorite } from 'types/bookTypes'

export const useLikeMutation = () => {
  const queryClient = useQueryClient()
  const createLikeMutation = useMutation(
    (data: CreateFavorite) => client.post<Favorite>('favorites', data),
    {
      onSuccess: (res, variable) => {
        const previousBooks = queryClient.getQueryData<Book[]>('books')
        if (previousBooks) {
          queryClient.setQueryData<Book[]>(
            'books',
            previousBooks.map((book) =>
              book.id === variable.bookId
                ? { ...book, favorites: [...book.favorites, res.data] }
                : book
            )
          )
        }
      },
    }
  )
  const deleteLikeMutation = useMutation(
    (data: DeleteFavorite) =>
      axios.request({
        method: 'delete',
        url: `${process.env.REACT_APP_REST_URL}/favorites/${data.id}`,
        data: { bookId: data.bookId },
      }),
    {
      onSuccess: (res, variable) => {
        const previousBooks = queryClient.getQueryData<Book[]>('books')
        if (previousBooks) {
          previousBooks?.map((book) =>
            book.id === variable.bookId
              ? {
                  ...book,
                  favorites: book.favorites.filter(
                    (favorite) => favorite.bookId !== variable.bookId
                  ),
                }
              : book
          )
        }
      },
    }
  )

  return { createLikeMutation, deleteLikeMutation }
}
