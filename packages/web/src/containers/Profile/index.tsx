export const Profile = ({ user, share, logout }: any) => {
  return (
    <div className="profile">
      <span>Welcome {user?.attributes?.email || ''}</span>
      <button onClick={share}>Share a movie</button>
      <button onClick={logout}>Logout</button>
    </div>
  )
}
