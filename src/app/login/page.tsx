import { AuthIconButton } from '@/components/forms/AuthIconButton'
import { BasePageLayout } from '@/components/layouts/BasePageLayout'
import { redirectAuthorizationEndpoint } from '@/services/auth/auth-service'
import { FcGoogle } from 'react-icons/fc'

const LoginPage = () => {
  return (
    <BasePageLayout>
      <div className="h-pageHeight mx-8 flex flex-col items-center justify-center lg:flex-row">
        <div className="h-[500px] w-full rounded-md bg-secondary lg:w-5/6">
          <div className="mb-8 flex flex-col items-center p-12">
            <h1 className="text-4xl font-bold">Login</h1>
          </div>
          <div className="flex flex-col items-center">
            <AuthIconButton
              icon={<FcGoogle />}
              label="Google"
              onClick={() => redirectAuthorizationEndpoint('google')}
            />
          </div>
        </div>
      </div>
    </BasePageLayout>
  )
}

export default LoginPage
