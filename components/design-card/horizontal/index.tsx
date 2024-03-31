import { Button } from "antd"
import Image from "next/image"
import Link from "next/link"
import { Design } from "api/response-interface"
import useAuth from "hooks/useAuth"
import { useRouter } from "next/navigation"

function DesignCardHorizontal({ author, description, id, type, image_uri, transactions }: Design) {
  const { authData } = useAuth()
  const router = useRouter()
  const userId: any = authData ? authData!.user!.id!.toString() : null
  const designerId: string = author.id!.toString()
  const collectionId: string = id as string

  const combinedId: string =
    parseInt(userId) > parseInt(designerId) ? userId + designerId + collectionId : designerId + userId + collectionId

  const isInTransactions = (): boolean => {
    return transactions.some((item) => item.user.id === authData?.user.id) ?? false
  }

  return (
    <div className="flex flex-col overflow-hidden rounded-md text-sm shadow md:flex-row">
      <div className="relative aspect-square w-full bg-zinc-100 md:basis-[15%]">
        {image_uri && <Image src={image_uri[0]} alt="Card Image" fill className="object-cover" />}
      </div>
      <div className="flex flex-col justify-between gap-5 p-5 md:basis-[85%] md:flex-row">
        <div className="flex w-full flex-col justify-between">
          <div className="flex flex-col gap-2">
            <div className="flex h-fit items-center gap-2">
              <div className="relative aspect-square h-fit w-7 overflow-hidden rounded-full bg-zinc-100">
                {author.profile_picture && (
                  <Image src={author.profile_picture} alt="Card Image" fill className="object-cover" />
                )}
              </div>
              <p className="font-medium">{author.fullName}</p>
            </div>
            <p className="line-clamp-2 font-code text-zinc-500">{description}</p>
          </div>
          <div>
            <hr />
            <div className="mt-3 w-fit rounded-full border border-black px-4 py-1 font-code text-xs capitalize">
              {type}
            </div>
          </div>
        </div>
        <div className="flex shrink-0 flex-col justify-center gap-2 text-sm">
          <Button
            onClick={() => router.push(`/chat?roomId=${combinedId}&userId=${designerId}&user=${author.fullName}`)}
            disabled={!isInTransactions()}
            className="h-fit border-black px-10 py-2 transition-colors duration-150 hover:bg-zinc-100"
          >
            Send Message
          </Button>
          <Link
            href={`/design/request/${id}`}
            className="rounded-md bg-black px-10 py-2 text-center text-white transition-colors duration-150 hover:bg-zinc-800"
          >
            See Detail
          </Link>
        </div>
      </div>
    </div>
  )
}

export default DesignCardHorizontal
