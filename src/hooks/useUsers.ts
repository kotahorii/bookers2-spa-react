import { useAppDispatch, useAppSelector } from 'app/hooks'
import { FormEvent, useCallback } from 'react'
import { selectDetailUser, setDetailUser, setIsOpenEditUserModal } from 'slices/authSlice'
import { Book } from 'types/bookTypes'
import { UpdateUserFormData, User } from 'types/userTypes'
import { useQueryUsers } from './queries/useQueryUsers'
import { useQueryUser } from './queries/useQueryCurrentUser'
import { useMutationUsers } from './queries/useMutationUsers'
import { toast } from 'react-toastify'
import { useAuth } from './useAuth'

export const useUsers = () => {
  const dispatch = useAppDispatch()
  const { data: users } = useQueryUsers()
  const { data: currentUser } = useQueryUser()
  const { updateUserMutation } = useMutationUsers()
  const { authData } = useAuth()
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

  const createEditFormData = useCallback((): UpdateUserFormData => {
    const formData = new FormData()
    formData.append('name', authData.name || '')
    formData.append('introduction', authData.introduction || '')
    formData.append('image', authData.image)
    return formData
  }, [authData])

  const updateUser = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      const data = {
        id: currentUser?.id,
        formData: createEditFormData(),
      }
      updateUserMutation.mutate(data)
      dispatch(setIsOpenEditUserModal(false))
      toast.success('Success to update user!')
    },
    [currentUser, createEditFormData, updateUserMutation, dispatch]
  )

  return { users, booksUser, detailUser, openUsersBooks, updateUser }
}
