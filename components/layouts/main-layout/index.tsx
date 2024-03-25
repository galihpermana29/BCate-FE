import { ReactNode } from "react"
import Header from "components/header"
import SideNav from "components/side-nav"
import useAuth from "hooks/useAuth"
import { useRouter } from "next/navigation"
import { Spin } from "antd"

function MainLayout({ children }: { children: ReactNode }) {
  const router = useRouter()
  const { authData } = useAuth()

  if (authData === undefined) {
    router.push("/auth/sign-in")
    return "loading"
  }

  if (authData === null) {
    return <Spin />
  }

  return (
    <div className="mx-auto max-w-screen-2xl">
      <Header />
      <div className="flex">
        <SideNav />
        <main className="w-full p-10 pl-5 md:pl-[7.5rem]">{children}</main>
      </div>
    </div>
  )
}

export default MainLayout
