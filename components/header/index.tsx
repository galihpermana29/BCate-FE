import { MenuOutlined } from "@ant-design/icons"
import { Button, Drawer } from "antd"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { navMenus } from "data/nav-menus"

function Header() {
  const [open, setOpen] = useState(false)

  const showDrawer = () => {
    setOpen(true)
  }

  const onClose = () => {
    setOpen(false)
  }

  return (
    <header className="sticky top-0 flex h-20 shadow-lg">
      <div className="relative aspect-square h-full bg-black">
        <Image src={"/assets/img/logo.png"} alt="Logo" fill className="object-contain" />
      </div>
      <div className="flex h-full w-full items-center justify-between bg-white px-5 md:px-10">
        <h1 className="font-plaifair text-3xl font-medium">Bcate</h1>
        <div className="hidden gap-4 md:flex">
          <Button
            href="/auth/sign-in"
            type="default"
            className="m-0 h-fit rounded-lg border-black px-5 py-3 font-semibold hover:bg-zinc-100  disabled:bg-zinc-300"
          >
            Sign in
          </Button>
          <Button className="m-0 h-fit rounded-lg bg-black px-5 py-3 font-semibold text-white hover:bg-zinc-800 enabled:hover:border-black disabled:bg-zinc-300">
            Connect Wallet
          </Button>
        </div>
        <Button type="text" onClick={showDrawer} className="block p-0 md:hidden">
          <MenuOutlined className="-translate-y-1 text-2xl" />
        </Button>
        <Drawer placement="left" width={"60%"} onClose={onClose} open={open}>
          <div className="flex h-full flex-col justify-between gap-10">
            <div>
              {navMenus.map(({ path, label, image }, index) => {
                return (
                  <Link
                    key={index}
                    href={path}
                    className="flex w-full items-center gap-2 border-b-2 py-2 transition-all duration-150 hover:bg-zinc-200"
                  >
                    <div className="relative h-7 w-7">
                      <Image src={`/assets/img/icon-${image}.png`} alt={`${label} Icon`} fill />
                    </div>
                    <p className="font-code text-center text-xs">{label}</p>
                  </Link>
                )
              })}
            </div>

            <div className="flex flex-col gap-2">
              <Button
                href="/auth/sign-in"
                type="default"
                className="m-0 h-fit rounded-lg border-black px-5 py-3 font-semibold hover:bg-zinc-100  disabled:bg-zinc-300"
              >
                Sign in
              </Button>
              <Button className="m-0 h-fit rounded-lg bg-black px-5 py-3 font-semibold text-white hover:bg-zinc-800 enabled:hover:border-black disabled:bg-zinc-300">
                Connect Wallet
              </Button>
            </div>
          </div>
        </Drawer>
      </div>
    </header>
  )
}

export default Header
