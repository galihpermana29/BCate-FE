import { ArrowLeftOutlined } from "@ant-design/icons"
import { Divider, Form, FormInstance, Input, message } from "antd"
import { DesignAPI } from "api/designService"
import BoxChat from "components/chat/box-chat"
import { db } from "firebase-config"
import { doc, onSnapshot } from "firebase/firestore"
import useAuth from "hooks/useAuth"
import { useEffect, useState } from "react"

interface RoomChatI {
  activeRoom: any
  handleSubmitText: any
  typedChat: any
  form?: FormInstance<any>
}

const RoomChat = ({ handleSubmitText, form, activeRoom }: RoomChatI) => {
  const [messages, setMessages] = useState<any>({ messages: [] })

  const { authData } = useAuth()
  const [revisions, setRevisions] = useState<string[] | null>(null)

  const handleDownload = () => {
    const container = document.createElement("div")

    revisions?.forEach((url, index) => {
      const link = document.createElement("a")
      link.href = url
      link.target = "_blank"
      link.download = `blueprint_${index + 1}.jpg` // You can adjust the file name here
      container.appendChild(link)
    })

    document.body.appendChild(container)

    container.querySelectorAll("a").forEach((link) => {
      link.click()
    })

    document.body.removeChild(container)
  }

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", activeRoom.roomId), (doc) => {
      doc.exists() && setMessages(doc.data())
    })

    return () => {
      unSub()
    }
  }, [activeRoom.roomId])

  useEffect(() => {
    const getDesignDetail = async () => {
      try {
        const splittedId = activeRoom.roomId.substring(2)
        const res = await DesignAPI.getById(splittedId as string, authData?.token!)
        const transactions = res.data.transactions

        if (res.data.purpose === "requested") {
          transactions.forEach(({ user, revision }) => {
            if (user.id === authData?.user.id && revision) setRevisions(revision)
            else setRevisions(null)
          })
        } else {
          setRevisions([res.data.certificate_uri])
        }
      } catch (e) {
        message.error("Error while getting the data")
      }
    }
    console.log(authData, activeRoom, "???>>")
    if (authData && activeRoom.roomId) getDesignDetail()
  }, [activeRoom.roomId, authData])

  return (
    <div className="relative h-[86vh] w-full px-[29px] py-[24px]">
      <div className="absolute inset-x-[29px] top-[24px] z-[99] bg-white">
        <div className=" flex items-center  justify-between">
          <div className="flex gap-[15px]">
            <ArrowLeftOutlined className="cursor-pointer" />
            <div>
              <div className="text-[16px] font-bold text-[#000]">{activeRoom.user}</div>
            </div>
          </div>
        </div>
        <Divider className="mt-[20px]" />
      </div>

      <div className="max-h-[80vh] overflow-y-scroll pb-[50px] pr-[10px] pt-[80px]">
        <BoxChat chat={messages.messages} />
      </div>

      <div className="absolute inset-x-[29px] bottom-[0]">
        {revisions && (
          <div className="absolute bottom-[75px] flex h-[80px] w-full items-center justify-center rounded-md bg-black">
            <div className="flex flex-1 items-center justify-between px-[20px]">
              <div className="text-white">Get your blueprints</div>
              {/* <a href={revisions[0]} download={"blueprint.jpg"} target="_blank"> */}
              <button
                onClick={handleDownload}
                type="submit"
                className="rounded bg-[#FFF] px-[16px] py-[8px] text-black"
              >
                Download
              </button>
              {/* </a> */}
            </div>
          </div>
        )}
        <Form
          form={form}
          onFinish={handleSubmitText}
          className="absolute inset-x-[29px] bottom-[0] flex gap-[15px] self-stretch bg-white pt-[10px]"
        >
          <Form.Item name={"text"} className="w-full">
            <Input placeholder="Type..." type="chat" />
          </Form.Item>
          <Form.Item>
            <button type="submit" className="rounded bg-[#2F80ED] px-[16px] py-[8px] text-white">
              Send
            </button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default RoomChat
