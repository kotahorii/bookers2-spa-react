import { ReactNode, VFC } from 'react'

type Props = {
  mode: 'myBooks' | 'likedBooks'
  booksMode: 'myBooks' | 'likedBooks'
  onClick: () => void
  children: ReactNode
}

export const SelectModeButton: VFC<Props> = ({
  mode,
  booksMode,
  children,
  onClick,
}) => {
  return (
    <button
      className="hover:bg-gray-200 relative p-2 rounded-lg"
      onClick={onClick}
    >
      {children}
      {booksMode === mode && (
        <div className="bg-blue-300 absolute left-0 bottom-0 mt-1 rounded-full w-full h-1"></div>
      )}
    </button>
  )
}
