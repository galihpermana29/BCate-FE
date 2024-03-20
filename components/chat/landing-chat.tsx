import Image from "next/image"
import profileBlue from "assets/blue-profile.png"
import profileWhite from "assets/gray-profile.png"
import { ChatDataI } from "utils/chat-data"
import { truncateText } from "utils/function"

interface LandingChatI {
  data: ChatDataI
}

export default function LandingChat({ data }: LandingChatI) {
  const { name, chat } = data
  return (
    <div className="flex cursor-pointer gap-[20px]">
      <div className="relative flex min-w-[70px] items-center justify-start">
        <Image src={profileBlue} alt="profile" className="absolute left-[20px] w-[40px]" />
      </div>
      <div>
        <div className="text-[16px] font-[600] text-[#4F4F4F]">{chat[chat.length - 1].from}</div>
        <div className="text-[12px] text-[#4F4F4F]">{truncateText(chat[chat.length - 1].text, 20)}</div>
      </div>
    </div>
  )
}
