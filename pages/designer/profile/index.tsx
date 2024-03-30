import { EyeFilled, EyeInvisibleFilled } from "@ant-design/icons"
import { Button, Form, FormProps, Input, message, Upload, UploadProps } from "antd"
import { AuthenticationAPI } from "api/authService"
import { DesignAPI } from "api/designService"
import { LoginData, UpdateProfilePayload } from "api/response-interface"
import MainLayout from "components/layouts/main-layout"
import useAuth from "hooks/useAuth"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { fullNameFieldRules, specialityFieldRules, yearOfExperienceFieldRules } from "utils/form-rules"

type FieldType = {
  fullName: string
  profile_picture: string | null
  speciality: string
  years_experience: number
}

function DesignerProfilePage() {
  const [showPassword, setShowPassword] = useState(false)
  const [imageURL, setImageURL] = useState<string | null>(null)

  const { authData } = useAuth()

  const router = useRouter()

  const [form] = Form.useForm<FieldType>()

  const handleCancel = () => {
    form.resetFields()
    setImageURL(null)
  }

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    try {
      values.profile_picture = imageURL ?? authData?.user.profile_picture!
      values.years_experience = values.years_experience

      let payload: UpdateProfilePayload = {
        fullName: values.fullName,
        profile_picture: values.profile_picture,
        additional: {
          speciality: values.speciality,
          years_experience: values.years_experience,
        },
      }

      await AuthenticationAPI.updateProfile(authData?.token!, authData?.user.id!, payload)

      const { data } = await AuthenticationAPI.getProfileById(authData?.token!, authData?.user.id!)

      const storedProfile = {
        token: authData?.token,
        user: data,
      }

      localStorage.setItem("user-data", JSON.stringify(storedProfile))

      router.refresh()
    } catch (e) {
      form.setFields([
        {
          name: "password",
          errors: ["Incorrect Password!"],
        },
      ])
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

  const handleUploadImage = async (options: any) => {
    const { file, onError, onSuccess } = options
    let formData = new FormData()
    formData.append("image", file)

    try {
      const { data } = await DesignAPI.uploadImage(authData?.token!, formData)
      if (data) {
        setImageURL(data)
        onSuccess()
      } else {
        onError()
      }
    } catch (e) {
      onError()
    }
  }

  return (
    <>
      {authData && (
        <MainLayout>
          <Form form={form} onFinish={onFinish} className="flex w-full flex-col items-center justify-center">
            <div className="relative aspect-square w-52 overflow-hidden rounded-md bg-zinc-100">
              {authData?.user.profile_picture && !imageURL && (
                <Image src={authData.user.profile_picture} alt="Profile Picture" fill className="object-cover" />
              )}
              {imageURL && <Image src={imageURL} alt="Profile Picture" fill className="object-cover" />}
            </div>
            <Upload
              {...props}
              showUploadList={false}
              customRequest={handleUploadImage}
              className="mt-2 font-semibold text-sky-400"
            >
              <div className="flex items-center gap-2 rounded-md px-5 py-2 hover:bg-zinc-100">
                <div className="relative h-5 w-5">
                  <Image src={"/assets/img/icon-image-blue.png"} alt="Image Icon" fill />
                </div>
                <span>Change Profile Image</span>
              </div>
            </Upload>

            <div className="mt-5 w-full lg:w-3/5">
              <h1 className="mb-5 text-xl font-medium">Professional Details</h1>
              <div className="flex w-full flex-col sm:flex-row sm:gap-5">
                <div className="basis-1/2">
                  <div>
                    <label htmlFor="fullName" className="text-zinc-500">
                      Professional Name
                    </label>
                    <Form.Item<FieldType>
                      id="fullName"
                      rules={fullNameFieldRules}
                      name="fullName"
                      initialValue={authData.user.fullName}
                    >
                      <Input className="mt-1 py-2" />
                    </Form.Item>
                  </div>
                  <div>
                    <label htmlFor="years_experience" className="text-zinc-500">
                      Year of Experience
                    </label>
                    <Form.Item<FieldType>
                      id="year_experience"
                      name={"years_experience"}
                      rules={yearOfExperienceFieldRules}
                      initialValue={authData.user.additional?.years_experience}
                    >
                      <Input type="number" className="mt-1 py-2" />
                    </Form.Item>
                  </div>
                </div>
                <div className="basis-1/2">
                  <div>
                    <label htmlFor="name" className="text-zinc-500">
                      Email Address
                    </label>
                    <Form.Item>
                      <Input value={authData.user.email} disabled className="mt-1 py-2 text-zinc-800" />
                    </Form.Item>
                  </div>
                  <div>
                    <label htmlFor="speciality" className="text-zinc-500">
                      Specialty
                    </label>
                    <Form.Item<FieldType>
                      id="speciality"
                      name={"speciality"}
                      rules={specialityFieldRules}
                      initialValue={authData.user.additional?.speciality}
                    >
                      <Input.TextArea autoSize={{ minRows: 1, maxRows: 6 }} className="mt-1 py-2" />
                    </Form.Item>
                  </div>
                </div>
              </div>
              <div className="flex gap-5">
                <Form.Item className="basis-1/2">
                  <Button
                    htmlType="submit"
                    className="h-fit w-full rounded-full bg-black py-2 text-white transition-colors duration-150 hover:bg-zinc-800"
                  >
                    Save Changes
                  </Button>
                </Form.Item>
                <Button
                  onClick={handleCancel}
                  className="h-fit basis-1/2 rounded-full bg-zinc-500 py-2 text-white transition-colors duration-150 hover:bg-zinc-400"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </Form>
        </MainLayout>
      )}
    </>
  )
}

export default DesignerProfilePage
