import { useBooks } from 'hooks/useBooks'
import { HeartIcon as SolidLike } from '@heroicons/react/solid'
import { HeartIcon as OutLineLike } from '@heroicons/react/outline'

export const DetailBookText = () => {
  const { isLiked, toggleLike, booksFavorites, detailBook, booksComments } =
    useBooks()
  return (
    <div className="flex flex-col space-y-3">
      <div className="overflow-auto mt-5 px-3 py-1 bg-gray-200 rounded-lg w-96 h-64">
        {[...Array(10)]
          .map((_, i) => i)
          .map((i) => (
            <div
              key={i}
              className="bg-blue-200 my-2 rounded-lg p-2 break-words"
            >
              aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
            </div>
          ))}
        {/* {booksComments()?.map((comment) => comment.comment)} */}
      </div>
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
    </div>
  )
}
