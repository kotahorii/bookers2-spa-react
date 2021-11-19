import { memo, VFC } from 'react'

type Props = {
  onClick?: () => void
  color?: string
  hoverColor?: string
  text: string
  type?: 'button' | 'submit' | 'reset'
}

export const CustomButton: VFC<Props> = memo(
  ({
    onClick,
    color = 'bg-blue-500',
    hoverColor = 'bg-blue-400',
    text,
    type = 'button',
  }) => {
    return (
      <button
        type={type}
        className={`${color} hover:${hoverColor} inline-flex justify-center px-2 py-2 text-sm font-medium border border-transparent rounded-md text-gray-300 hover:bg-blue-400 focus:outline-none`}
        onClick={onClick}
      >
        {text}
      </button>
    )
  }
)
