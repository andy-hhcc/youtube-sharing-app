import { ShareVideo } from "../ShareVideo"

export const Profile = ({ user, logout }: any) => {
  return (
    <div className="profile">
      <span>Welcome {user?.attributes?.email || ''}</span>
      <ShareVideo user={user} />
      <button onClick={logout}>Logout</button>
    </div>
  )
}
