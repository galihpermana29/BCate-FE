import { Button, Carousel } from "antd"
import Image from "next/image"
import { useState } from "react"
import DesignCardVertical from "components/design-card/vertical"
import MainLayout from "components/layouts/main-layout"
import { DesignFilter } from "utils/interface_type"

function DesignPage() {
  const [currentFilter, setCurrentFilter] = useState<DesignFilter>(null)

  const handleFilter = (filter: DesignFilter) => {
    if (currentFilter !== null && currentFilter === filter) {
      setCurrentFilter(null)
    } else {
      setCurrentFilter(filter)
    }
  }

  return (
    <MainLayout>
      <Carousel autoplay>
        {[...Array(3)].map((_, index) => {
          return (
            <div key={index} className="relative aspect-[16/7] w-full bg-zinc-100">
              <Image
                src={
                  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                }
                alt="Carouse Image"
                fill
              />
            </div>
          )
        })}
      </Carousel>

      <section className="mt-10 flex flex-col justify-between gap-10 lg:flex-row lg:items-center lg:gap-20">
        <h1 className="shrink-0 text-4xl font-medium sm:text-5xl md:text-6xl lg:text-7xl">
          Simply Elegant <span className="text-zinc-500">&</span> <br /> Minimalist.
        </h1>
        <p className="text-gray-500">
          <b className="text-black">Spectacular</b> elegance of minimalist architectural home mesmerizes.
        </p>
      </section>

      <section>
        <div className="mt-20 flex w-full flex-col items-center justify-center gap-5 md:mt-32 md:flex-row md:gap-10">
          <h2 className="text-2xl font-medium md:text-3xl">Categories</h2>
          <div className="flex w-full flex-col gap-2 font-medium sm:w-fit sm:flex-row sm:gap-5">
            <Button
              onClick={() => handleFilter("building")}
              className={`border-black px-7 ${
                currentFilter === "building" ? "bg-black text-white hover:bg-zinc-800" : "bg-white hover:bg-zinc-100"
              }`}
            >
              Building Design
            </Button>
            <Button
              onClick={() => handleFilter("furniture")}
              className={`border-black px-7 ${
                currentFilter === "furniture" ? "bg-black text-white hover:bg-zinc-800" : "bg-white hover:bg-zinc-100"
              }`}
            >
              Furniture Design
            </Button>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {[...Array(10)].map((_, index) => {
            return <DesignCardVertical key={index} />
          })}
        </div>
      </section>
    </MainLayout>
  )
}

export default DesignPage
