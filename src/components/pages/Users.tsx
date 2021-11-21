import { UserCard } from 'components/organisms/card/UserCard'
import { Layout } from 'components/templates/Layout'
import { useUsers } from 'hooks/useUsers'
import { memo } from 'react'

export const Users = memo(() => {
  const { users } = useUsers()
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
