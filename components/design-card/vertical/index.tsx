import Image from "next/image"
import Link from "next/link"

function DesignCardVertical() {
  return (
    <div className="overflow-hidden rounded-lg shadow-md">
      <div className="relative aspect-[16/9] w-full">
        <Image
          src={
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
          alt="Card Image"
          fill
        />
      </div>
      <div className="flex flex-col gap-2 p-5 font-code text-sm">
        <h3 className="text-lg font-medium">Modern Harmony</h3>
        <div className="flex items-center gap-2">
          <div className="aspect-square w-7 rounded-full bg-zinc-300"></div>
          <p className="font-semibold">Zaire Calzoni</p>
        </div>
        <p>Discover the perfect balance of sleek lines and comfort embodying harmony.</p>
        <hr />
        <p>$200</p>
        <div className="flex w-full justify-between gap-5">
          <div className="flex flex-col gap-2">
            <div className="w-fit rounded-full border border-black px-3 py-1 text-center">Public</div>
            <div className="w-fit rounded-full border border-black px-3 py-1 text-center">Building</div>
          </div>
          <Link
            href={"/design/1"}
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
