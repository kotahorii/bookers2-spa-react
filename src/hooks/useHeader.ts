import {
  PencilAltIcon,
  PlusSmIcon,
  UserIcon,
  UsersIcon,
  BookOpenIcon,
} from '@heroicons/react/outline'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { useCallback } from 'react'
import { useNavigate } from 'react-router'
import {
  selectIsOpenEditUserModal,
  setAuthData,
  setIsOpenEditUserModal,
} from 'slices/authSlice'
import { selectIsOpenBookModal, setIsOpenBookModal } from 'slices/bookSlice'
import { MenuType } from 'types/bookTypes'
import { useQueryUser } from './queries/useQueryCurrentUser'
import { useAuth } from './useAuth'

export const useHeader = () => {
  const dispatch = useAppDispatch()
  const { data: currentUser } = useQueryUser()
  const { authData } = useAuth()
  const isOpenBookModal = useAppSelector(selectIsOpenBookModal)
  const isOpenEditUserModal = useAppSelector(selectIsOpenEditUserModal)
  const navigate = useNavigate()

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

  const menuItems: MenuType = [
    {
      name: 'Edit my profile',
      icon: PencilAltIcon,
      onClick: openEditUserModal,
    },
    {
      name: 'Create new book',
      icon: PlusSmIcon,
      onClick: openCreateBookModal,
    },
    {
      name: 'Go to my page',
      icon: UserIcon,
      onClick: myPageNavigate,
    },
  ]

  const responsiveItems: MenuType = [
    {
      name: 'Users page',
      icon: UsersIcon,
      onClick: () => navigate('/users'),
    },
    {
      name: 'Books page',
      icon: BookOpenIcon,
      onClick: () => navigate('/main'),
    },
  ]

  return {
    isOpenBookModal,
    isOpenEditUserModal,
    openEditUserModal,
    closeEditedUserModal,
    openCreateBookModal,
    closeCreateBookModal,
    myPageNavigate,
    menuItems,
    responsiveItems,
  }
}
