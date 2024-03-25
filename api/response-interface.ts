// structure of response/payload

import { UserRole } from "utils/interface_type"

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
  messages: string[]
  data: number
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
  role: UserRole
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
  image_uri: string[]
  price: number
  purpose: string
  specification: string
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

export interface DesignDetailResponse {
  message: string[]
  data: Design
}

export interface CreateTransactionRespose {
  message: string[]
  data: number
}

export interface CreateTransactionPayload {
  user_id: number
  design_id: number
}
