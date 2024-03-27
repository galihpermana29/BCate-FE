import { Button, Carousel } from "antd"
import Image from "next/image"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { DesignAPI } from "api/designService"
import { CreateTransactionPayload, Design } from "api/response-interface"
import MainLayout from "components/layouts/main-layout"
import useAuth from "hooks/useAuth"

import { Timestamp, arrayUnion, doc, getDoc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore"

import { db } from "firebase-config"
import { v4 as uuidv4 } from "uuid"

function DesignDetailPage() {
  const [design, setDesign] = useState<Design>()

  const params = useParams()
  const router = useRouter()

  const { authData } = useAuth()

  useEffect(() => {
    const getDesignDetail = async () => {
      try {
        const res = await DesignAPI.getById(params.id as string, authData?.token!)
        setDesign(res.data)
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
      console.log(payload, "payload")
      await DesignAPI.createTransaction(payload, authData.token)

      const userId: string = authData.user.id.toString()
      const designerId: string = params.id as string
      const collectionId: string = params.id as string

      const combinedId: string =
        parseInt(userId) > parseInt(designerId)
          ? userId + designerId + collectionId
          : designerId + userId + collectionId

      const res = await getDoc(doc(db, "chats", combinedId))

      if (!res.exists()) {
        await setDoc(doc(db, "chats", combinedId), {
          messages: arrayUnion({
            id: uuidv4(),
            text: `Helo ${design?.author.fullName}, I already checkout your design!`,
            senderId: authData.user.id.toString(),
            date: Timestamp.now(),
          }),
        })

        const currentUserExist = await getDoc(doc(db, "userChats", userId))
        const desginerExist = await getDoc(doc(db, "userChats", designerId))
        if (!currentUserExist.exists()) {
          await setDoc(doc(db, "userChats", userId), {})
        }

        if (!desginerExist.exists()) {
          await setDoc(doc(db, "userChats", designerId), {})
        }

        await updateDoc(doc(db, "userChats", userId), {
          [combinedId + ".userInfo"]: {
            uid: designerId,
            displayName: design?.author.fullName,
            collection: design?.name,
          },
          [combinedId + ".date"]: serverTimestamp(),
          [combinedId + ".lastMessage"]: {
            text: `Helo ${design?.author.fullName}, I already checkout your design!`,
          },
        })

        await updateDoc(doc(db, "userChats", designerId), {
          [combinedId + ".userInfo"]: {
            uid: userId,
            displayName: authData.user.fullName,
            collection: design?.name,
          },
          [combinedId + ".date"]: serverTimestamp(),
        })
      }

      router.refresh()
    }
  }

  const isInTransactions = (): boolean => {
    return design?.transactions.some((item) => item.user_id === authData?.user.id) ?? false
  }

  console.log(design?.transactions)

  return (
    <>
      {design && (
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
            <div className="flex shrink-0 flex-col gap-2">
              <h1 className="text-4xl font-medium">{design.name}</h1>
              <div className="flex items-center gap-2">
                <h2>Designed by</h2>
                <div className="flex items-center gap-1">
                  <div className="relative h-7 w-7 overflow-hidden rounded-full bg-zinc-100">
                    {design.author.profile_picture && (
                      <Image
                        src={design.author.profile_picture}
                        alt="Architect Picture"
                        fill
                        className="object-cover"
                      />
                    )}
                  </div>
                  <p className="text-xs">{design.author.fullName}</p>
                </div>
              </div>
              {!isInTransactions() && (
                <Button
                  onClick={handleTransaction}
                  className="m-0 h-fit w-fit bg-black px-5 py-3 text-white hover:bg-zinc-800 enabled:hover:border-black disabled:bg-zinc-300"
                >
                  Buy Design
                </Button>
              )}
              {isInTransactions() && (
                <Link
                  href={"/chat"}
                  className="m-0 h-fit w-fit rounded-md bg-black px-5 py-3 text-sm text-white hover:bg-zinc-800 enabled:hover:border-black disabled:bg-zinc-300"
                >
                  Ask The Designer
                </Link>
              )}
            </div>
            <div className="flex w-full flex-col gap-5 text-sm">
              <div className="w-fit rounded-md border border-black p-2 font-medium">Public Mass Production</div>
              <p>{design.description}</p>
              <div>
                <h3 className="text-xl font-semibold">Spesification</h3>
                <p>{design.specification}</p>
              </div>
            </div>
          </section>
        </MainLayout>
      )}
    </>
  )
}

export default DesignDetailPage
