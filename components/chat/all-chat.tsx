import { Divider } from "antd"
import LandingChat from "./landing-chat"
import { useRouter } from "next/navigation"

interface ChatBoxI {
  allChat: any
  setActiveRoom: any
}

export const AllChat = ({ allChat, setActiveRoom }: ChatBoxI) => {
  const router = useRouter()
  console.log(
    allChat,
    Object.entries(allChat).sort((a: any, b: any) => b[1].date - a[1].date),
    "all chat"
  )
  return (
    <div className="min-h-[530px] w-full px-[15px]">
      <div className="mb-[15px] text-[25px] font-semibold text-black">All Chat</div>
      <div className="py-[24px]">
        {Object.entries(allChat)
          .sort((a: any, b: any) => b[1].date - a[1].date)
          .map((data: any, idx: number) => {
            return (
              <div
                key={idx}
                onClick={() => {
                  setActiveRoom({
                    roomId: data[0],
                    user: data[1].userInfo.displayName,
                    userId: data[1].userInfo.uid,
                  })

                  router.push(
                    `/chat?roomId=${data[0]}&user=${data[1].userInfo.displayName}&userId=${data[1].userInfo.uid}`
                  )
                }}
              >
                <LandingChat data={data[1]} roomId={data[0]} />
                <Divider className="my-[10px]" />
              </div>
            )
          })}
      </div>
    </div>
  )
}
