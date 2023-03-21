import axios, { AxiosError, HttpStatusCode, type AxiosInstance } from "axios"
import { toast } from "react-toastify"

class Http {
  instance: AxiosInstance
  constructor() {
    this.instance = axios.create({
      baseURL: process.env.NEXT_PUBLIC_NEXT_PUBLIC_SERVER_URL,
      timeout: 10000,
      headers: {
        "Content-Type": "application/json"
      }
    })

    this.instance.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        if (error.response?.status !== HttpStatusCode.UnprocessableEntity) {
          const data: any | undefined = error.response?.data
          const message = data.message || error.message
          toast.error(message)
        }
        return Promise.reject(error)
      }
    )
  }
}

const http = new Http().instance
export default http
