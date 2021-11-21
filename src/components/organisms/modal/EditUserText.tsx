import { CustomButton } from 'components/atom/CustomButton'
import { CustomInput } from 'components/atom/CustomInput'
import { CustomLabel } from 'components/atom/CustomLabel'
import { ImageInput } from 'components/molecules/ImageInput'
import { ImagePreview } from 'components/molecules/ImagePreview'
import { useAuth } from 'hooks/useAuth'

export const EditUserText = () => {
  const {
    authData,
    changeAuthData,
    imageChange,
    preview,
    resetPreview,
    updateUser,
  } = useAuth()
  return (
    <form onSubmit={updateUser} className="mt-2 flex flex-col">
      <CustomLabel title="Name:" />
      <CustomInput
        name="name"
        value={authData.name}
        placeholder="Name"
        onChange={changeAuthData}
      />
      <CustomLabel title="Introduction:" />
      <CustomInput
        name="introduction"
        value={authData.introduction}
        placeholder="Introduction"
        onChange={changeAuthData}
      />
      <div className="flex-row flex w-full items-center space-x-5">
        <ImageInput onChange={imageChange} />
        <ImagePreview preview={preview} resetPreview={resetPreview} />
      </div>
      <CustomButton disabled={!authData.name} type="submit" text="Update" />
    </form>
  )
}
