import { Form } from "antd"
import { AllChat } from "components/chat/all-chat"
import RoomChat from "components/chat/room-chat"
import MainLayout from "components/layouts/main-layout"
import { db } from "firebase-config"
import { Timestamp, arrayUnion, doc, onSnapshot, serverTimestamp, updateDoc } from "firebase/firestore"
import useAuth from "hooks/useAuth"
import Link from "next/link"
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

    await updateDoc(doc(db, "userChats", activeRoom.userId), {
      [activeRoom.roomId + ".lastMessage"]: {
        text: value.text,
      },
      [activeRoom.roomId + ".date"]: serverTimestamp(),
    })

    form.resetFields()
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
      {allChat && (
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
      )}

      {!allChat && (
        <div className="flex h-screen flex-col items-center justify-center">
          <h1 className="font-regular mb-[10px] text-[18px]">Currently you havent any conversation</h1>
          <Link href={"/designer/sell"} className="rounded-lg bg-black px-[10px] py-[15px] text-white hover:text-white">
            <h1 suppressHydrationWarning className="text-[13px]">
              Sell Design
            </h1>
          </Link>
        </div>
      )}
    </MainLayout>
  )
}

export default UserChatRoom
