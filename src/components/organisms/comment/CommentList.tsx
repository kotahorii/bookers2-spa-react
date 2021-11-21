import { useBooks } from 'hooks/useBooks'
import { CommentForm } from './CommentForm'

export const CommentList = () => {
  const { booksComments } = useBooks()
  return (
    <>
      <div className="overflow-auto mt-5 px-3 py-1 bg-gray-200 rounded-lg w-96 h-64">
        {booksComments()?.map((comment) => (
          <div
            key={comment.id}
            className="bg-blue-200 my-2 rounded-lg p-2 break-words"
          >
            {comment.comment}
          </div>
        ))}
      </div>
      <CommentForm />
    </>
  )
}
