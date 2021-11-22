import { CustomUserIcon } from 'components/molecules/CustomUserIcon'
import { memo, VFC } from 'react'
import { User } from 'types/userTypes'

type Props = {
  user: User
  onClick: () => void
}

export const UserCard: VFC<Props> = memo(({ user, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="flex flex-col bg-blue-50 cursor-pointer m-1 px-2 py-2 shadow-md hover:shadow-lg rounded-lg space-y-3"
    >
      <CustomUserIcon user={user} />
      <p className="text-lg text-center">{user.name}</p>
    </div>
  )
})
