import { Auth, Hub } from 'aws-amplify'
import { useEffect, useState } from 'react'

export const useUser = () => {
  const [user, setUser] = useState(null)
  const [authenticated, setAuthenticated] = useState(false)

  const getUser = async () => {
    await Auth.currentUserInfo()
      .then(setUser)
      .catch(() => setUser(null))
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
