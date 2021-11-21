import { CommentInput } from 'components/atom/CommentInput'
import { CustomButton } from 'components/atom/CustomButton'
import { useBooks } from 'hooks/useBooks'
import { HeartIcon as SolidLike } from '@heroicons/react/solid'
import { HeartIcon as OutLineLike } from '@heroicons/react/outline'
import { useCommentMutation } from 'hooks/queries/useCommentMutation'
import { CustomRateInput } from './CustomRateInput'

export const CommentForm = () => {
  const {
    comment,
    commentChange,
    submitComment,
    isLiked,
    toggleLike,
    booksFavorites,
    detailBook,
  } = useBooks()
  const { createCommentMutation } = useCommentMutation()

  return (
    <form
      onSubmit={submitComment}
      className="flex flex-col items-end space-y-3 w-full"
    >
      <CommentInput
        value={comment}
        onChange={commentChange}
        placeholder="Comment"
      />
      <div className="flex flex-row w-full space-x-3 justify-between">
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
        <div></div>
        <CustomButton
          text="Comment"
          type="submit"
          disabled={!comment}
          loading={createCommentMutation.isLoading}
        />
      </div>
    </form>
  )
}