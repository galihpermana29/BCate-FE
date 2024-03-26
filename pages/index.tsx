import { Carousel } from "antd"
import Image from "next/image"
import MainLayout from "components/layouts/main-layout"

export default function Web() {
  /**
   * By the time, we can only just called the useWalletContext
   * in components that we want to use the value for
   */
  // const { connect, connectors, disconnect, isConnected, address, name, chain, accountBalance, chains, switchNetwork } =
  //   useWalletContext()
  // const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  return (
    <MainLayout withPadding={false}>
      <Carousel dotPosition={"right"} className="overflow-hidden">
        <section className="relative h-[89vh] w-full bg-zinc-100">
          <Image src={"/assets/img/bg-home-1.png"} alt="Home Background" fill className="object-cover" />

          <div className="absolute bottom-0 left-1/2">
            <div className="relative -left-1/2 rounded-t-md bg-white p-5 text-center">
              <h1 className="text-2xl font-bold">Welcome to Bcate</h1>
              <p className="mt-2 text-lg">
                Welcome to Bcate Get a license to design furniture <br /> and building blueprints!
              </p>
            </div>
          </div>
        </section>
        <section className="relative h-[89vh] w-full bg-zinc-100">
          <Image src={"/assets/img/bg-home-2.png"} alt="Home Background" fill className="object-cover brightness-50" />

          <div className="absolute z-10 flex flex-col gap-7 p-10 pl-5 text-white md:pl-[7.5rem]">
            <h1 className="text-3xl font-medium">How BCate Works</h1>

            <div>
              <h2 className="mb-4 text-xl font-medium">How user buy design on BCate</h2>
              <div className="flex gap-5 text-center text-xs">
                <div className="relative h-10 w-10">
                  <Image
                    src={"/assets/img/icon-profile-white.png"}
                    fill
                    alt="Arrow"
                    className="object-cover object-right"
                  />
                </div>
                <div className="w-56 translate-y-3">
                  <div className="relative mb-2 h-4 w-full">
                    <Image src={"/assets/img/arrow.png"} fill alt="Arrow" className="object-cover object-right" />
                  </div>
                  <p>User buy a design on BCate as NFT, User completes purchase transaction for desired design.</p>
                </div>
                <div className="relative h-10 w-10">
                  <Image
                    src={"/assets/img/icon-blockchain.png"}
                    fill
                    alt="Arrow"
                    className="object-cover object-right"
                  />
                </div>
                <div className="w-56 translate-y-3">
                  <div className="relative mb-2 h-4 w-full">
                    <Image src={"/assets/img/arrow.png"} fill alt="Arrow" className="object-cover object-right" />
                  </div>
                  <p>
                    Users can find purchased designs on the &quot;My Collection&quot; page to view design details and
                    blueprints of purchased designs.
                  </p>
                </div>
                <div className="relative h-10 w-10">
                  <Image
                    src={"/assets/img/icon-blueprint-white.png"}
                    fill
                    alt="Arrow"
                    className="object-cover object-right"
                  />
                </div>
              </div>
            </div>

            <div>
              <h2 className="mb-4 text-xl font-medium">How user request design on BCate</h2>
              <div className="flex gap-5 text-center text-xs">
                <div className="relative h-10 w-10">
                  <Image
                    src={"/assets/img/icon-profile-white.png"}
                    fill
                    alt="Arrow"
                    className="object-cover object-right"
                  />
                </div>
                <div className="w-52 translate-y-3">
                  <div className="relative mb-2 h-4 w-full">
                    <Image src={"/assets/img/arrow.png"} fill alt="Arrow" className="object-cover object-right" />
                  </div>
                  <p>
                    User initiates a chat with the designer to discuss design, user and designer reach an agreement
                    regarding the architectural design request.
                  </p>
                </div>
                <div className="relative h-10 w-10">
                  <Image
                    src={"/assets/img/icon-chat-white.png"}
                    fill
                    alt="Arrow"
                    className="object-cover object-right"
                  />
                </div>
                <div className="w-52 translate-y-3">
                  <div className="relative mb-2 h-4 w-full">
                    <Image src={"/assets/img/arrow.png"} fill alt="Arrow" className="object-cover object-right" />
                  </div>
                  <p>
                    The designer lists the user&apos;s requested design as a private design, and the user purchases the
                    private design in the request section (but the user must purchase a blank nft to access their
                    requested design).
                  </p>
                </div>
                <div className="relative h-10 w-10">
                  <Image
                    src={"/assets/img/icon-blockchain.png"}
                    fill
                    alt="Arrow"
                    className="object-cover object-right"
                  />
                </div>
                <div className="w-52 translate-y-3">
                  <div className="relative mb-2 h-4 w-full">
                    <Image src={"/assets/img/arrow.png"} fill alt="Arrow" className="object-cover object-right" />
                  </div>
                  <p>
                    Users can find purchased request designs on the &apos;My Collections&apos; page to view design
                    details and gain access to the “order page” to view chats with designers and view blueprints of
                    request designs.
                  </p>
                </div>
                <div className="relative h-10 w-10">
                  <Image
                    src={"/assets/img/icon-blueprint-white.png"}
                    fill
                    alt="Arrow"
                    className="object-cover object-right"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </Carousel>
    </MainLayout>
  )
}
