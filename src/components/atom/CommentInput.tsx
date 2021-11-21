import { VFC } from 'react'

type Props = {
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const CommentInput: VFC<Props> = ({ value, onChange }) => {
  return (
    <input
      className="my-3 px-3 py-2 focus:ring-blue-400 bg-gray-200 text-gray-600 rounded-md focus:bg-gray-50"
      value={value}
      onChange={onChange}
    />
  )
}
