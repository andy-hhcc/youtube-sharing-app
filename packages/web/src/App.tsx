import { Heading } from './containers/Heading'
import { Body } from './containers/Body'
import { ToastContainer } from 'react-toastify'

import './App.css'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <>
      <Heading />
      <Body />
      <ToastContainer />
    </>
  )
}

export default App
