import useAuth from "hooks/useAuth"
import { useEffect, useRef } from "react"

interface BoxChatI {
  chat: any[]
}

export default function BoxChat({ chat }: BoxChatI) {
  const { authData } = useAuth()
  const ref: any = useRef()
  console.log(chat, "chat")
  useEffect(() => {
    if (ref.current) {
      ref.current!.scrollIntoView({
        behavior: "smooth",
      })
    }
  }, [chat])
  return (
    <>
      {chat.map((data, idx) => (
        <div key={idx} ref={ref}>
          <div
            className={`my-[8px] flex flex-col  ${
              data.senderId === authData?.user.id?.toString() ? "items-end" : "items-start"
            }`}
          >
            <div className="flex items-start gap-[10px]">
              <div
                className={`max-w-[500px] rounded-[5px] text-[14px] ${
                  data.senderId === authData?.user.id?.toString() ? "bg-[#E2E8F0]" : "bg-[#F1F7FF]"
                }   p-[10px] text-[#4F4F4F]`}
              >
                {data.text}
                <br />
                {/* {data.date} */}
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  )
}
