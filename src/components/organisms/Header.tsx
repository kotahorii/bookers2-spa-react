import { Link } from 'react-router-dom'

export const Header = () => {
  return (
    <nav className=" flex flex-row justify-between items-center px-3 w-screen h-20 text-gray-50 bg-blue-400">
      <div></div>
      <div className="text-3xl">Bookers</div>
      <div className="flex flex-row space-x-3">
        <Link
          to="/books"
          className="text-lg hover:bg-blue-500 rounded-lg px-3 py-3"
        >
          Books
        </Link>
        <Link
          to="/books"
          className="text-lg hover:bg-blue-500 rounded-lg px-3 py-3"
        >
          Users
        </Link>
        <span className="text-lg hover:bg-blue-500 rounded-lg px-3 py-3">
          Sign out
        </span>
      </div>
    </nav>
  )
}
