import { VFC } from 'react'
import { Book } from 'types/bookTypes'

type Props = {
  book: Book
}

export const BookCard: VFC<Props> = ({ book }) => {
  return (
    <div className="flex flex-col px-2 py-2 shadow-md hover:shadow-lg rounded-lg space-y-3">
      <div className="w-48 h-36 bg-gray-300"></div>
      <p className="text-lg text-center">{book.title}</p>
    </div>
  )
}
