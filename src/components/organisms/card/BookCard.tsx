import { useBooks } from 'hooks/useBooks'
import { VFC } from 'react'
import { Book } from 'types/bookTypes'
import { HeartIcon as SolidLike } from '@heroicons/react/solid'
import { HeartIcon as OutLineLike } from '@heroicons/react/outline'

type Props = {
  book: Book
}

export const BookCard: VFC<Props> = ({ book }) => {
  const { averageRate, isLiked, toggleLike, booksFavorites, openDetailBook } =
    useBooks()

  return (
    <div className="flex flex-col m-2 cursor-pointer px-2 py-2 shadow-md hover:shadow-lg rounded-lg space-y-3">
      <div onClick={openDetailBook(book)}>
        <div className="w-48 h-36 bg-gray-300 rounded-lg"></div>
        <p className="text-lg text-center">{book.title}</p>
      </div>
      <div className="flex flex-row justify-between items-center px-2">
        <div className="flex flex-row items-center">
          {isLiked(book) ? (
            <SolidLike
              onClick={toggleLike(book)}
              className="w-8 p-1 text-red-400 rounded-full hover:bg-gray-200 cursor-pointer"
            />
          ) : (
            <OutLineLike
              onClick={toggleLike(book)}
              className="w-8 p-1 text-gray-400 rounded-full hover:bg-gray-200 cursor-pointer"
            />
          )}
          <span>{booksFavorites(book)?.length}</span>
        </div>
        <div>
          {averageRate(book)?.toString() !== 'NaN'
            ? averageRate(book)?.toString()
            : 0}
        </div>
      </div>
    </div>
  )
}
