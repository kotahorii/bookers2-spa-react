import { CustomInput } from 'components/atom/CustomInput'
import { ImageInput } from 'components/molecules/ImageInput'
import { ImagePreview } from 'components/molecules/ImagePreview'
import { useAuth } from 'hooks/useAuth'

export const SignUpForm = () => {
  const { authData, changeAuthData, imageChange, preview, resetPreview } =
    useAuth()
  return (
    <div className="flex md:flex-row flex-col items-start md:space-x-5">
      <div className="flex flex-col">
        <label className="text-gray-400">Name:</label>
        <CustomInput
          name="name"
          value={authData.name}
          placeholder="name"
          onChange={changeAuthData}
        />
        <label className="text-gray-400">Email:</label>
        <CustomInput
          name="email"
          value={authData.email}
          placeholder="email"
          onChange={changeAuthData}
        />
      </div>
      <div className="flex flex-col">
        <label className="text-gray-400">Password:</label>
        <CustomInput
          name="password"
          value={authData.password}
          placeholder="password"
          type="password"
          onChange={changeAuthData}
        />
        <label className="text-gray-400">PasswordConfirmation:</label>
        <CustomInput
          name="passwordConfirmation"
          value={authData.passwordConfirmation}
          placeholder="password"
          type="password"
          onChange={changeAuthData}
        />
      </div>
      <div className="flex flex-col space-y-3">
        <CustomInput
          name="introduction"
          value={authData.introduction}
          placeholder="introduction"
          onChange={changeAuthData}
        />
        <div className="flex flex-row justify-center space-x-3">
          <ImageInput onChange={imageChange} />
          <ImagePreview preview={preview} resetPreview={resetPreview} />
        </div>
      </div>
    </div>
  )
}
