import { memo, VFC } from 'react'
import { XCircleIcon, UserCircleIcon } from '@heroicons/react/solid'

type Props = {
  preview: string
  resetPreview: () => void
}

const ImagePreviewMemo: VFC<Props> = ({ preview, resetPreview }) => {
  return preview ? (
    <div className="relative w-28 h-28 px-2 py-2 ">
      <XCircleIcon
        onClick={resetPreview}
        className="absolute right-2 top-2 cursor-pointer w-7 text-gray-400"
      />
      <img
        src={preview}
        alt="preview img"
        className="w-24 h-24 rounded-full shadow-md"
      />
    </div>
  ) : (
    <UserCircleIcon className="w-24 h-24 text-gray-400" />
  )
}

export const ImagePreview = memo(ImagePreviewMemo)
