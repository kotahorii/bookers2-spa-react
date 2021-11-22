import { Spinner } from 'components/atom/Spinner'
import { useQueryUser } from 'hooks/queries/useQueryCurrentUser'
import { memo, VFC } from 'react'
import { Navigate } from 'react-router'

type Props = {
  children: JSX.Element
}

export const PublicRoute: VFC<Props> = memo(({ children }) => {
  const { data, isLoading } = useQueryUser()
  if (isLoading)
    return (
      <div className="flex flex-col min-h-screen opacity-40 justify-center items-center">
        <Spinner />
      </div>
    )
  return !data?.email ? children : <Navigate to="/main" replace />
})
