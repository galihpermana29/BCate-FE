import { ArrowLeftOutlined, CloseOutlined } from "@ant-design/icons"
import { Divider, Input } from "antd"
import BoxChat from "components/chat/box-chat"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { ChatData, ChatDataI, ChatI, DataI } from "utils/chat-data"

interface RoomChatI {
  activeRoom: ChatDataI
  setActiveRoom: Dispatch<SetStateAction<ChatDataI | null>>
  handleSubmitText: any
  handleEditText: (value: ChatI) => void
  typedChat: string
  setTypedChat: Dispatch<SetStateAction<string>>
  handleDeleteText: (value: ChatI) => void
  setActiveTab: Dispatch<SetStateAction<boolean | "chat" | "task">>
}

const RoomChat = ({
  activeRoom,
  setActiveRoom,
  handleSubmitText,
  typedChat,
  setTypedChat,
  handleEditText,
  handleDeleteText,
  setActiveTab,
}: RoomChatI) => {
  const [edit, setEdit] = useState<ChatI | null>(null)
  const { name, chat, total, type } = activeRoom as ChatDataI

  useEffect(() => {
    setTypedChat(edit?.text as string)
  }, [edit])

  return (
    <div className="relative h-[86vh] w-full px-[29px] py-[24px]">
      <div className="absolute inset-x-[29px] top-[24px] z-[99] bg-white">
        <div className=" flex items-center  justify-between">
          <div className="flex gap-[15px]">
            <ArrowLeftOutlined className="cursor-pointer" onClick={() => setActiveRoom(null)} />
            <div>
              <div className="text-[16px] font-bold text-[#000]">{name}</div>
            </div>
          </div>
        </div>
        <Divider className="mt-[20px]" />
      </div>

      <div className="max-h-[80vh] overflow-y-scroll pb-[50px] pr-[10px] pt-[80px]">
        <BoxChat chat={chat} setEdit={undefined} handleDeleteText={undefined} />
      </div>

      <div>
        <form onSubmit={undefined} className="absolute inset-x-[29px] bottom-[0] flex gap-[15px] bg-white pt-[10px]">
          <Input placeholder="Type..." type="chat" onChange={(e) => setTypedChat(e.target.value)} value={typedChat} />
          <button type="submit" className="rounded bg-[#2F80ED] px-[16px] py-[8px] text-white">
            Send
          </button>
        </form>
      </div>
    </div>
  )
}

export default RoomChat
