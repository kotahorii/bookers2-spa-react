import { CustomUserIcon } from 'components/molecules/CustomUserIcon'
import { Layout } from 'components/templates/Layout'
import { useUsers } from 'hooks/useUsers'
import React from 'react'

export const Users = () => {
  const { users } = useUsers()
  return (
    <Layout>
      {users?.map((user) => (
        <CustomUserIcon user={user} />
      ))}
    </Layout>
  )
}
