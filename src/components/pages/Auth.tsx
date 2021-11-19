import { useAuth } from 'hooks/useAuth'
import { SwitchVerticalIcon } from '@heroicons/react/solid'
import { LoginForm } from 'components/organisms/auth/LoginForm'
import { SignUpForm } from 'components/organisms/auth/SignUpForm'
import { CustomButton } from 'components/atom/CustomButton'

export const Auth = () => {
  const { isLogin, toggleIsLogin, authUser } = useAuth()
  return (
    <div className="flex flex-col justify-center items-center bg-gray-100 min-h-screen w-screen">
      <form
        onSubmit={authUser}
        className="mt-8 flex shadow-xl bg-gray-50 rounded-xl px-7 py-5 items-center flex-col text-gray-600"
      >
        {isLogin ? <LoginForm /> : <SignUpForm />}
        <div className="flex flex-row mt-5 space-x-3 items-center justify-center">
          <CustomButton type="submit" text={isLogin ? 'Login' : 'Register'} />
          <SwitchVerticalIcon
            className="w-5 text-blue-500 hover:text-blue-400 cursor-pointer"
            onClick={toggleIsLogin}
          />
        </div>
      </form>
    </div>
  )
}
