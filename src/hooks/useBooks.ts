import { useAppDispatch, useAppSelector } from 'app/hooks'
import { ChangeEvent, FormEvent, useCallback, useState } from 'react'
import {
  selectDetailBook,
  selectIsOpenDetailBookModal,
  setIsOpenDetailBookModal,
} from 'slices/bookSlice'
import { useCommentMutation } from './queries/useCommentMutation'
import { useLikeMutation } from './queries/useLikeMutation'
import { useQueryBooks } from './queries/useQueryBooks'
import { useQueryComments } from './queries/useQueryComments'
import { useQueryUser } from './queries/useQueryCurrentUser'
import { useQueryFavorites } from './queries/useQueryFavarites'

export const useBooks = () => {
  const [comment, setComment] = useState('')
  const dispatch = useAppDispatch()
  const isOpenDetailBook = useAppSelector(selectIsOpenDetailBookModal)
  const { data: currentUser, isLoading: isLoadingUser } = useQueryUser()
  const { data: books, isLoading: isLoadingBooks } = useQueryBooks()
  const detailBook = useAppSelector(selectDetailBook)
  const { createLikeMutation, deleteLikeMutation } = useLikeMutation()
  const { data: favorites } = useQueryFavorites()
  const { data: comments } = useQueryComments()
  const { createCommentMutation } = useCommentMutation()

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

  const closeDetailBook = useCallback(() => {
    dispatch(setIsOpenDetailBookModal(false))
  }, [dispatch])

  const booksFavorites = useCallback(
    () => favorites?.filter((fav) => fav.bookId === detailBook.id),
    [detailBook, favorites]
  )

  const booksComments = useCallback(
    () => comments?.filter((comment) => comment.bookId === detailBook.id),
    [comments, detailBook.id]
  )

  const isLiked = useCallback(() => {
    if (booksFavorites) {
      return (
        booksFavorites()!.filter((fav) => fav.userId === currentUser?.id)
          .length > 0
      )
    }
  }, [booksFavorites, currentUser])

  const toggleLike = useCallback(() => {
    if (isLiked()) {
      const fav = booksFavorites()!.filter(
        (fav) => fav.userId === currentUser?.id
      )[0]
      deleteLikeMutation.mutate({ id: fav.id, bookId: detailBook.id })
    } else {
      createLikeMutation.mutate({ bookId: detailBook.id })
    }
  }, [
    isLiked,
    currentUser,
    createLikeMutation,
    deleteLikeMutation,
    booksFavorites,
    detailBook,
  ])

  return {
    booksFavorites,
    booksComments,
    books,
    detailBook,
    currentUser,
    isLiked,
    toggleLike,
    isOpenDetailBook,
    closeDetailBook,
    isLoadingUser,
    isLoadingBooks,
    comment,
    commentChange,
    submitComment,
  }
}
