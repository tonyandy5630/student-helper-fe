declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production"
      SECRET_KEY_JWT: string
    }
  }
}
