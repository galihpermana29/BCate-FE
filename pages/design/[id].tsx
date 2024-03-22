import { Button, Carousel } from "antd"
import Image from "next/image"
import MainLayout from "components/layouts/main-layout"

function DesignDetailPage() {
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

      <section className="mt-10 flex flex-col gap-10 md:flex-row">
        <div className="flex shrink-0 flex-col gap-2">
          <h1 className="text-4xl font-medium">Modern Harmony</h1>
          <div className="flex items-center gap-2">
            <h2>Designed by</h2>
            <div className="flex items-center gap-1">
              <div className="relative h-7 w-7 overflow-hidden rounded-full bg-zinc-100">
                <Image
                  src={
                    "https://images.unsplash.com/photo-1513554534405-90148855ee96?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  }
                  alt="Architect Picture"
                  fill
                  className="object-cover"
                />
              </div>
              <p className="text-xs">Zaire Calzoni</p>
            </div>
          </div>
          <Button className="m-0 h-fit w-fit bg-black px-5 py-3 text-white hover:bg-zinc-800 enabled:hover:border-black disabled:bg-zinc-300">
            Buy Design
          </Button>
        </div>
        <div className="flex w-full flex-col gap-5 text-sm">
          <div className="w-fit rounded-md border border-black p-2 font-medium">Public Mass Production</div>
          <p>
            Modern Harmony House is a luxurious house design that combines modern architectural elements with warm
            tropical touches. With an open layout, private swimming pool, and breathtaking natural views, this design
            creates a relaxed and exclusive atmosphere for residents.
          </p>
          <div>
            <h3 className="text-xl font-semibold">Spesification</h3>
            <ul className="mt-2 list-inside list-disc">
              <li>Land Area: 800 square meters</li>
              <li>Building Area: 400 square meters</li>
              <li>Number of Floors: 2</li>
            </ul>
          </div>
        </div>
      </section>
    </MainLayout>
  )
}

export default DesignDetailPage
