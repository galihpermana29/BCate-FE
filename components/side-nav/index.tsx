import Image from "next/image"
import Link from "next/link"
import { designerNavMenus, userNavMenus } from "data/nav-menus"
import useAuth from "hooks/useAuth"

function SideNav() {
  const { authData } = useAuth()

  return (
    <nav className="fixed top-20 z-20 hidden h-screen w-20 flex-col p-2 pt-10 shadow-lg md:flex">
      {authData &&
        authData.user.role === "user" &&
        userNavMenus.map(({ path, label, image }, index) => {
          return (
            <Link
              key={index}
              href={path}
              className="flex w-full flex-col items-center gap-2 border-b-2 py-2 transition-all duration-150 hover:bg-zinc-200"
            >
              <div className="relative h-7 w-7">
                <Image src={`/assets/img/icon-${image}.png`} alt={`${label} Icon`} fill />
              </div>
              <p className="text-center font-code text-xs">{label}</p>
            </Link>
          )
        })}
      {authData &&
        authData.user.role === "designer" &&
        designerNavMenus.map(({ path, label, image }, index) => {
          return (
            <Link
              key={index}
              href={path}
              className="flex w-full flex-col items-center gap-2 border-b-2 py-2 transition-all duration-150 hover:bg-zinc-200"
            >
              <div className="relative h-7 w-7">
                <Image src={`/assets/img/icon-${image}.png`} alt={`${label} Icon`} fill />
              </div>
              <p className="text-center font-code text-xs">{label}</p>
            </Link>
          )
        })}
    </nav>
  )
}

export default SideNav
