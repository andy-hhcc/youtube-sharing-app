import { Heading } from './containers/Heading'
import { Body } from './containers/Body'
import { ToastContainer } from 'react-toastify'

import './App.css'
import 'react-toastify/dist/ReactToastify.css'
import { useUser } from './hooks'
import { useWebSocket } from './hooks/useWebSocket'

function App() {
  const { user } = useUser()
  useWebSocket(user)
  return (
    <>
      <Heading user={user} />
      <Body />
      <ToastContainer />
    </>
  )
}

export default App
