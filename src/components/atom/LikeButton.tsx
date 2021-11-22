import { memo, VFC } from 'react'
import { Book } from 'types/bookTypes'
import { HeartIcon as SolidLike } from '@heroicons/react/solid'
import { HeartIcon as OutLineLike } from '@heroicons/react/outline'
import { useLikes } from 'hooks/useLikes'

type Props = {
  book: Book
}

export const LikeButton: VFC<Props> = memo(({ book }) => {
  const { isLiked, toggleLike } = useLikes()
  return (
    <>
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
    </>
  )
})
