import { UserCircleIcon } from '@heroicons/react/solid'
import { memo, VFC } from 'react'
import { User } from 'types/userTypes'

type Props = {
  user: User | undefined
  width?: string
}

export const CustomUserIcon: VFC<Props> = memo(({ user, width = 'w-16' }) => {
  return user?.image.url ? (
    <img
      className={`${width} rounded-full`}
      alt="avatar"
      src={user?.image.url}
    />
  ) : (
    <UserCircleIcon className={`${width}  rounded-full text-gray-400`} />
  )
})
