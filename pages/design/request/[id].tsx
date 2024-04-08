import { Button, Carousel, message } from "antd"
import Image from "next/image"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { DesignAPI } from "api/designService"
import { CreateTransactionPayload, Design } from "api/response-interface"
import MainLayout from "components/layouts/main-layout"
import useAuth from "hooks/useAuth"
import { extractCloudinaryId } from "utils/function"
import { Timestamp, arrayUnion, doc, getDoc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore"

import { db } from "firebase-config"
import { v4 as uuidv4 } from "uuid"
import { ethers } from "ethers"

import { useAuthWeb3 } from "context/web3AuthContext"
import { contractAddress } from "utils/web3/address"
import contractAbi from "utils/web3/abi.json"

function DesignRequestDetailPage() {
  const [design, setDesign] = useState<Design>()
  const [revisions, setRevisions] = useState<string[] | null>(null)

  const params = useParams()
  const router = useRouter()

  const { authData } = useAuth()
  const { ethersProvider } = useAuthWeb3()

  const userId: any = authData ? authData!.user!.id!.toString() : null
  const designerId: any = design ? design!.author.id!.toString() : null

  const collectionId: any = params ? (params.id as string) : null

  const combinedId: string =
    parseInt(userId) > parseInt(designerId) ? userId + designerId + collectionId : designerId + userId + collectionId

  const toWei = (num: number) => ethers.utils.parseEther(num.toString())

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

      try {
        const signer = await ethersProvider.getSigner()
        const contracts = new ethers.Contract(contractAddress, contractAbi, signer)
        const transaction = await contracts.purchaseItem(params.id)
        await transaction.wait()
        message.success(`Transaction successful: ${transaction.hash}`)

        await DesignAPI.createTransaction(payload, authData.token)
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
            [combinedId + ".lastMessage"]: {
              text: `Helo ${design?.author.fullName}, I already checkout your design!`,
            },
          })
        }
      } catch (error) {
        message.error("Transaction Fail")
        return
      }

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
                  href={`/chat?roomId=${combinedId}&userId=${designerId}&user=${design.author.fullName}`}
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
