import { ChangeEvent, VFC } from 'react'

type Props = {
  value: string
  placeholder: string
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void
}

export const CommentInput: VFC<Props> = ({ value, onChange, placeholder }) => {
  return (
    <textarea
      className=" px-3 py-2 bg-transparent rounded-lg border w-full bg-gray-200 focus:outline-none text-gray-600"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    ></textarea>
  )
}
