import { VFC } from 'react'
import { Book } from 'types/bookTypes'
import { HeartIcon as SolidLike } from '@heroicons/react/solid'
import { HeartIcon as OutLineLike } from '@heroicons/react/outline'

type Props = {
  book: Book
}

export const BookCard: VFC<Props> = ({ book }) => {
  return (
    <div className="flex flex-col px-2 py-2 shadow-md hover:shadow-lg rounded-lg space-y-3">
      <div className="w-48 h-36 bg-gray-300 rounded-lg"></div>
      <p className="text-lg text-center">{book.title}</p>
      <SolidLike className="w-8 p-1 text-red-400 rounded-full hover:bg-gray-200 cursor-pointer" />
    </div>
  )
}
