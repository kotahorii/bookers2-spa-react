import client from 'lib/client'
import { useMutation, useQueryClient } from 'react-query'
import { UpdateUserFormData, User } from 'types/userTypes'

type Data = {
  id: number | undefined | null
  formData: UpdateUserFormData
}

export const useMutationUsers = () => {
  const queryClient = useQueryClient()

  const updateUserMutation = useMutation(
    (data: Data) => client.put<User>(`users/${data.id}/`, data.formData),
    {
      onSuccess: (res, variable) => {
        const previousUsers = queryClient.getQueryData<User[]>('users')
        queryClient.setQueryData<User>('user', res.data)
        if (previousUsers) {
          queryClient.setQueryData<User[]>(
            'users',
            previousUsers.map((user) =>
              user.id === variable.id ? res.data : user
            )
          )
        }
      },
    }
  )
  return { updateUserMutation }
}
