import { CustomInput } from 'components/atom/CustomInput'
import { CustomLabel } from 'components/atom/CustomLabel'
import { useAuth } from 'hooks/useAuth'

export const LoginForm = () => {
  const { changeAuthData, authData } = useAuth()
  return (
    <>
      <CustomLabel title="Email:" />
      <CustomInput
        name="email"
        value={authData.email}
        placeholder="email"
        onChange={changeAuthData}
      />
      <CustomLabel title="Password:" />
      <CustomInput
        name="password"
        value={authData.password}
        type="password"
        placeholder="password"
        onChange={changeAuthData}
      />
    </>
  )
}
