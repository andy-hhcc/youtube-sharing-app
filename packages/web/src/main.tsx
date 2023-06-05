import React from 'react'
import ReactDOM from 'react-dom/client'
import { Amplify } from 'aws-amplify'
import App from './App.tsx'
import './index.css'

Amplify.configure({
  Auth: {
    region: import.meta.env.VITE_APP_REGION,
    userPoolId: import.meta.env.VITE_APP_USER_POOL_ID,
    userPoolWebClientId: import.meta.env.VITE_APP_USER_POOL_CLIENT_ID,
  },
  API: {
    endpoints: [
      {
        name: 'api',
        region: 'ap-southeast-1',
        endpoint: import.meta.env.VITE_APP_API_URL,
      },
      {
        name: 'webSocketApi',
        region: 'ap-southeast-1',
        endpoint: import.meta.env.VITE_APP_WEB_SOCKET_API_URL,
      },
    ],
  },
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
