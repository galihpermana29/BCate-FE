import { DesignPurpose, DesignType, UserRole } from "utils/interface_type"
import { ApiClass } from "./api"
import { config } from "./config"
import {
  CreateTransactionPayload,
  CreateTransactionRespose,
  DesignDetailResponse,
  DesignResponse,
} from "./response-interface"

class DesignService extends ApiClass {
  public async getAll(token: string, purpose?: DesignPurpose, type?: DesignType): Promise<DesignResponse> {
    try {
      let endpoint = "/design"
      if (purpose) endpoint += `?purpose=${purpose}`
      if (type) endpoint += `&type=${type}`

      const { data } = await this.axiosInstance.get<DesignResponse>(endpoint, config(token))
      return data
    } catch (error) {
      throw error
    }
  }

  public async getById(id: string, token: string): Promise<DesignDetailResponse> {
    try {
      const { data } = await this.axiosInstance.get<DesignDetailResponse>(`/design/${id}`, config(token))
      return data
    } catch (error) {
      throw error
    }
  }

  public async createTransaction(payload: CreateTransactionPayload, token: string): Promise<CreateTransactionRespose> {
    try {
      const { data } = await this.axiosInstance.post<CreateTransactionRespose>("/transaction", payload, config(token))
      return data
    } catch (error) {
      throw error
    }
  }

  public async getCollection(token: string, role: UserRole, id: number): Promise<DesignResponse> {
    try {
      const { data } = await this.axiosInstance.get<DesignResponse>(`design/collection-${role}/${id}`, config(token))
      return data
    } catch (error) {
      throw error
    }
  }
}

export const DesignAPI = new DesignService()
