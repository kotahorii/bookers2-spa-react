import { CustomUserIcon } from 'components/molecules/CustomUserIcon'
import { useBooks } from 'hooks/useBooks'
import { useUsers } from 'hooks/useUsers'
import { memo } from 'react'
import { CommentList } from '../comment/CommentList'

export const DetailBookText = memo(() => {
  const { booksUser } = useUsers()
  const { detailBook } = useBooks()
  return (
    <div className="flex flex-col items-center mt-3 space-y-3">
      <div className="flex flex-row space-x-3 items-center justify-center">
        <div className="h-16 w-16">
          <CustomUserIcon user={booksUser(detailBook)} />
        </div>
        <div className="md:w-72 w-56 break-words">{detailBook.body}</div>
      </div>
      <CommentList />
    </div>
  )
})
