import client from 'lib/client'
import { useMutation, useQueryClient } from 'react-query'
import { Book, CreateBook, UpdateBook } from 'types/bookTypes'

export const useMutateBooks = () => {
  const queryClient = useQueryClient()
  const createBookMutation = useMutation(
    (data: CreateBook) => client.post<Book>('books', data),
    {
      onSuccess: (res) => {
        const previousBooks = queryClient.getQueryData<Book[]>('books')
        if (previousBooks) {
          queryClient.setQueryData<Book[]>('books', [
            ...previousBooks,
            res.data,
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
    (id: number) => client.delete(`books/id`),
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
