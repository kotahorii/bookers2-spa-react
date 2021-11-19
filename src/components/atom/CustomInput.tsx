import { memo, VFC } from 'react'

type Props = {
  name: string
  value: string
  placeholder: string
  type?: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const CustomInputMemo: VFC<Props> = ({
  name,
  value,
  placeholder,
  onChange,
  type = 'text',
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="my-3 px-3 py-2 bg-gray-200 text-gray-600 rounded-md focus:bg-gray-50"
      name={name}
      value={value}
      onChange={onChange}
    />
  )
}

export const CustomInput = memo(CustomInputMemo)
