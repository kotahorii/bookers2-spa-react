import { useAppDispatch, useAppSelector } from 'app/hooks'
import { ChangeEvent, FormEvent, useCallback, useState } from 'react'
import {
  selectDetailBook,
  selectIsOpenDetailBookModal,
  setDetailBook,
  setIsOpenDetailBookModal,
} from 'slices/bookSlice'
import { Book } from 'types/bookTypes'
import { useCommentMutation } from './queries/useCommentMutation'
import { useLikeMutation } from './queries/useLikeMutation'
import { useQueryBooks } from './queries/useQueryBooks'
import { useQueryComments } from './queries/useQueryComments'
import { useQueryUser } from './queries/useQueryCurrentUser'
import { useQueryFavorites } from './queries/useQueryFavarites'
import { useQueryRates } from './queries/useQueryRates'
import { useRateMutate } from './queries/useRateMutate'

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
  const { data: rates, isLoading: isLoadingRates } = useQueryRates()
  const { createRateMutation, updateRateMutation } = useRateMutate()
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

  const closeDetailBook = useCallback(
    () => dispatch(setIsOpenDetailBookModal(false)),
    [dispatch]
  )

  const booksFavorites = useCallback(
    (book: Book) => favorites?.filter((fav) => fav.bookId === book.id),
    [favorites]
  )

  const booksComments = useCallback(
    () => comments?.filter((comment) => comment.bookId === detailBook.id),
    [comments, detailBook.id]
  )

  const booksRates = useCallback(
    (book: Book) => rates?.filter((rate) => rate.bookId === book.id),
    [rates]
  )

  const myRate = useCallback(
    (book: Book) =>
      booksRates(book)?.filter((rate) => rate.userId === currentUser?.id)[0],
    [booksRates, currentUser?.id]
  )

  const [rate, setRate] = useState<number | undefined>(myRate(detailBook)?.rate)
  const rateCreate = useCallback(
    (num: number) => () => {
      setRate(num)
      createRateMutation.mutate({ rate: num, bookId: detailBook.id })
    },
    [detailBook.id, createRateMutation]
  )
  const rateUpdate = useCallback(
    (num: number) => () => {
      setRate(num)
      updateRateMutation.mutate({
        id: myRate(detailBook)?.id!,
        bookId: detailBook.id,
        rate: num,
      })
    },
    [myRate, detailBook, updateRateMutation]
  )

  const averageRate = useCallback(
    (book: Book) =>
      booksRates(book) &&
      booksRates(book)!
        .map((rate) => rate.rate)
        .reduce((acc, cur) => acc + cur, 0) / booksRates(book)!.length,
    [booksRates]
  )

  const isLiked = useCallback(
    (book: Book) =>
      booksFavorites(book) &&
      booksFavorites(book)!.filter((fav) => fav.userId === currentUser?.id)
        .length > 0,
    [booksFavorites, currentUser]
  )
  const toggleLike = useCallback(
    (book: Book) => () => {
      if (isLiked(book)) {
        const fav = booksFavorites(book)!.filter(
          (fav) => fav.userId === currentUser?.id
        )[0]
        deleteLikeMutation.mutate({ id: fav.id, bookId: book.id })
      } else {
        createLikeMutation.mutate({ bookId: book.id })
      }
    },
    [
      isLiked,
      currentUser,
      createLikeMutation,
      deleteLikeMutation,
      booksFavorites,
    ]
  )

  const openDetailBook = useCallback(
    (book: Book) => () => {
      dispatch(setDetailBook(book))
      dispatch(setIsOpenDetailBookModal(true))
    },
    [dispatch]
  )

  return {
    rate,
    rateCreate,
    rateUpdate,
    myRate,
    averageRate,
    booksFavorites,
    booksComments,
    booksRates,
    books,
    detailBook,
    currentUser,
    isLiked,
    toggleLike,
    isOpenDetailBook,
    openDetailBook,
    closeDetailBook,
    isLoadingUser,
    isLoadingBooks,
    isLoadingRates,
    comment,
    commentChange,
    submitComment,
    createCommentMutation,
  }
}
