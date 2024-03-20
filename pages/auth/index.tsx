import Link from "next/link"
import AuthCenterLayout from "components/layouts/auth-center-layout"

function AuthPage() {
  return (
    <AuthCenterLayout>
      <div className="mx-10 w-full rounded-xl bg-white px-5 py-10 sm:w-2/3 md:w-1/2 md:px-10 md:py-14 lg:w-1/3">
        <h1 className="text-2xl font-medium">Choose Your Role</h1>
        <div className="mt-7 flex flex-col items-center gap-4">
          <Link
            href={"/auth/register/designer"}
            className="min-w-[60%] rounded-lg border-[1.5px] border-black px-5 py-2 text-center font-medium transition-all duration-150 hover:bg-gray-100"
          >
            Designer
          </Link>
          <Link
            href={"/auth/register/user"}
            className="min-w-[60%] rounded-lg border-[1.5px] border-black px-5 py-2 text-center font-medium transition-all duration-150 hover:bg-gray-100"
          >
            User
          </Link>
        </div>
      </div>
    </AuthCenterLayout>
  )
}

export default AuthPage
