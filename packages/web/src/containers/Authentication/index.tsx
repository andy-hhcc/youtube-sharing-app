import { useCallback, useState } from 'react'
import { toast } from 'react-toastify'
import { useAuth } from '../../hooks'
import { UserNotConfirmedException } from '../../constants'

export const Authentication = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [code, setCode] = useState('')
  const [verifying, setVerifying] = useState(false)

  const { signUp, signIn, verify } = useAuth()

  const handleSignUp = useCallback(() => {
    signUp({ email, password })
      .then(() => setVerifying(true))
      .catch(err => {
        toast(err.message)
      })
  }, [signUp, email, password])

  const handleSignIn = useCallback(() => {
    signIn({ email, password }).catch(err => {
      const message = err?.message || 'Error'
      if (message.includes(UserNotConfirmedException)) {
        setVerifying(true)
      } else {
        toast(message)
      }
    })
  }, [signIn, setVerifying, email, password])

  const handleVerify = useCallback(() => {
    verify({ email, code }).then(() => {
      toast('Verify success.')
      handleSignIn()
    }).catch(err => {
      toast(err.message)
    })
  }, [verify, handleSignIn, email, code])

  return (
    <div className="signup">
      {!verifying && (
        <>
          <input
            type="email"
            placeholder="Email"
            onChange={e => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={e => setPassword(e.target.value)}
          />
          <button onClick={handleSignUp}>Sign up</button>
          <span>or</span>
          <button onClick={handleSignIn}>Sign in</button>
        </>
      )}
      {verifying && (
        <>
          <input
            type="text"
            placeholder="Verify code"
            onChange={e => setCode(e.target.value)}
          />
          <button onClick={handleVerify}>Verify</button>
        </>
      )}
    </div>
  )
}
