import { useAppDispatch, useAppSelector } from 'app/hooks'
import { useCallback } from 'react'
import { selectDetailUser, setDetailUser } from 'slices/authSlice'
import { Book } from 'types/bookTypes'
import { User } from 'types/userTypes'
import { useQueryUsers } from './queries/useQueryUsers'

export const useUsers = () => {
  const dispatch = useAppDispatch()
  const { data: users } = useQueryUsers()
  const booksUser = useCallback(
    (book: Book) => users?.filter((user) => user.id === book.userId)[0],
    [users]
  )
  const detailUser = useAppSelector(selectDetailUser)
  const openUsersBooks = useCallback(
    (user: User) => () => {
      dispatch(setDetailUser(user))
    },
    [dispatch]
  )
  return { users, booksUser, detailUser, openUsersBooks }
}
