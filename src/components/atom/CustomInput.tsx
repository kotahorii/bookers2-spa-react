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
      className="my-3 px-3 py-1 bg-gray-600 text-gray-400 rounded-lg border border-gray-500"
      name={name}
      value={value}
      onChange={onChange}
    />
  )
}

export const CustomInput = memo(CustomInputMemo)
