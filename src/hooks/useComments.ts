import { ChangeEvent, FormEvent, useCallback, useState } from 'react'
import { useCommentMutation } from './queries/useCommentMutation'
import { useQueryComments } from './queries/useQueryComments'
import { useBooks } from './useBooks'

export const useComments = () => {
  const { data: comments } = useQueryComments()
  const { createCommentMutation } = useCommentMutation()
  const [comment, setComment] = useState('')
  const { detailBook } = useBooks()

  const commentChange = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => setComment(e.target.value),
    []
  )

  const submitComment = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      createCommentMutation.mutate({ bookId: detailBook.id, comment: comment })
      setComment('')
    },
    [comment, createCommentMutation, detailBook.id]
  )

  const booksComments = useCallback(
    () => comments?.filter((comment) => comment.bookId === detailBook.id),
    [comments, detailBook.id]
  )
  return {
    comment,
    commentChange,
    submitComment,
    booksComments,
    createCommentMutation,
  }
}
