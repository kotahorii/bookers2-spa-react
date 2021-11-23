import { ChangeEvent, memo, VFC } from 'react'

type Props = {
  value: string
  placeholder: string
  name?: string
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void
}

export const CustomArea: VFC<Props> = memo(
  ({ value, onChange, placeholder, name }) => {
    return (
      <textarea
        className=" px-3 py-2 bg-transparent rounded-lg border md:w-full w-72 bg-gray-200 focus:outline-none text-gray-600"
        value={value}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
      ></textarea>
    )
  }
)
