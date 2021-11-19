import { Header } from 'components/organisms/Header'
import { VFC, ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export const Layout: VFC<Props> = ({ children }) => {
  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 text-gray-500 text-sm font-mono">
      <Header />
      <main className="flex flex-1 flex-col justify-center items-center w-screen">
        {children}
      </main>
    </div>
  )
}
