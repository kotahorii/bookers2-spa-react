import { useAppSelector } from 'app/hooks'
import { FormEvent, useCallback } from 'react'
import { selectEditedBook } from 'slices/bookSlice'
import { useMutateBooks } from './queries/useMutateBooks'
import { useQueryBooks } from './queries/useQueryBooks'
import { useQueryUser } from './queries/useQueryCurrentUser'

export const useBooks = () => {
  const { data: currentUser } = useQueryUser()
  const { data: books } = useQueryBooks()
  const editedBook = useAppSelector(selectEditedBook)
  const { createBookMutation, updateBookMutation } = useMutateBooks()

  const createOrEditBook = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      if (editedBook.id === 0) {
        createBookMutation.mutate({
          title: editedBook.title,
          body: editedBook.body,
        })
      } else {
        updateBookMutation.mutate({
          id: editedBook.id,
          title: editedBook.title,
          body: editedBook.body,
        })
      }
    },
    [createBookMutation, updateBookMutation, editedBook]
  )

  

  return { books, currentUser, createOrEditBook }
}
