import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { PencilAltIcon } from '@heroicons/react/outline'
import { LogoutIcon, PlusSmIcon, UserIcon } from '@heroicons/react/outline'
import { useAuth } from 'hooks/useAuth'
import { MenuType } from 'types/bookTypes'
import { useHeader } from 'hooks/useHeader'

export const CustomMenu = () => {
  const { signOut } = useAuth()
  const { openEditUserModal, myPageNavigate, openCreateBookModal } = useHeader()
  const menuItems: MenuType = [
    {
      name: 'Edit my profile',
      icon: PencilAltIcon,
      onClick: openEditUserModal,
    },
    {
      name: 'Create new book',
      icon: PlusSmIcon,
      onClick: openCreateBookModal,
    },
    {
      name: 'Go to my page',
      icon: UserIcon,
      onClick: myPageNavigate,
    },
  ]

  return (
    <Transition
      as={Fragment}
      enter="transition ease-out duration-100"
      enterFrom="transform opacity-0 scale-95"
      enterTo="transform opacity-100 scale-100"
      leave="transition ease-in duration-75"
      leaveFrom="transform opacity-100 scale-100"
      leaveTo="transform opacity-0 scale-95"
    >
      <Menu.Items className="absolute left-3 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        <div className="p-1">
          {menuItems.map((item) => (
            <Menu.Item>
              <button
                onClick={item.onClick}
                className="text-gray-500 hover:bg-blue-100 group flex rounded-md items-center w-full px-2 py-2 text-sm"
              >
                <item.icon className="w-6 mr-2" />
                {item.name}
              </button>
            </Menu.Item>
          ))}
        </div>
        <div className="p-1">
          <Menu.Item>
            <button
              onClick={signOut}
              className="text-gray-500 hover:bg-blue-100 group flex rounded-md items-center w-full px-2 py-2 text-sm"
            >
              <LogoutIcon className="w-6 mr-2" />
              Logout
            </button>
          </Menu.Item>
        </div>
      </Menu.Items>
    </Transition>
  )
}
