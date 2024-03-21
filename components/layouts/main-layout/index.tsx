import { ReactNode } from "react"
import Header from "components/header"
import SideNav from "components/side-nav"

function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto max-w-screen-2xl">
      <div className="flex">
        <main className="px-5 py-10 md:pl-[7.5rem]">{children}</main>
      </div>
    </div>
  )
}

export default MainLayout
