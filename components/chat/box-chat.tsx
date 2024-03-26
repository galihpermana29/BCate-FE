import useAuth from "hooks/useAuth"

interface BoxChatI {
  chat: any[]
}

export default function BoxChat({ chat }: BoxChatI) {
  const { authData } = useAuth()
  return (
    <>
      {chat.map((data, idx) => (
        <div key={idx}>
          <div
            className={`my-[8px] flex flex-col  ${
              data.senderId === authData?.user.id?.toString() ? "items-end" : "items-start"
            }`}
          >
            <div
              className={` ${data.senderId === authData?.user.id?.toString() ? "text-[#E2E8F0]" : "text-[#F1F7FF]"}`}
            >
              {data.senderId === authData?.user.id?.toString() ? "You" : data.from}
            </div>

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
