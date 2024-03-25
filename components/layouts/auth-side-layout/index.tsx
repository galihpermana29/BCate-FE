import useAuth from "hooks/useAuth"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { ReactNode } from "react"

function AuthSideLayout({ children }: { children: ReactNode }) {
  const router = useRouter()
  const { authData } = useAuth()

  if (authData) {
    router.push("/design")
    return <div />
  }

  return (
    <main className="relative mx-auto flex w-full max-w-screen-2xl flex-col gap-5 px-5 py-10 sm:p-10 md:flex-row md:gap-20 md:p-20">
      <Image src={"/assets/img/bg-auth-2.png"} alt="Dackground" fill className="fixed -z-20 object-cover" />
      <section className="basis-2/5 text-white md:mt-20">
        <h2 className="text-4xl font-semibold md:mb-3">Join with BCate</h2>
        <p className="text-xl">We provide all kinds of furniture design and building architecture</p>
      </section>

      <section className="basis-3/5">{children}</section>
    </main>
  )
}

export default AuthSideLayout
