import { useQueryBooks } from './queries/useQueryBooks'
import { useQueryUser } from './queries/useQueryCurrentUser'

export const useBooks = () => {
  const { data: currentUser } = useQueryUser()
  const { data: books } = useQueryBooks()

  return { books, currentUser }
}
