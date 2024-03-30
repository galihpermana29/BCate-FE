import { Button, Carousel } from "antd"
import Image from "next/image"
import { useEffect, useState } from "react"
import { DesignAPI } from "api/designService"
import { Design, DesignResponse } from "api/response-interface"
import DesignCardHorizontal from "components/design-card/horizontal"
import MainLayout from "components/layouts/main-layout"
import useAuth from "hooks/useAuth"
import { DesignType } from "utils/interface_type"
import { designRequestImages } from "data/design-request-images"

function DesignRequestPage() {
  const [currentType, setCurrentType] = useState<DesignType>(null)
  const [designs, setDesigns] = useState<Design[]>([])

  const { authData } = useAuth()

  useEffect(() => {
    const getAllDesign = async () => {
      try {
        let res: DesignResponse

        if (currentType) {
          res = await DesignAPI.getAll(authData?.token ?? "", "requested", currentType)
        } else {
          res = await DesignAPI.getAll(authData?.token ?? "", "requested")
        }

        setDesigns(res.data)
      } catch (e) {
        console.log(e)
      }
    }

    if (authData) getAllDesign()
  }, [authData, currentType])

  const handleFilter = (filter: DesignType) => {
    if (currentType !== null && currentType === filter) {
      setCurrentType(null)
    } else {
      setCurrentType(filter)
    }
  }

  return (
    <>
      <MainLayout>
        <Carousel autoplay>
          {designRequestImages.map((url, index) => {
            return (
              <div key={index} className="relative aspect-[16/7] w-full bg-zinc-100">
                <Image src={url} alt="Carouse Image" fill className="object-cover" />
              </div>
            )
          })}
        </Carousel>

        <section className="mt-10 flex flex-col justify-between gap-10 lg:flex-row lg:items-center lg:gap-20">
          <h1 className="shrink-0 text-4xl font-medium sm:text-5xl md:text-6xl lg:text-7xl">
            Classic <span className="text-zinc-500">&</span> <br /> Simple.
          </h1>
          <p className="text-gray-500">
            <b className="text-black">Timeless</b> elegance meets simplicity in this classic furniture piece.
          </p>
        </section>

        <section>
          <div className="mt-20 flex w-full flex-col items-center justify-center gap-5 md:mt-32 md:flex-row md:gap-10">
            <h2 className="text-2xl font-medium md:text-3xl">Categories</h2>
            <div className="flex w-full flex-col gap-2 font-medium sm:w-fit sm:flex-row sm:gap-5">
              <Button
                onClick={() => handleFilter("building")}
                className={`border-black px-7 ${
                  currentType === "building" ? "bg-black text-white hover:bg-zinc-800" : "bg-white hover:bg-zinc-100"
                }`}
              >
                Building Design
              </Button>
              <Button
                onClick={() => handleFilter("furniture")}
                className={`border-black px-7 ${
                  currentType === "furniture" ? "bg-black text-white hover:bg-zinc-800" : "bg-white hover:bg-zinc-100"
                }`}
              >
                Furniture Design
              </Button>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-4 sm:grid-cols-2 md:grid-cols-3">
            {designs.length > 0 &&
              designs.map((design, index) => {
                return <DesignCardHorizontal key={index} {...design} />
              })}
          </div>
        </section>
      </MainLayout>
    </>
  )
}

export default DesignRequestPage
