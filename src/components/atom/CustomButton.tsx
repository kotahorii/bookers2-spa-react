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
    hoverColor = 'bg-blue-600',
    text,
    type = 'button',
  }) => {
    return (
      <button
        type={type}
        disabled
        className={`${color} hover:${hoverColor} shadow-md inline-flex w-full max-w-xs justify-center px-3 py-2 text-sm font-medium border border-transparent rounded-full text-gray-50 hover:bg-blue-400 focus:outline-none`}
        onClick={onClick}
      >
        {text}
      </button>
    )
  }
)
