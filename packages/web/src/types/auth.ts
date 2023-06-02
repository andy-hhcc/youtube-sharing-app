interface AuthRequest {
  email: string
  password: string
}

export type SignUpRequest = AuthRequest
export type SignInRequest = AuthRequest
export type VerifyRequest = {
  email: string
  code: string
}