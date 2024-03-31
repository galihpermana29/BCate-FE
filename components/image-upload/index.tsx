import { UploadOutlined } from "@ant-design/icons"
import { Button, FormInstance, Upload } from "antd"
import Image from "next/image"
import { useEffect, useState } from "react"

interface ImageUploadI {
  form: FormInstance<any>
  name: string
}

const ImageUpload = ({ form, name }: ImageUploadI) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const handleImageUpload = async (options: any) => {
    const { file, onSuccess, onError } = options
    const formData = new FormData()
    formData.append("file", file)

    try {
      setLoading(true)
      const formData = new FormData()
      formData.append("file", file)
    } catch (error) {
      console.log(error, "error")
      onError("Upload failed")
    } finally {
      setLoading(false)
    }
  }

  const handleRemove = () => {
    setImageUrl(null)
  }

  useEffect(() => {
    const initial = form.getFieldValue(name) ?? null

    setImageUrl(initial)
  }, [name, form])

  return (
    <div className="flex flex-col items-start">
      <Upload customRequest={handleImageUpload} showUploadList={false} accept="image/*">
        {imageUrl ? (
          <div className="h-[200px] w-full max-w-[300px]">
            <Image
              loader={() => imageUrl}
              src={imageUrl}
              alt="Uploaded"
              width={300}
              height={300}
              className="h-full w-full object-cover"
            />
          </div>
        ) : (
          <Button loading={loading} icon={<UploadOutlined />}>
            Upload Image
          </Button>
        )}
      </Upload>
      {imageUrl && (
        <Button danger onClick={handleRemove}>
          Remove
        </Button>
      )}
    </div>
  )
}

export default ImageUpload
