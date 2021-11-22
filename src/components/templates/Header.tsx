import { Menu } from '@headlessui/react'
import { CustomUserIcon } from 'components/molecules/CustomUserIcon'
import { useBooks } from 'hooks/useBooks'
import { memo } from 'react'
import { Link } from 'react-router-dom'

export const Header = memo(() => {
  const pageTopButton = document.querySelector('#page-top')
  pageTopButton?.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  })
  const { currentUser } = useBooks()
  return (
    <nav className=" flex flex-row z-10 fixed justify-between items-center px-3 w-screen h-20 text-white bg-blue-400">
      <Menu.Button>
        <CustomUserIcon user={currentUser} width="w-12" />
      </Menu.Button>
      <div
        id="page-top"
        className="text-3xl hover:text-blue-200 cursor-pointer"
      >
        Bookers
      </div>
      <div className="md:flex hidden flex-row space-x-3">
        <Link
          to="/main"
          className="text-lg hover:bg-blue-500 rounded-full px-3 py-3"
        >
          Books
        </Link>
        <Link
          to="/users"
          className="text-lg hover:bg-blue-500 rounded-full px-3 py-3"
        >
          Users
        </Link>
      </div>
      <div className="md:hidden block"></div>
    </nav>
  )
})
