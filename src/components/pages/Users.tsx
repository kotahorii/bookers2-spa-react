import { UserCard } from 'components/organisms/card/UserCard'
import { Layout } from 'components/templates/Layout'
import { useUsers } from 'hooks/useUsers'

export const Users = () => {
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
}
