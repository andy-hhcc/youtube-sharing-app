import { Auth, Hub } from 'aws-amplify'
import { useEffect, useState } from 'react'

export const useUser = () => {
  const [user, setUser] = useState<any>(undefined)
  const [authenticated, setAuthenticated] = useState(false)

  const getUser = async () => {
    await Auth.currentUserInfo()
      .then(setUser)
      .catch(() => setUser(undefined))
  }

  Hub.listen('auth', async ({ payload: { event } }) => {
    switch (event) {
      case 'signIn':
        setAuthenticated(true)
        break
      case 'signOut':
        setAuthenticated(false)
        break
    }
  })

  useEffect(() => {
    getUser()
  }, [authenticated])

  return { user }
}
