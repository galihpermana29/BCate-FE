import { EyeFilled, EyeInvisibleFilled } from "@ant-design/icons"
import { Button, Form, FormProps, Input } from "antd"
import Link from "next/link"
import { useState } from "react"
import AuthSideLayout from "components/layouts/auth-side-layout"
import { emailFieldRules, fullNameFieldRules, registerPasswordFieldRules } from "utils/form-rules"

type FieldType = {
  fullName: string
  email: string
  password: string
}

const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
  console.log("Success:", values)
}

const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
  console.log("Failed:", errorInfo)
}

function UserRegister() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <AuthSideLayout>
      <Form
        name="userRegister"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        className="w-full rounded-xl bg-white p-5 md:p-10 md:pt-5"
      >
        <h1 className="mb-10 text-3xl font-medium">Sign up as a User</h1>

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
              disabled
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
  )
}

export default UserRegister
