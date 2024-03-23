import { ApiClass } from "./api"
import {
  RootLoginPayloadI,
  RootLoginResponseI,
  RootRegisterPayloadI,
  RootRegisterResponseI,
} from "./response-interface"

class AuthenticationServices extends ApiClass {
  constructor(baseURL?: string, config?: Record<string, any>) {
    super(baseURL, config)
  }

  public async login(payload: RootLoginPayloadI): Promise<RootLoginResponseI> {
    try {
      const { data } = await this.axiosInstance.post<RootLoginResponseI>("/auth/login", payload)
      return data
    } catch (error) {
      throw error
    }
  }

  public async register(payload: RootRegisterPayloadI): Promise<RootRegisterResponseI> {
    try {
      const { data } = await this.axiosInstance.post<RootRegisterResponseI>("/auth/register", payload)
      return data
    } catch (error) {
      throw error
    }
  }
}

export const AuthenticationAPI = new AuthenticationServices()

/**
 * INFO How to use this ?
 *
 * cosnt data = await AuthenticationAPI.login()
 */
