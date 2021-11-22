import Cookies from 'js-cookie'
import client from 'lib/client'
import { useMutation, useQueryClient } from 'react-query'
import { Book, CreateBook, UpdateBook } from 'types/bookTypes'

export const useMutateBooks = () => {
  const queryClient = useQueryClient()
  const createBookMutation = useMutation(
    (data: CreateBook) =>
      client.post<Book>('books', data, {
        headers: {
          'access-token': Cookies.get('_access_token') as string,
          client: Cookies.get('_client') as string,
          uid: Cookies.get('_uid') as string,
        },
      }),
    {
      onSuccess: (res) => {
        const previousBooks = queryClient.getQueryData<Book[]>('books')
        if (previousBooks) {
          queryClient.setQueryData<Book[]>('books', [
            res.data,
            ...previousBooks,
          ])
        }
      },
    }
  )
  const updateBookMutation = useMutation(
    (data: UpdateBook) => client.put<Book>(`books/${data.id}/`, data),
    {
      onSuccess: (res, variable) => {
        const previousBooks = queryClient.getQueryData<Book[]>('books')
        if (previousBooks) {
          queryClient.setQueryData<Book[]>(
            'books',
            previousBooks.map((book) =>
              variable.id === book.id ? res.data : book
            )
          )
        }
      },
    }
  )
  const deleteBookMutation = useMutation(
    (id: number) => client.delete(`books/${id}`),
    {
      onSuccess: (res, variable) => {
        const previousBooks = queryClient.getQueryData<Book[]>('books')
        if (previousBooks) {
          queryClient.setQueryData<Book[]>(
            'books',
            previousBooks.filter((book) => book.id !== variable)
          )
        }
      },
    }
  )

  return { createBookMutation, updateBookMutation, deleteBookMutation }
}
