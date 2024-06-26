import { Spin } from "antd"
import Head from "next/head"
import { useRouter } from "next/navigation"
import { ReactNode } from "react"
import SideNav from "components/side-nav"
import useAuth from "hooks/useAuth"
import CustomHeader from "components/header"

function MainLayout({ children, withPadding = true }: { children: ReactNode; withPadding?: boolean }) {
  const router = useRouter()
  const { authData } = useAuth()

  if (authData === null) {
    router.push("/auth/sign-in")
    return "loading"
  }

  if (authData === undefined) {
    return <Spin />
  }

  return (
    <div className="mx-auto max-w-screen-2xl">
      <Head>
        <title>BCate</title>
      </Head>

      <CustomHeader />
      <div className="flex">
        <SideNav />
        <main className={`w-full ${withPadding && "p-10 pl-5 md:pl-[7.5rem]"}`}>{children}</main>
      </div>
    </div>
  )
}

export default MainLayout
