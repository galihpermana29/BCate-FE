import { Form } from "antd"
import { AllChat } from "components/chat/all-chat"
import RoomChat from "components/chat/room-chat"
import MainLayout from "components/layouts/main-layout"
import { db } from "firebase-config"
import { Timestamp, arrayUnion, doc, onSnapshot, serverTimestamp, updateDoc } from "firebase/firestore"
import useAuth from "hooks/useAuth"
import { useEffect, useState } from "react"
import { v4 as uuidv4 } from "uuid"

const UserChatRoom = () => {
  const [activeTab, setActiveTab] = useState<"chat" | "task" | boolean>(false)
  const [activeRoom, setActiveRoom] = useState<any>(null)

  const [typedChat, setTypedChat] = useState<string>("")
  const [allChat, setAllChat] = useState<any>([])

  const [form] = Form.useForm()

  const { authData } = useAuth()

  const handleSubmitChat = async (value: any) => {
    const userId: string = authData!.user.id!.toString()
    await updateDoc(doc(db, "chats", activeRoom.roomId), {
      messages: arrayUnion({
        id: uuidv4(),
        text: value.text,
        senderId: userId,
        date: Timestamp.now(),
      }),
    })

    await updateDoc(doc(db, "userChats", userId), {
      [activeRoom.roomId + ".lastMessage"]: {
        text: value.text,
      },
      [activeRoom.roomId + ".date"]: serverTimestamp(),
    })
  }

  useEffect(() => {
    const getChats = () => {
      const userId: string = authData!.user.id!.toString()
      const unsub = onSnapshot(doc(db, "userChats", userId), (doc) => {
        setAllChat(doc.data())
      })

      return () => {
        unsub()
      }
    }

    authData && getChats()
  }, [authData?.user.id])

  return (
    <MainLayout>
      <div className="flex">
        <div className="border-gray flex-1 border-r-[1px]">
          <AllChat allChat={allChat} setActiveRoom={setActiveRoom} />
        </div>
        <div className="flex-[2]">
          {activeRoom && (
            <RoomChat activeRoom={activeRoom} handleSubmitText={handleSubmitChat} typedChat={typedChat} form={form} />
          )}
        </div>
      </div>
    </MainLayout>
  )
}

export default UserChatRoom
