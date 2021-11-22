import { LoadingCard } from 'components/organisms/card/LoadingCard'
import { UserCard } from 'components/organisms/card/UserCard'
import { Layout } from 'components/templates/Layout'
import { useBooks } from 'hooks/useBooks'
import { useUsers } from 'hooks/useUsers'
import { memo } from 'react'

export const Users = memo(() => {
  const { users } = useUsers()
  const { isLoadingBooks, isLoadingUser } = useBooks()
  if (isLoadingBooks || isLoadingUser)
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
      <div className="md:flex md:flex-wrap block">
        {users?.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </Layout>
  )
})
