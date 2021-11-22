import { CustomArea } from 'components/atom/CustomArea'
import { CustomButton } from 'components/atom/CustomButton'
import { useBooks } from 'hooks/useBooks'
import { HeartIcon as SolidLike } from '@heroicons/react/solid'
import { HeartIcon as OutLineLike } from '@heroicons/react/outline'
import { CustomRateInput } from './CustomRateInput'
import { memo } from 'react'

export const CommentForm = memo(() => {
  const {
    comment,
    commentChange,
    submitComment,
    isLiked,
    toggleLike,
    booksFavorites,
    createCommentMutation,
    detailBook,
  } = useBooks()

  return (
    <form
      onSubmit={submitComment}
      className="flex flex-col items-end space-y-3 w-full"
    >
      <CustomArea
        value={comment}
        onChange={commentChange}
        placeholder="Comment"
      />
      <div className="flex flex-row w-full items-center justify-between">
        <div className="flex flex-row items-center">
          {isLiked(detailBook) ? (
            <SolidLike
              onClick={toggleLike(detailBook)}
              className="w-8 p-1 text-red-400 rounded-full hover:bg-gray-200 cursor-pointer"
            />
          ) : (
            <OutLineLike
              onClick={toggleLike(detailBook)}
              className="w-8 p-1 text-gray-400 rounded-full hover:bg-gray-200 cursor-pointer"
            />
          )}
          <span>{booksFavorites(detailBook)?.length}</span>
        </div>
        <CustomRateInput />
        <div className="flex flex-row items-center space-x-2 w-48">
          <p className="ml-2">{comment.length}/140</p>
          <CustomButton
            text="Comment"
            type="submit"
            disabled={!comment || comment.length > 140}
            loading={createCommentMutation.isLoading}
          />
        </div>
      </div>
    </form>
  )
})
