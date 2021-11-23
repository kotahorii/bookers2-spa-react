import { CustomArea } from 'components/atom/CustomArea'
import { CustomButton } from 'components/atom/CustomButton'
import { useBooks } from 'hooks/useBooks'
import { CustomRateInput } from './CustomRateInput'
import { memo } from 'react'
import { LikeButton } from 'components/atom/LikeButton'
import { useComments } from 'hooks/useComments'
import { useLikes } from 'hooks/useLikes'

export const CommentForm = memo(() => {
  const { detailBook } = useBooks()
  const { booksFavorites } = useLikes()
  const { commentChange, submitComment, comment, createCommentMutation } =
    useComments()
  return (
    <form
      onSubmit={submitComment}
      className="flex flex-col items-end space-y-3 md:w-full w-72"
    >
      <CustomArea
        value={comment}
        onChange={commentChange}
        placeholder="Comment"
      />
      <div className="flex flex-row w-full items-center justify-between">
        <div className="flex flex-row items-center">
          <LikeButton book={detailBook} />
          <span>{booksFavorites(detailBook)?.length}</span>
        </div>
        <CustomRateInput />
        <div className="flex flex-row items-center md:space-x-2 space-x-1 w-48">
          <p className="md:ml-2">{comment.length}/140</p>
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
