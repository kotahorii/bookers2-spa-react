import client from 'lib/client'
import { useMutation, useQueryClient } from 'react-query'
import { Book, Comment, CreateComment } from 'types/bookTypes'

export const useCommentMutation = () => {
  const queryClient = useQueryClient()
  const createCommentMutation = useMutation(
    (data: CreateComment) => client.post<Comment>('comments', data),
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
  return { createCommentMutation }
}
