import { CustomInput } from 'components/atom/CustomInput'
import { CustomLabel } from 'components/atom/CustomLabel'
import { ImageInput } from 'components/molecules/ImageInput'
import { useAuth } from 'hooks/useAuth'
import { memo } from 'react'

export const SignUpForm = memo(() => {
  const { authData, changeAuthData } = useAuth()
  return (
    <div className="flex md:flex-row flex-col items-start md:space-x-5">
      <div className="flex flex-col">
        <CustomLabel title="Name:" />
        <CustomInput
          name="name"
          value={authData.name}
          placeholder="name"
          onChange={changeAuthData}
        />
        <CustomLabel title="Email:" />
        <CustomInput
          name="email"
          value={authData.email}
          placeholder="email"
          onChange={changeAuthData}
        />
      </div>
      <div className="flex flex-col">
        <CustomLabel title="Password:" />
        <CustomInput
          name="password"
          value={authData.password}
          placeholder="password"
          type="password"
          onChange={changeAuthData}
        />
        <CustomLabel title="Password confirmation:" />
        <CustomInput
          name="passwordConfirmation"
          value={authData.passwordConfirmation}
          placeholder="password"
          type="password"
          onChange={changeAuthData}
        />
      </div>
      <div className="flex flex-col space-y-3">
        <CustomLabel title="Introduction:" />
        <CustomInput
          name="introduction"
          value={authData.introduction}
          placeholder="introduction"
          onChange={changeAuthData}
        />
        <div className="flex flex-row justify-center space-x-3">
          <ImageInput />
        </div>
      </div>
    </div>
  )
})
