import reactLogo from '../../assets/react.svg'
import { useAuth, useUser } from '../../hooks'
import { Authentication } from '../Authentication'
import { Profile } from '../Profile'

export const Heading = () => {
  const { user } = useUser()
  const { logout } = useAuth()
  return (
    <div className="heading">
      <img src={reactLogo} className="logo react" alt="React logo" />
      {!user && <Authentication />}
      {user && <Profile user={user} logout={logout} />}
    </div>
  )
}
