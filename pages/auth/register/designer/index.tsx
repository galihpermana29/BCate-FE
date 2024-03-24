import { EyeFilled, EyeInvisibleFilled } from "@ant-design/icons"
import { Button, Form, FormProps, Input, Spin } from "antd"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { AuthenticationAPI } from "api/authService"
import AuthSideLayout from "components/layouts/auth-side-layout"
import {
  emailFieldRules,
  fullNameFieldRules,
  registerPasswordFieldRules,
  specialityFieldRules,
  yearOfExperienceFieldRules,
} from "utils/form-rules"

type FieldType = {
  fullName: string
  email: string
  yearOfExperience: number
  speciality: string
  password: string
}

function DesignerRegister() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    try {
      setIsLoading(true)

      const { email, fullName, password, speciality, yearOfExperience } = values

      await AuthenticationAPI.register({
        email: email,
        fullName: fullName,
        role: "designer",
        password: password,
        additional: {
          speciality: speciality,
          years_experience: yearOfExperience,
        },
      })

      router.push("/auth/sign-in")
    } catch (e) {
      console.log(e)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Spin spinning={isLoading}>
      <AuthSideLayout>
        <Form name="userRegiDesigner" onFinish={onFinish} className="w-full rounded-xl bg-white p-5 md:p-10 md:pt-5">
          <h1 className="mb-10 text-3xl font-medium">Sign up as a Designer</h1>

          <div className="flex flex-col">
            <div>
              <label htmlFor="fullName" className="text-zinc-500">
                Full Name
              </label>
              <Form.Item<FieldType> name="fullName" rules={fullNameFieldRules}>
                <Input id="fullName" className="mt-1 py-2" />
              </Form.Item>
            </div>

            <div>
              <label htmlFor="email" className="text-zinc-500">
                Email address
              </label>
              <Form.Item<FieldType> name="email" rules={emailFieldRules}>
                <Input id="email" className="mt-1 py-2" />
              </Form.Item>
            </div>

            <div>
              <label htmlFor="yearOfExperience" className="text-zinc-500">
                Year of experience
              </label>
              <Form.Item<FieldType> name="yearOfExperience" rules={yearOfExperienceFieldRules}>
                <Input id="yearOfExperience" className="mt-1 py-2" />
              </Form.Item>
            </div>

            <div>
              <label htmlFor="speciality" className="text-zinc-500">
                Speciality
              </label>
              <Form.Item<FieldType> name="speciality" rules={specialityFieldRules}>
                <Input.TextArea id="speciality" className="mt-1 py-2" autoSize={{ minRows: 2, maxRows: 10 }} />
              </Form.Item>
            </div>

            <div>
              <div className="flex items-center justify-between gap-2">
                <label htmlFor="password" className="text-zinc-500">
                  Password
                </label>
                <Button
                  onClick={() => setShowPassword((prev) => !prev)}
                  type="text"
                  className="flex h-fit items-center px-2 py-0 text-zinc-400"
                >
                  {showPassword && <EyeInvisibleFilled className="translate-y-[1px]" />}
                  {!showPassword && <EyeFilled className="translate-y-[1px]" />}
                  <span className="block">{showPassword ? "Hide" : "Show"}</span>
                </Button>
              </div>
              <Form.Item<FieldType> name="password" rules={registerPasswordFieldRules}>
                <Input id="password" type={showPassword ? "text" : "password"} className="mt-1 py-2" />
              </Form.Item>
            </div>
          </div>

          <div className="mt-3 flex items-center gap-5">
            <Form.Item className="m-0">
              <Button
                htmlType="submit"
                className="m-0 h-fit rounded-full bg-black px-10 py-3 text-white hover:bg-zinc-800 enabled:hover:border-black disabled:bg-zinc-300"
              >
                Sign up
              </Button>
            </Form.Item>
            <div>
              Already have an account?{" "}
              <Link href={"/auth/sign-in"} className="font-medium underline">
                Log in
              </Link>
            </div>
          </div>
        </Form>
      </AuthSideLayout>
    </Spin>
  )
}

export default DesignerRegister
