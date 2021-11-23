import { useAppDispatch, useAppSelector } from 'app/hooks'
import {
  selectAuthData,
  selectPreview,
  setAuthData,
  setPreview,
} from 'slices/authSlice'
import { ChangeEvent, FormEvent, useCallback, useState } from 'react'
import { SignUpFormData } from 'types/userTypes'
import { useMutationAuth } from './queries/useMutationAuth'

export const useAuth = () => {
  const dispatch = useAppDispatch()
  const preview = useAppSelector(selectPreview)
  const authData = useAppSelector(selectAuthData)
  const [isLogin, setIsLogin] = useState(true)

  const { signInMutate, signUpMutate, signOutMutate } = useMutationAuth()

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

  const previewImage = useCallback(
    (e) => {
      const file = e.target.files[0] as string
      dispatch(setPreview(window.URL.createObjectURL(file)))
    },
    [dispatch]
  )

  const imageChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      uploadImage(e)
      previewImage(e)
    },
    [uploadImage, previewImage]
  )

  const resetPreview = useCallback(() => dispatch(setPreview('')), [dispatch])

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

  const signOut = useCallback(() => signOutMutate.mutate(), [signOutMutate])

  const isValidAuth = useCallback(
    () =>
      isLogin
        ? !authData.email || authData.password.length < 6
        : !authData.name ||
          !authData.email ||
          authData.password.length < 6 ||
          authData.passwordConfirmation.length < 6,
    [isLogin, authData]
  )

  const isLoadingAuth = useCallback(
    () => (isLogin ? signInMutate.isLoading : signUpMutate.isLoading),
    [isLogin, signInMutate.isLoading, signUpMutate.isLoading]
  )

  return {
    isLogin,
    toggleIsLogin,
    authUser,
    signOut,
    authData,
    changeAuthData,
    preview,
    imageChange,
    resetPreview,
    isValidAuth,
    isLoadingAuth,
  }
}
