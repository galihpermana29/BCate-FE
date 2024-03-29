import { DeleteOutlined } from "@ant-design/icons"
import { Button, Input, message, Upload, UploadProps } from "antd"
import { DesignAPI } from "api/designService"
import { Design, Transaction } from "api/response-interface"
import MainLayout from "components/layouts/main-layout"
import useAuth from "hooks/useAuth"
import Image from "next/image"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { extractCloudinaryId, formatDate } from "utils/function"

function DesignerTransactionDetailPage() {
  const [design, setDesign] = useState<Design>()
  const [transaction, setTransaction] = useState<Transaction>()
  const [imagesURL, setImagesURL] = useState<string[]>([])

  const { authData } = useAuth()
  const params = useParams()
  const router = useRouter()

  useEffect(() => {
    const fetchCollection = async () => {
      try {
        const { data } = await DesignAPI.getTransactionDetail(authData?.token!, params.id as string)
        setDesign(data)
        console.log(data)
        const transactions = data.transactions

        transactions.forEach((transaction) => {
          if (transaction.id === parseInt(params.id as string)) setTransaction(transaction)
        })
      } catch (e) {
        console.log(e)
      }
    }

    if (authData && params?.id) fetchCollection()
  }, [authData, params])

  const props: UploadProps = {
    onChange(info) {
      if (info.file.status === "done") {
        message.success(`File uploaded successfully`)
      } else if (info.file.status === "error") {
        message.error(`File upload failed.`)
      } else if (info.file.status === "uploading") {
        message.loading("Uploading file")
      }
    },
    accept: "image/*",
  }

  const handleUploadImages = async (options: any) => {
    const { file, onError, onSuccess } = options
    let formData = new FormData()
    formData.append("image", file)

    if (imagesURL.length <= 2) {
      try {
        const { data } = await DesignAPI.uploadImage(authData?.token!, formData)
        if (data) {
          setImagesURL((prev) => [...prev, data])
          onSuccess()
        } else {
          onError()
        }
      } catch (e) {
        onError()
      }
    }
  }

  const handleRevision = async () => {
    try {
      const res = await DesignAPI.updateTransaction(authData?.token!, { revision: imagesURL }, params.id as string)
      console.log(res)
    } catch (e) {
      console.log(e)
    }

    // router.refresh()
  }

  return (
    <MainLayout>
      <h1 className="mb-10 text-4xl font-medium">Transaction Detail</h1>

      <section className="mb-10 grid grid-cols-3 gap-5 text-sm">
        <div className="flex flex-col gap-4">
          <div>
            <label>Product Name</label>
            <Input disabled value={design?.name} className="text-black" />
          </div>
          <div>
            <label>Architect Name</label>
            <Input disabled value={design?.author.fullName} className="text-black" />
          </div>
          <div>
            <label>Design Type</label>
            <Input disabled value={design?.type ?? ""} className="capitalize text-black" />
          </div>
          <div>
            <label>Permission</label>
            <Input
              disabled
              value={design?.permission === "personal_use" ? "Personal Use" : "Public Use"}
              className="text-black"
            />
          </div>
          <div>
            <label>Price</label>
            <Input disabled value={design?.price} className="text-black" />
          </div>
          <div>
            <label>Purchased By</label>
            <Input disabled value={transaction?.user.fullName} className="text-black" />
          </div>
          <div>
            <label>Purchase Date</label>
            <Input disabled value={formatDate(transaction?.createdAt.toString() as string)} className="text-black" />
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div>
            <label>Description</label>
            <Input.TextArea
              autoSize={{ minRows: 2, maxRows: 6 }}
              disabled
              value={design?.description}
              className="text-black"
            />
          </div>
          <div>
            <label>Specification</label>
            <Input.TextArea
              autoSize={{ minRows: 2, maxRows: 6 }}
              disabled
              value={design?.specification}
              className="text-black"
            />
          </div>
        </div>
        {design?.purpose === "requested" && (
          <div className="flex flex-col gap-4">
            <Upload showUploadList={false} maxCount={3} customRequest={handleUploadImages} {...props}>
              <div className="mt-2 flex w-full flex-col items-center justify-center gap-1 rounded-md border border-black p-10 px-2 text-xs">
                <div className="relative h-5 w-5">
                  <Image src={"/assets/img/icon-image.png"} alt="Image Icon" fill />
                </div>
                <p>Upload an Image</p>
              </div>
            </Upload>

            {imagesURL.length > 0 && (
              <ul className="mb-4 mt-2 flex flex-col gap-1">
                {imagesURL.map((image, index) => {
                  return (
                    <li key={index} className="flex items-center justify-between rounded-md bg-zinc-100 pl-4 text-xs">
                      <span>{extractCloudinaryId(image)}.jpg</span>

                      <Button
                        onClick={() =>
                          setImagesURL((prev) =>
                            prev.filter((item, itemIndex) => {
                              return index !== itemIndex
                            })
                          )
                        }
                        className="h-fit border-0 py-2 transition-colors duration-150 hover:bg-zinc-100"
                      >
                        <DeleteOutlined classID="w-5 h-5" />
                      </Button>
                    </li>
                  )
                })}
              </ul>
            )}

            <Button
              onClick={handleRevision}
              disabled={imagesURL.length === 0}
              className="h-fit w-fit bg-black px-5 py-2 text-white transition-colors duration-150 hover:bg-zinc-800 disabled:bg-zinc-300 disabled:text-zinc-400"
            >
              Submit Revision
            </Button>
          </div>
        )}
      </section>
      <section className="grid grid-cols-3 gap-5">
        {design?.image_uri.map((uri) => {
          return (
            <div className="relative aspect-video w-full overflow-hidden rounded-md">
              <Image src={uri} alt="Design Image" fill className="object-cover" />
            </div>
          )
        })}
      </section>
    </MainLayout>
  )
}

export default DesignerTransactionDetailPage
