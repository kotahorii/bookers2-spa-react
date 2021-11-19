import { useAppDispatch, useAppSelector } from 'app/hooks'
import { selectAuthData, setAuthData } from 'features/authSlice'
import { ChangeEvent, FormEvent, useCallback, useState } from 'react'
import { SignUpFormData } from 'types/userTypes'
import { useMutationAuth } from './queries/useMutationAuth'

export const useAuth = () => {
  const dispatch = useAppDispatch()
  const authData = useAppSelector(selectAuthData)
  const [isOpenEditModal, setIsOpenEditModal] = useState(false)
  const [isOpenDetailModal, setIsOpenDetailModal] = useState(false)
  const [isLogin, setIsLogin] = useState(false)

  const openEditModal = useCallback(() => setIsOpenEditModal(true), [])
  const closeEditModal = useCallback(() => setIsOpenEditModal(false), [])
  const openDetailModal = useCallback(() => setIsOpenDetailModal(true), [])
  const closeDetailModal = useCallback(() => setIsOpenDetailModal(true), [])

  const [preview, setPreview] = useState('')
  const { signInMutate, signUpMutate } = useMutationAuth()

  const changeAuthData = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value
      const name = e.target.name
      dispatch(setAuthData({ ...authData, [name]: value }))
    },
    [dispatch, authData]
  )

  const uploadImage = useCallback(
    (e) => {
      const file = e.target.files[0] as string
      dispatch(setAuthData({ ...authData, image: file }))
    },
    [dispatch, authData]
  )

  const previewImage = useCallback((e) => {
    const file = e.target.files[0] as string
    setPreview(window.URL.createObjectURL(file))
  }, [])

  const imageChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      uploadImage(e)
      previewImage(e)
    },
    [uploadImage, previewImage]
  )

  const resetPreview = useCallback(() => setPreview(''), [])

  const createFormData = useCallback((): SignUpFormData => {
    const formData = new FormData()
    formData.append('name', authData.name)
    formData.append('email', authData.email)
    formData.append('password', authData.password)
    formData.append('passwordConfirmation', authData.passwordConfirmation)
    formData.append('image', authData.image)

    return formData
  }, [authData])

  const toggleIsLogin = useCallback(() => setIsLogin(!isLogin), [isLogin])

  const authUser = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      const data = createFormData()

      if (isLogin) {
        signInMutate.mutate({
          email: authData.email,
          password: authData.password,
        })
      } else {
        signUpMutate.mutate(data)
      }
    },
    [isLogin, createFormData, signInMutate, signUpMutate, authData]
  )

  return {
    isLogin,
    toggleIsLogin,
    authUser,
    authData,
    changeAuthData,
    preview,
    imageChange,
    resetPreview,
    isOpenEditModal,
    isOpenDetailModal,
    openEditModal,
    closeEditModal,
    openDetailModal,
    closeDetailModal,
  }
}
