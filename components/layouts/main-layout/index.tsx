import { ReactNode } from "react"
import Header from "components/header"
import SideNav from "components/side-nav"

function MainLayout({ children }: { children: ReactNode }) {
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
