import { Button, Carousel } from "antd"
import Image from "next/image"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { DesignAPI } from "api/designService"
import { CreateTransactionPayload, Design } from "api/response-interface"
import MainLayout from "components/layouts/main-layout"
import useAuth from "hooks/useAuth"
import { extractCloudinaryId } from "utils/function"

function DesignRequestDetailPage() {
  const [design, setDesign] = useState<Design>()
  const [revisions, setRevisions] = useState<string[] | null>(null)

  const params = useParams()
  const router = useRouter()

  const { authData } = useAuth()

  useEffect(() => {
    const getDesignDetail = async () => {
      try {
        const res = await DesignAPI.getById(params.id as string, authData?.token!)
        setDesign(res.data)

        const transactions = res.data.transactions

        transactions.forEach(({ user, revision }) => {
          if (user.id === authData?.user.id && revision) setRevisions(revision)
        })
      } catch (e) {
        console.log(e)
      }
    }

    if (authData && params?.id) getDesignDetail()
  }, [authData, params])

  const handleTransaction = async () => {
    if (authData?.user.id && params.id && authData.token) {
      const payload: CreateTransactionPayload = {
        user_id: authData.user.id,
        design_id: parseInt(params.id as string),
      }

      await DesignAPI.createTransaction(payload, authData.token)

      router.refresh()
    }
  }

  const isInTransactions = (): boolean => {
    return design?.transactions.some((item) => item.user.id === authData?.user.id) ?? false
  }

  return (
    <>
      {design && authData && (
        <MainLayout>
          <Carousel autoplay>
            {design.image_uri.map((url, index) => {
              return (
                <div key={index} className="relative aspect-[16/7] w-full bg-zinc-100">
                  <Image src={url} alt="Carouse Image" fill className="object-cover" />
                </div>
              )
            })}
          </Carousel>

          <section className="mt-10 flex flex-col gap-10 md:flex-row">
            <div className="flex shrink-0 basis-1/4  flex-col gap-2">
              <div className="flex gap-3">
                <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-zinc-100">
                  {design.author.profile_picture && (
                    <Image src={design.author.profile_picture} alt="Architect Picture" fill className="object-cover" />
                  )}
                </div>
                <div>
                  <h1 className="text-4xl font-medium">{design.author.fullName}</h1>

                  <div className="mt-2 w-fit rounded-full border border-black px-4 py-1 font-code text-xs capitalize">
                    {design.type}
                  </div>
                </div>
              </div>

              {!isInTransactions() && (
                <Button
                  onClick={handleTransaction}
                  className="m-0 mt-5 h-fit w-fit bg-black px-5 py-3 text-white hover:bg-zinc-800 enabled:hover:border-black disabled:bg-zinc-300"
                >
                  Buy Design
                </Button>
              )}
              {isInTransactions() && (
                <Link
                  href={`/chat/${design.author.id}`}
                  className="m-0 mt-5 h-fit w-fit rounded-md bg-black px-5 py-3 text-sm text-white hover:bg-zinc-800 enabled:hover:border-black disabled:bg-zinc-300"
                >
                  Ask The Designer
                </Link>
              )}
            </div>
            <div className="flex w-full basis-3/4 flex-col gap-5 text-sm">
              <p>{design.description}</p>
              {revisions && (
                <div className="flex flex-col gap-5">
                  <h3 className="text-xl font-semibold">Requested Design</h3>
                  <div className="flex flex-col gap-2">
                    {revisions.map((uri) => {
                      return (
                        <Link href={uri} download target={"_blank"} className="underline">
                          {extractCloudinaryId(uri)}.jpg
                        </Link>
                      )
                    })}
                  </div>
                </div>
              )}
              <div className="flex flex-col gap-5">
                <h3 className="text-xl font-semibold">Professional details</h3>
                <div className="flex flex-col gap-5 md:flex-row md:gap-20">
                  <div className="flex flex-col gap-5">
                    <div>
                      <h4 className="font-semibold">Professional Name</h4>
                      <p>{design.author.fullName}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold">Professional Experience</h4>
                      <p>{design.author.additional?.years_experience}</p>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold">Specialty</h4>
                    <p>{design.author.additional?.speciality}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </MainLayout>
      )}
    </>
  )
}

export default DesignRequestDetailPage
