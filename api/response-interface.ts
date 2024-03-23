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
  role: string
  additional?: UserAdditional
  password?: string
}

export interface UserAdditional {
  speciality: string
  years_experience: number
}
