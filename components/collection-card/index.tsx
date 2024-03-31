import Image from "next/image"
import Link from "next/link"
import { Design } from "api/response-interface"
import useAuth from "hooks/useAuth"

function CollectionCard({ image_uri, name, description, author, purpose, id }: Design) {
  const { authData } = useAuth()

  const userId: any = authData ? authData!.user!.id!.toString() : null
  const designerId: string = author.id!.toString()
  const collectionId: string = id as string

  const combinedId: string =
    parseInt(userId) > parseInt(designerId) ? userId + designerId + collectionId : designerId + userId + collectionId

  return (
    <div className="flex w-full flex-col gap-5 rounded-lg p-5 font-code text-xs shadow-md md:flex-row">
      <div className="relative aspect-square h-fit w-full shrink-0 basis-1/5 overflow-hidden rounded-md bg-zinc-100">
        <Image src={image_uri[0]} alt="Design Image" fill className="object-cover" />
      </div>
      <div className="flex flex-col justify-between">
        <div>
          {authData?.user.role === "user" && (
            <p className="text-zinc-500">
              Designed by <span className="text-black">{author.fullName}</span>
            </p>
          )}
          <h3 className="text-base font-medium">{name}</h3>
          <p className="line-clamp-2">{description}</p>
        </div>
        <div className="mt-4 flex gap-3">
          {purpose === "requested" && (
            <div className="rounded-full border border-black px-2 py-1">Design by Request</div>
          )}
          <Link
            href={
              authData?.user.role === "user"
                ? `/chat?roomId=${combinedId}&userId=${designerId}&user=${author.fullName}`
                : `/designer/sell?edit=${id}`
            }
            className="rounded-full bg-black px-4 py-1 text-white hover:bg-zinc-800"
          >
            {authData?.user.role === "designer" ? "Edit" : "Order Page"}
          </Link>
        </div>
      </div>
    </div>
  )
}

export default CollectionCard
