import { DesignType } from "utils/interface_type"
import { ApiClass } from "./api"
import { DesignResponse } from "./response-interface"

class DesignService extends ApiClass {
  public async getAll(token: string, type?: DesignType): Promise<DesignResponse> {
    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      }

      let endpoint = "/design"

      if (type) endpoint += `?type=${type}`

      const { data } = await this.axiosInstance.get<DesignResponse>(endpoint, config)
      return data
    } catch (error) {
      throw error
    }
  }
}

export const DesignAPI = new DesignService()
