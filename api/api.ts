import axios, { AxiosInstance } from "axios"

export class ApiClass {
  public baseURL: string
  private config: Record<string, any>
  public axiosInstance: AxiosInstance

  constructor(baseURL: string = "https://b-cate-production.up.railway.app/api/v1", config?: Record<string, any>) {
    this.baseURL = baseURL

    this.config = config || {}

    this.axiosInstance = axios.create({
      baseURL: this.baseURL,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      ...this.config,
    })

    this.setupInterceptors()
  }

  private setupInterceptors(): void {
    this.axiosInstance.interceptors.response.use((response) => {
      return response
    })
  }
}
