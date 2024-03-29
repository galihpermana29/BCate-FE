import { DeleteOutlined } from "@ant-design/icons"
import { Button, Form, FormProps, Input, message, Select, Upload, type UploadProps } from "antd"
import Image from "next/image"
import { useSearchParams } from "next/navigation"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { DesignAPI } from "api/designService"
import MainLayout from "components/layouts/main-layout"
import useAuth from "hooks/useAuth"
import { extractCloudinaryId } from "utils/function"
import { DesignPermission, DesignPurpose, DesignType } from "utils/interface_type"

const { TextArea } = Input

type FieldType = {
  name: string
  description: string
  specification: string
  type: DesignType
  permission: DesignPermission
  purpose: DesignPurpose
  certificate_uri: string | null
  image_uri: any
  price: number
  author_id: number
}

function SellPage() {
  const [certificateImageURL, setCertificateImageURL] = useState<string | null>(null)
  const [imagesURL, setImagesURL] = useState<string[]>([])

  const [form] = Form.useForm<FieldType>()

  const { authData } = useAuth()
  const router = useRouter()
  const params = useSearchParams()

  const editDesignId = params.get("edit")

  const handleUploadCertificate = async (options: any) => {
    const { file, onError, onSuccess } = options
    let formData = new FormData()
    formData.append("image", file)

    try {
      const { data } = await DesignAPI.uploadImage(authData?.token!, formData)
      if (data) {
        setCertificateImageURL(data)
        onSuccess()
      } else {
        onError()
      }
    } catch (e) {
      onError()
    }
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

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    try {
      values.certificate_uri = certificateImageURL as string
      values.image_uri = imagesURL

      if (editDesignId) {
        await DesignAPI.updateDesign(authData?.token!, parseInt(editDesignId), { ...values })
      } else {
        await DesignAPI.createDesign(authData?.token!, {
          ...values,
          author_id: authData?.user.id!,
        })
      }

      router.push("/designer/collection")
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    const fetchDesignDetail = async () => {
      try {
        const { data } = await DesignAPI.getById(editDesignId!, authData?.token!)

        setCertificateImageURL(data.certificate_uri)
        setImagesURL(data.image_uri)

        form.setFieldsValue({
          name: data.name,
          certificate_uri: data.certificate_uri,
          description: data.description,
          image_uri: data.image_uri,
          permission: data.permission,
          price: data.price,
          purpose: data.purpose,
          specification: data.specification,
          type: data.type,
        })
      } catch (e) {
        console.log(e)
      }
    }

    if (editDesignId) {
      fetchDesignDetail()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editDesignId, authData])

  return (
    <MainLayout>
      <div className="flex flex-col gap-10 md:flex-row">
        <section className="relative flex h-screen w-full basis-2/6 flex-col items-center justify-center overflow-hidden rounded-lg px-5 py-10 text-center text-white">
          <Image src={"/assets/img/bg-sell.png"} alt="Banner Image" fill className="-z-10 object-cover" />

          <h1 className="text-2xl font-bold">Sell Requested Design</h1>
          <p>Fill this form to sell your requested design</p>
        </section>
        <section className="basis-4/6">
          <Form form={form} onFinish={onFinish}>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <div>
                  <label htmlFor="name">Product Name</label>
                  <Form.Item<FieldType> name={"name"} rules={[{ required: true, message: "Product name is required" }]}>
                    <Input id="name" />
                  </Form.Item>
                </div>
                <div>
                  <label htmlFor="description">Description</label>
                  <Form.Item<FieldType>
                    name={"description"}
                    rules={[{ required: true, message: "Description is required" }]}
                  >
                    <TextArea id="description" autoSize={{ minRows: 2, maxRows: 6 }} />
                  </Form.Item>
                </div>
                <div>
                  <label htmlFor="certificate_uri" className="block">
                    Upload Certificate
                  </label>
                  <Form.Item<FieldType>
                    name={"certificate_uri"}
                    rules={[{ required: true, message: "Certificate is required" }]}
                  >
                    <Upload showUploadList={false} maxCount={1} customRequest={handleUploadCertificate} {...props}>
                      <div className="mt-2 flex w-full flex-col items-center justify-center gap-1 rounded-md border border-black p-10 px-2 text-xs">
                        <div className="relative h-5 w-5">
                          <Image src={"/assets/img/icon-image.png"} alt="Image Icon" fill />
                        </div>
                        <p>Upload an Image</p>
                      </div>
                    </Upload>
                  </Form.Item>
                  {certificateImageURL && (
                    <div className="mb-4 mt-2 flex items-center justify-between">
                      <span>{extractCloudinaryId(certificateImageURL)}.jpg</span>

                      <Button
                        onClick={() => setCertificateImageURL(null)}
                        className="h-fit border-0 py-2 transition-colors duration-150 hover:bg-zinc-100"
                      >
                        <DeleteOutlined classID="w-5 h-5" />
                      </Button>
                    </div>
                  )}
                </div>
                <Form.Item<FieldType> name={"type"} rules={[{ required: true, message: "Design type is required" }]}>
                  <Select id="type" placeholder={"Design Type"} className="placeholder:text-black">
                    <Select.Option value="building">Building</Select.Option>
                    <Select.Option value="furniture">Furniture</Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item<FieldType> name={"purpose"} rules={[{ required: true, message: "Purpose is required" }]}>
                  <Select id="purpose" placeholder={"Design Purpose"} className="placeholder:text-black">
                    <Select.Option value="requested">Requested</Select.Option>
                    <Select.Option value="design">Design</Select.Option>
                  </Select>
                </Form.Item>
              </div>
              <div>
                <div>
                  <label htmlFor="price">Price</label>
                  <Form.Item<FieldType> name={"price"} rules={[{ required: true, message: "Price is required" }]}>
                    <Input id="price" />
                  </Form.Item>
                </div>
                <div>
                  <label htmlFor="specification">Specification</label>
                  <Form.Item<FieldType>
                    name={"specification"}
                    rules={[{ required: true, message: "Spesification is required" }]}
                  >
                    <TextArea id="specification" autoSize={{ minRows: 2, maxRows: 6 }} />
                  </Form.Item>
                </div>
                <div>
                  <label htmlFor="image_uri" className="block">
                    Upload Images
                  </label>
                  <Form.Item<FieldType> name={"image_uri"} rules={[{ required: true, message: "Image is required" }]}>
                    <Upload showUploadList={false} maxCount={3} customRequest={handleUploadImages} {...props}>
                      <div className="mt-2 flex w-full flex-col items-center justify-center gap-1 rounded-md border border-black p-10 px-2 text-xs">
                        <div className="relative h-5 w-5">
                          <Image src={"/assets/img/icon-image.png"} alt="Image Icon" fill />
                        </div>
                        <p>Upload an Image</p>
                      </div>
                    </Upload>
                  </Form.Item>
                  {imagesURL.length > 0 && (
                    <ul className="mb-4 mt-2">
                      {imagesURL.map((image, index) => {
                        return (
                          <li key={index} className="flex items-center justify-between">
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
                </div>
                <Form.Item<FieldType>
                  name={"permission"}
                  rules={[{ required: true, message: "Permission is required" }]}
                >
                  <Select id="permission" placeholder={"Permission"} className="placeholder:text-black">
                    <Select.Option value="public_use">Public</Select.Option>
                    <Select.Option value="personal_use">Personal</Select.Option>
                  </Select>
                </Form.Item>
              </div>
            </div>

            <Form.Item>
              <Button
                htmlType="submit"
                className="mt-5 h-fit w-full rounded-md border border-black px-5 py-2 transition-colors duration-150 hover:bg-zinc-100"
              >
                List NFT
              </Button>
            </Form.Item>
          </Form>
        </section>
      </div>
    </MainLayout>
  )
}

export default SellPage
