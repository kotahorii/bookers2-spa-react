import { Menu } from '@headlessui/react'
import { useBooks } from 'hooks/useBooks'
import { Link } from 'react-router-dom'

export const Header = () => {
  const { currentUser } = useBooks()
  return (
    <nav className=" flex flex-row justify-between items-center px-3 w-screen h-20 text-white bg-blue-400">
      <Menu.Button>
        <img
          className="rounded-full w-12 shadow-sm"
          alt="avatar"
          src={currentUser?.image.url}
        />
      </Menu.Button>
      <div className="text-3xl">Bookers</div>
      <div className="md:flex hidden flex-row space-x-3">
        <Link
          to="/main"
          className="text-lg hover:bg-blue-500 rounded-lg px-3 py-3"
        >
          Books
        </Link>
        <Link
          to="/users"
          className="text-lg hover:bg-blue-500 rounded-lg px-3 py-3"
        >
          Users
        </Link>
      </div>
      <div className="md:hidden block"></div>
    </nav>
  )
}
