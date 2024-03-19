import Image from "next/image"
import { ReactNode } from "react"

function AuthCenter({ children }: { children: ReactNode }) {
  return (
    <main className="relative flex min-h-screen w-full items-center justify-center">
      <Image src={"/assets/img/bg-auth-1.png"} alt="Dackground" fill className="-z-20" />
      {children}
    </main>
  )
}

export default AuthCenter
