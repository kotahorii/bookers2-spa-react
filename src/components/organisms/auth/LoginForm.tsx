import { CustomInput } from 'components/atom/CustomInput'
import { useAuth } from 'hooks/useAuth'

export const LoginForm = () => {
  const { changeAuthData, authData } = useAuth()
  return (
    <>
      <label className="text-gray-400">Email:</label>
      <CustomInput
        name="email"
        value={authData.email}
        placeholder="email"
        onChange={changeAuthData}
      />
      <label className="text-gray-400">Password:</label>
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
