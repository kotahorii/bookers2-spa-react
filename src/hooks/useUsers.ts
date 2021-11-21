import { useCallback } from 'react'
import { Book } from 'types/bookTypes'
import { useQueryUsers } from './queries/useQueryUsers'

export const useUsers = () => {
  const { data: users } = useQueryUsers()
  const booksUser = useCallback(
    (book: Book) => users?.filter((user) => user.id === book.userId)[0],
    [users]
  )

  return { users, booksUser }
}
