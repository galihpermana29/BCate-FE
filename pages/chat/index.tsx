import { AllChat } from "components/chat/all-chat"
import RoomChat from "components/chat/room-chat"
import MainLayout from "components/layouts/main-layout"
import { useState } from "react"
import { ChatData, ChatDataI, DataI } from "utils/chat-data"

const UserChatRoom = () => {
  const [activeTab, setActiveTab] = useState<"chat" | "task" | boolean>(false)
  const [activeRoom, setActiveRoom] = useState<ChatDataI | null>(null)

  const [typedChat, setTypedChat] = useState<string>("")
  const [allChat, setAllChat] = useState<DataI | []>([])
  return (
    <MainLayout>
      <div className="flex">
        <div className="border-gray flex-1 border-r-[1px]">
          <AllChat allChat={ChatData} setActiveRoom={setActiveRoom} />
        </div>
        <div className="flex-[2]">
          <RoomChat
            handleEditText={() => ({})}
            activeRoom={ChatData[0]}
            setActiveRoom={setActiveRoom}
            handleSubmitText={() => ({})}
            typedChat={typedChat}
            setTypedChat={setTypedChat}
            handleDeleteText={() => ({})}
            setActiveTab={setActiveTab}
          />
        </div>
      </div>
    </MainLayout>
  )
}

export default UserChatRoom
