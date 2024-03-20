import { Divider, Input } from "antd"
import LandingChat from "./landing-chat"
import { DataI } from "utils/chat-data"

interface ChatBoxI {
  allChat: DataI | []
  setActiveRoom: any
}

export const AllChat = ({ allChat, setActiveRoom }: ChatBoxI) => {
  return (
    <div className="min-h-[530px] w-full px-[34px] py-[24px]">
      <div className="mb-[15px] text-[20px] text-black">All Chat</div>
      <div>
        <Input placeholder="Search" className="h-[40px] rounded-[24px] border-[1px] border-[#828282] px-[60px]" />
      </div>
      <div className="py-[24px]">
        {allChat.map((data: any, idx: number) => (
          <div key={idx} onClick={() => setActiveRoom(data)}>
            <LandingChat data={data} />
            <Divider />
          </div>
        ))}
      </div>
    </div>
  )
}
