import Image from "next/image"
import { useEffect, useState } from "react"
import { DesignAPI } from "api/designService"
import { Design } from "api/response-interface"
import MainLayout from "components/layouts/main-layout"
import useAuth from "hooks/useAuth"
import TransactionCard from "components/transaction-card"

function DesignerCollectionPage() {
  const [transactions, setTransactions] = useState<Design[]>([])

  const { authData } = useAuth()

  useEffect(() => {
    const fetchCollection = async () => {
      try {
        const res = await DesignAPI.getAllTransactionsById(authData?.token!, authData?.user.id!)
        setTransactions(res.data)
      } catch (e) {
        console.log(e)
      }
    }

    if (authData) fetchCollection()
  }, [authData])

  return (
    <MainLayout>
      {authData && (
        <main className="flex flex-col-reverse justify-between gap-10 lg:flex-row">
          <section className="grow">
            <h1 className="text-4xl font-medium">My Design Collection</h1>
            <div className="mt-5 flex flex-col gap-4">
              {transactions.map((transaction) => {
                return <TransactionCard key={transaction.id} {...transaction} />
              })}
            </div>
          </section>
          <section className="relative flex h-screen w-full shrink-0 basis-2/5 flex-col items-center justify-center gap-3 overflow-hidden rounded-lg p-10 text-center text-white">
            <Image src={"/assets/img/banner-collection.png"} alt="Banner Image" fill className="-z-10 object-cover" />

            <h2 className="text-2xl font-bold">Design Collection</h2>
            <p>Welcome to Design collection showcasing the collection of designs that have been listed to sell</p>
          </section>
        </main>
      )}
    </MainLayout>
  )
}

export default DesignerCollectionPage
