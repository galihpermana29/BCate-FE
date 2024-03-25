import Image from "next/image"
import { useEffect, useState } from "react"
import { DesignAPI } from "api/designService"
import { Design } from "api/response-interface"
import CollectionCard from "components/collection-card"
import MainLayout from "components/layouts/main-layout"
import useAuth from "hooks/useAuth"

const bannerContent = {
  designer: {
    title: "Design Collection",
    desc: "Welcome to Design collection showcasing the collection of designs that have been listed to sell",
  },
  user: {
    title: "My Collection",
    desc: "Welcome to my collection showcasing the collection of designs that have been purchased",
  },
}

function CollectionPage() {
  const [collections, setCollections] = useState<Design[]>([])

  const { authData } = useAuth()

  useEffect(() => {
    const fetchCollection = async () => {
      try {
        const res = await DesignAPI.getCollection(authData?.token!, authData?.user.role!, authData?.user.id!)
        setCollections(res.data)
      } catch (e) {
        console.log(e)
      }
    }

    if (authData) fetchCollection()
  }, [authData])

  return (
    <MainLayout>
      {authData && (
        <main className="flex flex-col-reverse justify-between gap-10 lg:flex-row">
          <section className="grow">
            <h1 className="text-4xl font-medium">My {authData.user.role === "designer" && "Design"} Collection</h1>
            <div className="mt-5 flex flex-col gap-4">
              {collections.map((collection) => {
                return <CollectionCard key={collection.id} {...collection} />
              })}
            </div>
          </section>
          <section className="relative flex h-screen w-full basis-2/5 flex-col items-center justify-center gap-3 overflow-hidden rounded-lg p-10 text-center text-white">
            <Image src={"/assets/img/banner-collection.png"} alt="Banner Image" fill className="-z-10 object-cover" />

            <h2 className="text-2xl font-bold">{bannerContent[authData.user.role].title}</h2>
            <p>{bannerContent[authData.user.role].desc}</p>
          </section>
        </main>
      )}
    </MainLayout>
  )
}

export default CollectionPage