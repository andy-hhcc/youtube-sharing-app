import { Auth, Hub } from 'aws-amplify'
import { SignInRequest, SignUpRequest, VerifyRequest } from '../types'

export const useAuth = () => {
  const signUp = async ({ email, password }: SignUpRequest) => {
    return Auth.signUp({
      username: email,
      password,
    })
  }

  const signIn = async ({ email, password }: SignInRequest) => {
    return Auth.signIn({
      username: email,
      password,
    }).then(() => {
      Hub.dispatch('auth', {
        event: 'signIn',
      })
    })
  }

  const verify = async ({ email, code }: VerifyRequest) => {
    return Auth.confirmSignUp(email, code).catch(err => {
      throw new Error(err?.message || 'error')
    })
  }

  const logout = async () => {
    return Auth.signOut().then(() => {
      Hub.dispatch('auth', {
        event: 'signOut',
      })
    })
  }

  return { signUp, signIn, verify, logout }
}
