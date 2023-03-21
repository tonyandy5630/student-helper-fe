export type User = {
  _id: string
  email: string
  password: string
  role: string
  username: string
  isActive: boolean
  followers: number
  rankInSubjects: Array<Object>
  isBanned: boolean
}
