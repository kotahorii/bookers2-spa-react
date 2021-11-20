import { useBooks } from 'hooks/useBooks'
import { HeartIcon as SolidLike } from '@heroicons/react/solid'
import { HeartIcon as OutLineLike } from '@heroicons/react/outline'

export const DetailBookText = () => {
  const { isLiked } = useBooks()
  console.log(isLiked())
  return (
    <div className="flex flex-col">
      {isLiked() ? (
        <SolidLike className="w-8 p-1 text-red-400 rounded-full hover:bg-gray-200 cursor-pointer" />
      ) : (
        <OutLineLike className="w-8 p-1 text-gray-400 rounded-full hover:bg-gray-200 cursor-pointer" />
      )}
    </div>
  )
}
