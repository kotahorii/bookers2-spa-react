import { UserCircleIcon } from '@heroicons/react/solid'
import { useQueryUser } from 'hooks/queries/useQueryCurrentUser'
import { memo, VFC } from 'react'
import { Navigate } from 'react-router'
import { Link } from 'react-router-dom'

type Props = {
  children: JSX.Element
}

export const PrivateRoute: VFC<Props> = memo(({ children }) => {
  const { data, isLoading } = useQueryUser()
  if (isLoading)
    return (
      <div className="flex flex-col min-h-screen justify-center items-center opacity-40">
        <svg
          className="animate-spin w-32"
          version="1.1"
          id="L9"
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          viewBox="0 0 100 100"
          enable-background="new 0 0 0 0"
        >
          <path
            fill="#879aee"
            d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50"
          ></path>
        </svg>
      </div>
    )
  return data?.email ? children : <Navigate to="/" replace />
})
