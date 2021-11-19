import { Menu } from '@headlessui/react'
import { CustomMenu } from 'components/organisms/books/CustomMenu'
import { Header } from 'components/templates/Header'
import { VFC, ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export const Layout: VFC<Props> = ({ children }) => {
  return (
    <Menu>
      <div className="flex flex-col items-center min-h-screen bg-gray-100 text-gray-500 text-sm font-mono">
        <Header />
        <main className="flex flex-1 flex-col items-center py-5 w-screen">
          {children}
          <CustomMenu />
        </main>
      </div>
    </Menu>
  )
}
