import { CustomUserIcon } from 'components/molecules/CustomUserIcon'
import { memo, VFC } from 'react'
import { User } from 'types/userTypes'

type Props = {
  user: User
}

export const UserCard: VFC<Props> = memo(({ user }) => {
  return (
    <div className="flex flex-col m-1 px-2 py-2 shadow-md hover:shadow-lg rounded-lg space-y-3">
      <CustomUserIcon user={user} />
      <p className="text-lg text-center">{user.name}</p>
    </div>
  )
})
