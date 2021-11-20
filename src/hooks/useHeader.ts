import { useAppDispatch, useAppSelector } from 'app/hooks'
import { ChangeEvent, FormEvent, useCallback } from 'react'
import { useNavigate } from 'react-router'
import {
  selectIsOpenEditUserModal,
  setAuthData,
  setIsOpenEditUserModal,
} from 'slices/authSlice'
import {
  resetEditedBook,
  selectEditedBook,
  selectIsOpenBookModal,
  setEditedBook,
  setIsOpenBookModal,
} from 'slices/bookSlice'
import { useMutateBooks } from './queries/useMutateBooks'
import { useQueryUser } from './queries/useQueryCurrentUser'
import { useAuth } from './useAuth'

export const useHeader = () => {
  const dispatch = useAppDispatch()
  const { data: currentUser } = useQueryUser()
  const { createBookMutation, updateBookMutation } = useMutateBooks()
  const { authData } = useAuth()
  const editedBook = useAppSelector(selectEditedBook)
  const isOpenBookModal = useAppSelector(selectIsOpenBookModal)
  const isOpenEditUserModal = useAppSelector(selectIsOpenEditUserModal)
  const navigate = useNavigate()

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

  const openCreateBookModal = useCallback(() => {
    dispatch(setIsOpenBookModal(true))
  }, [dispatch])

  const closeCreateBookModal = useCallback(() => {
    dispatch(setIsOpenBookModal(false))
  }, [dispatch])

  const myPageNavigate = useCallback(() => {
    navigate('/myPage')
  }, [navigate])

  const submitBook = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      if (editedBook.id === 0) {
        createBookMutation.mutate(editedBook)
      } else {
        updateBookMutation.mutate(editedBook)
      }
      closeCreateBookModal()
      dispatch(resetEditedBook())
    },
    [
      createBookMutation,
      updateBookMutation,
      editedBook,
      dispatch,
      closeCreateBookModal,
    ]
  )

  return {
    isOpenBookModal,
    isOpenEditUserModal,
    editedBook,
    submitBook,
    changeBook,
    openEditUserModal,
    closeEditedUserModal,
    openCreateBookModal,
    closeCreateBookModal,
    myPageNavigate,
  }
}
