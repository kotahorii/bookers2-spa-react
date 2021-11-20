import { useBooks } from 'hooks/useBooks'
import { HeartIcon as SolidLike } from '@heroicons/react/solid'
import { HeartIcon as OutLineLike } from '@heroicons/react/outline'

export const DetailBookText = () => {
  const { isLiked, toggleLike, booksFavorites } = useBooks()
  return (
    <div className="flex flex-row items-center">
      {isLiked() ? (
        <SolidLike
          onClick={toggleLike}
          className="w-8 p-1 text-red-400 rounded-full hover:bg-gray-200 cursor-pointer"
        />
      ) : (
        <OutLineLike
          onClick={toggleLike}
          className="w-8 p-1 text-gray-400 rounded-full hover:bg-gray-200 cursor-pointer"
        />
      )}
      <span>{booksFavorites()?.length}</span>
    </div>
  )
}
