import { useAppDispatch, useAppSelector } from 'app/hooks'
import { ChangeEvent, useCallback } from 'react'
import {
  selectIsOpenEditUserModal,
  setAuthData,
  setIsOpenEditUserModal,
} from 'slices/authSlice'
import {
  selectEditedBook,
  selectIsOpenBookModal,
  setEditedBook,
} from 'slices/bookSlice'
import { useQueryUser } from './queries/useQueryCurrentUser'
import { useAuth } from './useAuth'

export const useHeader = () => {
  const dispatch = useAppDispatch()
  const { data: currentUser } = useQueryUser()
  const { authData } = useAuth()
  const editedBook = useAppSelector(selectEditedBook)
  const isOpenBookModal = useAppSelector(selectIsOpenBookModal)
  const isOpenEditUserModal = useAppSelector(selectIsOpenEditUserModal)

  const changeBook = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const name = e.target.name
      const value = e.target.value

      dispatch(setEditedBook({ ...editedBook, [name]: value }))
    },
    [dispatch, editedBook]
  )

  const openEditUserModal = useCallback(() => {
    if (currentUser) {
      dispatch(
        setAuthData({
          ...authData,
          id: currentUser?.id,
          name: currentUser.name,
          introduction: currentUser.introduction,
        })
      )
      dispatch(setIsOpenEditUserModal(true))
    }
  }, [dispatch, currentUser, authData])

  const closeEditedUserModal = useCallback(() => {
    dispatch(setIsOpenEditUserModal(false))
  }, [dispatch])


  return {
    isOpenBookModal,
    isOpenEditUserModal,
    editedBook,
    changeBook,
    openEditUserModal,
    closeEditedUserModal,
  }
}
