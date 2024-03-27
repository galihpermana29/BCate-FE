import Image from "next/image"
import Link from "next/link"
import { Design } from "api/response-interface"

function DesignCardVertical({ author, name, description, price, id, type, permission, image_uri }: Design) {
  return (
    <div className="overflow-hidden rounded-lg shadow-md">
      <div className="relative aspect-[16/9] w-full bg-zinc-100">
        {image_uri && <Image src={image_uri[0]} alt="Card Image" fill className="object-cover" />}
      </div>
      <div className="flex flex-col gap-2 p-5 font-code text-sm">
        <h3 className="text-lg font-medium">{name}</h3>
        <div className="flex items-center gap-2">
          <div className="aspect-square w-7 rounded-full bg-zinc-100">
            {author.profile_picture && (
              <Image src={author.profile_picture} alt="Card Image" fill className="object-cover" />
            )}
          </div>
          <p className="font-semibold">{author.fullName}</p>
        </div>
        <p className="line-clamp-2">{description}</p>
        <hr />
        <p>{price}</p>
        <div className="flex w-full justify-between gap-5">
          <div className="flex flex-col gap-2">
            <div className="w-fit rounded-full border border-black px-3 py-1 text-center">
              {permission === "personal_use" ? "Personal Use" : "Public Use"}
            </div>
            <div className="w-fit rounded-full border border-black px-3 py-1 text-center capitalize">{type}</div>
          </div>
          <Link
            href={`/design/${id}`}
            className="h-fit rounded-xl bg-black px-4 py-2 text-white transition-colors duration-150 hover:bg-zinc-800"
          >
            See Detail
          </Link>
        </div>
      </div>
    </div>
  )
}

export default DesignCardVertical
