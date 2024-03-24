// structure of response/payload

/**
 * TODO: plase update all of this based on current response from be
 */

export interface RootLoginResponseI {
  messages: string[]
  data: LoginData
}

export interface RootLoginPayloadI {
  email: string
  password: string
}

export interface RootRegisterPayloadI extends User {}

export interface RootRegisterResponseI {
  /**
   * TODO dont forget to add this interface
   */
}
// structure of object

export interface LoginData extends User {
  id: number
  token: string
}

export interface User {
  id?: number
  fullName: string
  email: string
  profile_picture?: string
  role: "designer" | "user"
  additional?: UserAdditional
  password?: string
}

export interface UserAdditional {
  speciality: string
  years_experience: number
}

export interface Design {
  id: string
  author: User
  name: string
  certificate_url: string
  description: string
  permission?: string[]
  image_url: string[]
  price: number
  purpose: string
  spesification: string
  type: string
  transactions: Transaction[]
}

export interface Transaction {
  id: number
  designId: number
  userId: number
  revision?: string
  createdAt: Date
}

export interface DesignResponse {
  message: string[]
  data: Design[]
}
