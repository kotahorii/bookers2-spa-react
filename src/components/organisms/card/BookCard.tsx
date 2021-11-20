import { useAppDispatch } from 'app/hooks'
import { VFC } from 'react'
import { setDetailBook, setIsOpenDetailBookModal } from 'slices/bookSlice'
import { Book } from 'types/bookTypes'

type Props = {
  book: Book
}

export const BookCard: VFC<Props> = ({ book }) => {
  const dispatch = useAppDispatch()
  const openDetailBook = () => {
    dispatch(setDetailBook(book))
    dispatch(setIsOpenDetailBookModal(true))
  }
  return (
    <div
      onClick={openDetailBook}
      className="flex flex-col cursor-pointer px-2 py-2 shadow-md hover:shadow-lg rounded-lg space-y-3"
    >
      <div className="w-48 h-36 bg-gray-300 rounded-lg"></div>
      <p className="text-lg text-center">{book.title}</p>
    </div>
  )
}
