import { EllipsisOutlined } from "@ant-design/icons"
import { Divider, Dropdown, MenuProps } from "antd"
import { Dispatch, SetStateAction } from "react"
import { ChatI } from "utils/chat-data"

interface BoxChatI {
  chat: ChatI[]
  setEdit?: Dispatch<SetStateAction<ChatI | null>>
  handleDeleteText?: (value: ChatI) => void
}

export default function BoxChat({ chat, setEdit, handleDeleteText }: BoxChatI) {
  return (
    <>
      {chat.map((data, idx) => (
        <div key={idx}>
          <div className={`my-[8px] flex flex-col  ${data.from === "Me" ? "items-end" : "items-start"}`}>
            <div className={` ${data.from === "Me" ? "text-[#E2E8F0]" : "text-[#F1F7FF]"}`}>
              {data.from === "Me" ? "You" : data.from}
            </div>

            <div className="flex items-start gap-[10px]">
              <div
                className={`max-w-[500px] rounded-[5px] text-[14px] ${
                  data.from === "Me" ? "bg-[#E2E8F0]" : "bg-[#F1F7FF]"
                }   p-[10px] text-[#4F4F4F]`}
              >
                {data.text}
                <br />
                {data.date}
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  )
}
