import client from 'lib/client'
import { useMutation, useQueryClient } from 'react-query'
import { Comment, CreateComment } from 'types/bookTypes'

export const useCommentMutation = () => {
  const queryClient = useQueryClient()
  const createCommentMutation = useMutation(
    (data: CreateComment) => client.post<Comment>('comments', data),
    {
      onSuccess: (res) => {
        const previousComments = queryClient.getQueryData<Comment[]>('comments')
        if (previousComments) {
          queryClient.setQueryData<Comment[]>('comments', [
            ...previousComments,
            res.data,
          ])
        }
      },
    }
  )
  return { createCommentMutation }
}
