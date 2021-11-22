import { useQueryUser } from 'hooks/queries/useQueryCurrentUser'
import { memo, VFC } from 'react'
import { Navigate } from 'react-router'

type Props = {
  children: JSX.Element
}

export const PrivateRoute: VFC<Props> = memo(({ children }) => {
  const { data, isLoading } = useQueryUser()
  if (isLoading) return <p>Loading...</p>
  return data?.email ? children : <Navigate to="/" replace />
})
