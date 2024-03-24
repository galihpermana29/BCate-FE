import { ArrowLeftOutlined, CloseOutlined } from "@ant-design/icons"
import { Button, Divider, Form, FormInstance, Input } from "antd"
import BoxChat from "components/chat/box-chat"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { ChatData, ChatDataI, ChatI, DataI } from "utils/chat-data"

interface RoomChatI {
  activeRoom: ChatDataI
  handleSubmitText: any
  typedChat: string
  form?: FormInstance<any>
}

const RoomChat = ({ handleSubmitText, form, activeRoom }: RoomChatI) => {
  const { name, chat, total, type } = activeRoom as ChatDataI

  return (
    <div className="relative h-[86vh] w-full px-[29px] py-[24px]">
      <div className="absolute inset-x-[29px] top-[24px] z-[99] bg-white">
        <div className=" flex items-center  justify-between">
          <div className="flex gap-[15px]">
            <ArrowLeftOutlined className="cursor-pointer" />
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
