import { EyeFilled, EyeInvisibleFilled } from "@ant-design/icons"
import { Button, Checkbox, Form, FormProps, Input, Spin } from "antd"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { AuthenticationAPI } from "api/authService"
import AuthCenterLayout from "components/layouts/auth-center-layout"
import { emailFieldRules, loginPasswordFieldRules } from "utils/form-rules"

type FieldType = {
  email: string
  password: string
}

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()

  const [form] = Form.useForm()

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    try {
      setIsLoading(true)

      const res = await AuthenticationAPI.login(values)

      localStorage.setItem("user-data", JSON.stringify(res.data))
      router.push("/")
    } catch (e) {
      form.setFields([
        {
          name: "password",
          errors: ["Incorrect Password!"],
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Spin spinning={isLoading}>
      <AuthCenterLayout>
        <Form
          form={form}
          name="userSignIn"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          className="mx-5 flex w-full flex-col gap-5 rounded-xl bg-white p-7 pt-10 sm:w-2/3 md:mx-10 md:w-1/2 md:p-10 md:pt-14 lg:w-1/3"
        >
          <h1 className="text-3xl font-medium">Sign in</h1>

          <div className="flex flex-col">
            <div>
              <label htmlFor="email" className="text-zinc-500">
                Email or phone number
              </label>
              <Form.Item<FieldType> name="email" rules={emailFieldRules}>
                <Input id="email" className="mt-1 py-2" />
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
              <Form.Item<FieldType> name="password" rules={loginPasswordFieldRules}>
                <Input id="password" type={showPassword ? "text" : "password"} className="mt-1 py-2" />
              </Form.Item>
            </div>

            <div>
              <Form.Item>
                <Button
                  htmlType="submit"
                  className="mt-3 h-fit w-full rounded-full bg-black py-3 text-white hover:bg-zinc-800 enabled:hover:border-black disabled:bg-zinc-300"
                >
                  Sign in
                </Button>
              </Form.Item>

              <div className="-mt-2 flex h-10 items-center justify-between gap-2 text-xs">
                <Checkbox defaultChecked>Remember me</Checkbox>
                <div className="h-fit">Need help?</div>
              </div>
            </div>
          </div>

          <div className="mt-10 text-sm">
            Don&apos;t have an acount?{" "}
            <Link href={"/auth"} className="font-medium underline">
              Sign up
            </Link>
          </div>
        </Form>
      </AuthCenterLayout>
    </Spin>
  )
}

export default LoginPage
