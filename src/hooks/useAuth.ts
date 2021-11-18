import { useCallback, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { SignInData, SignUpData, SignUpFormData } from 'types/userTypes'

export const useAuth = () => {
  const [isOpenEditModal, setIsOpenEditModal] = useState(false)
  const [isOpenDetailModal, setIsOpenDetailModal] = useState(false)

  const openEditModal = useCallback(() => setIsOpenEditModal(true), [])
  const closeEditModal = useCallback(() => setIsOpenEditModal(false), [])
  const openDetailModal = useCallback(() => setIsOpenDetailModal(true), [])
  const closeDetailModal = useCallback(() => setIsOpenDetailModal(true), [])

  const { register: registerSignUp, handleSubmit: handleSignUp } =
    useForm<SignUpData>()
  const { register: registerSignIn, handleSubmit: handleSignIn } =
    useForm<SignInData>()

  const signUp: SubmitHandler<SignUpData> = (data) => {
    const createFormData = (): SignUpFormData => {
      const formData = new FormData()

      formData.append('name', data.name)
      formData.append('email', data.email)
      formData.append('password', data.password)
      formData.append('passwordConfirmation', data.passwordConfirmation)
      formData.append('introduction', data.introduction)
      formData.append('image', data.image)

      return formData
    }
    const inputData = createFormData()
  }
  const signIn: SubmitHandler<SignInData> = (data) => {
    console.log(data)
  }

  return {
    isOpenEditModal,
    isOpenDetailModal,
    openEditModal,
    closeEditModal,
    openDetailModal,
    closeDetailModal,
    registerSignIn,
    registerSignUp,
    handleSignIn,
    handleSignUp,
    signUp,
    signIn,
  }
}
