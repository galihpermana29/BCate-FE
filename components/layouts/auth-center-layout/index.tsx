import Head from "next/head"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { ReactNode } from "react"
import useAuth from "hooks/useAuth"

function AuthCenterLayout({ children }: { children: ReactNode }) {
  const router = useRouter()
  const { authData } = useAuth()

  if (authData) {
    router.push("/design")
    return <div />
  }

  return (
    <main className="relative flex min-h-screen w-full items-center justify-center">
      <Head>
        <title>BCate</title>
      </Head>

      <Image src={"/assets/img/bg-auth-1.png"} alt="Dackground" fill className="fixed -z-20" />
      {children}
    </main>
  )
}

export default AuthCenterLayout
