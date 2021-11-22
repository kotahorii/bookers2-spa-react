import { BookCard } from 'components/organisms/card/BookCard'
import { LoadingCard } from 'components/organisms/card/LoadingCard'
import { UserCard } from 'components/organisms/card/UserCard'
import { CustomModal } from 'components/organisms/modal/CustomModal'
import { DetailBookText } from 'components/organisms/modal/DetailBookText'
import { Layout } from 'components/templates/Layout'
import { useBooks } from 'hooks/useBooks'
import { useRates } from 'hooks/useRates'
import { useUsers } from 'hooks/useUsers'
import { memo } from 'react'

export const Users = memo(() => {
  const { users } = useUsers()
  const { isLoadingBooks, isLoadingUser, usersBook } = useBooks()
  const { detailUser, openUsersBooks } = useUsers()
  const { isLoadingRates } = useRates()
  const { detailBook, isOpenDetailBook, closeDetailBook } = useBooks()
  if (isLoadingBooks || isLoadingUser || isLoadingRates)
    return (
      <Layout>
        <div className="md:flex md:flex-wrap md:items-center justify-center block">
          {[...Array(18)]
            .map((_, i) => i)
            ?.map((i) => (
              <LoadingCard key={i} />
            ))}
        </div>
      </Layout>
    )
  return (
    <Layout>
      <div className="md:grid grid-cols-4 bg-gray-100 w-1/2 h-48 rounded-lg p-2 overflow-auto block">
        {users?.map((user) => (
          <UserCard onClick={openUsersBooks(user)} key={user.id} user={user} />
        ))}
      </div>
      <div className="md:flex md:flex-wrap md:items-center mt-3 justify-center block">
        {usersBook(detailUser)?.map((book) => (
          <BookCard book={book} />
        ))}
      </div>
      <CustomModal
        title={detailBook.title}
        isOpen={isOpenDetailBook}
        closeModal={closeDetailBook}
      >
        <DetailBookText />
      </CustomModal>
    </Layout>
  )
})
