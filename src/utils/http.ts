import axios, { type AxiosInstance } from "axios"

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
  }
}

const http = new Http().instance
export default http
