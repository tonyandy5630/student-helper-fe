import { SignJWT, jwtVerify, type JWTPayload } from "jose"
import { Token } from "@typescript-eslint/types/dist/generated/ast-spec"

export async function verify(token: string, secret: string): Promise<JWTPayload> {
  const { payload } = await jwtVerify(token, new TextEncoder().encode(secret))
  return payload
}
