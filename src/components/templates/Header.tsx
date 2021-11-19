import { useAuth } from 'hooks/useAuth'
import { useBooks } from 'hooks/useBooks'
import { Link } from 'react-router-dom'

export const Header = () => {
  const { signOut } = useAuth()
  const { currentUser } = useBooks()
  return (
    <nav className=" flex flex-row justify-between items-center px-3 w-screen h-20 text-gray-50 bg-blue-400">
      <div>
        <img
          className="rounded-full w-12 shadow-sm"
          alt="avatar"
          src={currentUser?.image.url}
        />
      </div>
      <div className="text-3xl">Bookers</div>
      <div className="flex flex-row space-x-3">
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
        <span
          onClick={signOut}
          className="text-lg hover:bg-blue-500 rounded-lg px-3 py-3 cursor-pointer"
        >
          Sign out
        </span>
      </div>
    </nav>
  )
}
