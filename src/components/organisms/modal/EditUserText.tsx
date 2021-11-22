import { CustomButton } from 'components/atom/CustomButton'
import { CustomInput } from 'components/atom/CustomInput'
import { CustomLabel } from 'components/atom/CustomLabel'
import { ImageInput } from 'components/molecules/ImageInput'
import { useAuth } from 'hooks/useAuth'
import { memo } from 'react'

export const EditUserText = memo(() => {
  const { authData, changeAuthData, updateUser } = useAuth()
  return (
    <form onSubmit={updateUser} className="w-72 mt-2 flex flex-col">
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
      <div className="flex flex-row w-full justify-center mb-3">
        <ImageInput />
      </div>
      <CustomButton disabled={!authData.name} type="submit" text="Update" />
    </form>
  )
})
