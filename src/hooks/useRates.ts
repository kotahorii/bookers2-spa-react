import { useCallback, useState } from 'react'
import { Book } from 'types/bookTypes'
import { useQueryRates } from './queries/useQueryRates'
import { useRateMutate } from './queries/useRateMutate'
import { useBooks } from './useBooks'

export const useRates = () => {
  const { data: rates, isLoading: isLoadingRates } = useQueryRates()
  const { createRateMutation, updateRateMutation } = useRateMutate()
  const { detailBook, currentUser } = useBooks()

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
  return {
    rate,
    rateCreate,
    rateUpdate,
    myRate,
    averageRate,
    booksRates,
    isLoadingRates,
  }
}
