import { VFC } from 'react'

type Props = {
  title: string
}

export const CustomLabel: VFC<Props> = ({ title }) => {
  return <label className="text-gray-500">{title}</label>
}
