import { Menu } from '@headlessui/react'
import { CustomMenu } from 'components/organisms/menu/CustomMenu'
import { CreateOrEditBook } from 'components/organisms/modal/CreateOrEditBook'
import { CustomModal } from 'components/organisms/modal/CustomModal'
import { EditUserText } from 'components/organisms/modal/EditUserText'
import { Header } from 'components/templates/Header'
import { useHeader } from 'hooks/useHeader'
import { VFC, ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export const Layout: VFC<Props> = ({ children }) => {
  const {
    isOpenEditUserModal,
    closeEditedUserModal,
    isOpenBookModal,
    closeCreateBookModal,
  } = useHeader()
  return (
    <Menu>
      <div className="flex flex-col items-center min-h-screen bg-gray-100 text-gray-500 text-sm font-mono">
        <Header />
        <main className="flex flex-1 flex-col items-center py-5 w-screen">
          {children}
          <CustomMenu />
          <CustomModal
            title="Edit user"
            isOpen={isOpenEditUserModal}
            closeModal={closeEditedUserModal}
          >
            <EditUserText />
          </CustomModal>
          <CustomModal
            title="Create Book"
            isOpen={isOpenBookModal}
            closeModal={closeCreateBookModal}
          >
            <CreateOrEditBook />
          </CustomModal>
        </main>
      </div>
    </Menu>
  )
}
