export type SignUpData = {
  name: string
  email: string
  password: string
  passwordConfirmation: string
  introduction: string
  image: string
}

export type SignInData = {
  email: string
  password: string
}

export type User = {
  id: number
  uid: string
  provider: string
  email: string
  name: string
  image: {
    url: string
  }
  introduction: string
  allowPasswordChange: boolean
  createdAt?: Date
  updatedAt?: Date
}

export type UpdateUserData = {
  id: number | undefined | null
  name?: string
  introduction?: string
  image?: string
}
export type UpdateUserFormData = FormData & {
  append(
    name: keyof UpdateUserData,
    value: String | Blob,
    fileName?: string
  ): any
}

