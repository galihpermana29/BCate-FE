import { Rule } from "antd/es/form"

export const emailFieldRules: Rule[] = [
  {
    type: "email",
    message: "Invalid email!",
  },
  {
    required: true,
    message: "Email is required!",
  },
]

export const fullNameFieldRules: Rule[] = [
  {
    required: true,
    message: "Full name is required!",
  },
]

export const registerPasswordFieldRules: Rule[] = [
  {
    required: true,
    message: "Password is required",
  },
  {
    validator: (_, value) => {
      if (!value || value.length < 8) {
        return Promise.reject(new Error("Password must be at least 8 characters long"))
      }
      const containsLetter = /[a-zA-Z]/.test(value)
      const containsNumber = /[0-9]/.test(value)
      const containsSymbol = /[^a-zA-Z0-9\s]/.test(value)

      if (!(containsLetter && containsNumber && containsSymbol)) {
        return Promise.reject(new Error("Password must contain a mix of letters, numbers, and symbols"))
      }

      return Promise.resolve()
    },
  },
]

export const loginPasswordFieldRules: Rule[] = [
  {
    required: true,
    message: "Password is required!",
  },
]

export const yearOfExperienceFieldRules: Rule[] = [
  {
    required: true,
    message: "Year of experience is required",
  },
  {
    validator: (_, value) => {
      const containsNumber = /[0-9]/.test(value)

      if (!containsNumber) {
        return Promise.reject(new Error("Please input a number!"))
      }

      return Promise.resolve()
    },
  },
]

export const specialityFieldRules: Rule[] = [
  {
    required: true,
    message: "Speciality is required",
  },
]
