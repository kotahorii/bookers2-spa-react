import { useQueryUsers } from './queries/useQueryUsers'

export const useUsers = () => {
  const { data: users } = useQueryUsers()

  return { users }
}
