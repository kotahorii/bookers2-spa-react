import { LikeButton } from 'components/atom/LikeButton'
import { useBooks } from 'hooks/useBooks'
import { useLikes } from 'hooks/useLikes'
import { useRates } from 'hooks/useRates'
import { memo, VFC } from 'react'
import { Book } from 'types/bookTypes'

import { RateAverage } from '../comment/RateAverage'

type Props = {
  book: Book
}

export const BookCard: VFC<Props> = memo(({ book }) => {
  const { booksFavorites } = useLikes()
  const { averageRate } = useRates()
  const { openDetailBook } = useBooks()

  return (
    <div className="flex flex-col m-2 cursor-pointer px-2 py-2 shadow-md hover:shadow-lg rounded-lg space-y-3">
      <div onClick={openDetailBook(book)}>
        <div className="w-48 h-36 bg-gray-300 rounded-lg"></div>
        <p className="text-lg text-center">{book.title}</p>
      </div>
      <div className="flex flex-row justify-between items-center px-2">
        <div className="flex flex-row items-center">
          <LikeButton book={book} />
          <span>{booksFavorites(book)?.length}</span>
        </div>
        <div className="flex flex-row">
          <div className="mr-1">
            <RateAverage book={book} />
          </div>
          <p>
            {averageRate(book)?.toString() !== 'NaN'
              ? averageRate(book)?.toString()
              : 0}
          </p>
        </div>
      </div>
    </div>
  )
})
