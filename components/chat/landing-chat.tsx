import Image from "next/image"
import { useSearchParams } from "next/navigation"
import profileBlue from "public/assets/img/blue-profile.png"

interface LandingChatI {
  data: any
  roomId: string
}

export default function LandingChat({ data, roomId }: LandingChatI) {
  const activeRoomId = useSearchParams().get("roomId")

  return (
    <div
      className={`flex cursor-pointer gap-[10px] px-[10px] py-[15px] transition-all duration-500 hover:bg-slate-100 ${
        activeRoomId === roomId ? "bg-slate-100" : "bg-white"
      }`}
    >
      <div className="relative flex min-w-[70px] items-center justify-start">
        <Image src={profileBlue} alt="profile" className="absolute left-[20px] w-[40px]" />
      </div>
      <div>
        <div className="text-[16px] font-[600] capitalize text-[#4F4F4F]">
          {data?.userInfo.displayName} - {`${data?.userInfo.collection}`}
        </div>
        <div className="text-[12px] text-[#4F4F4F]">{data?.lastMessage?.text}</div>
      </div>
    </div>
  )
}
