import Image from "next/image"
import profileBlue from "public/assets/img/blue-profile.png"

interface LandingChatI {
  data: any
}

export default function LandingChat({ data }: LandingChatI) {
  return (
    <div className="flex cursor-pointer gap-[10px]">
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
