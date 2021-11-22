import { ImagePreview } from './ImagePreview'
import { useAuth } from 'hooks/useAuth'
import { memo, useRef } from 'react'

const ImageInputMemo = () => {
  const { imageChange } = useAuth()
  const inputRef = useRef<any>(null)

  const fileUpload = () => {
    inputRef.current.click()
  }
  return (
    <>
      <ImagePreview onClick={fileUpload} />
      <input
        hidden
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={imageChange}
      />
    </>
  )
}

export const ImageInput = memo(ImageInputMemo)
