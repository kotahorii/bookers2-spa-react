import { memo, VFC } from 'react'
import { XCircleIcon, UserCircleIcon } from '@heroicons/react/solid'
import { useAuth } from 'hooks/useAuth'

type Props = {
  onClick: () => void
}

const ImagePreviewMemo: VFC<Props> = ({ onClick }) => {
  const { preview, resetPreview } = useAuth()
  return preview ? (
    <div className="relative w-28 h-28 px-2 py-2 ">
      <XCircleIcon
        onClick={resetPreview}
        className="absolute right-2 top-2 cursor-pointer w-7 text-gray-300 hover:text-gray-400"
      />
      <div onClick={onClick} className="cursor-pointer">
        <img
          src={preview}
          alt="preview img"
          className="w-24 h-24 cursor-pointer rounded-full shadow-md"
        />
      </div>
    </div>
  ) : (
    <div onClick={onClick} className="cursor-pointer">
      <UserCircleIcon className="w-24 h-24 text-gray-400" />
    </div>
  )
}

export const ImagePreview = memo(ImagePreviewMemo)
