import { API, Hub } from 'aws-amplify'
import { useCallback, useEffect, useState } from 'react'
import { toast } from 'react-toastify'

export const useWebSocket = (user: any) => {
  const [socket, setSocket] = useState<any>()

  const handleOpen = useCallback(() => {
    console.log('WebSocket connected')
  }, [])

  const handleMessage = useCallback((event: any) => {
    const video = JSON.parse(event.data)
    toast(`New video ${video.title} is shared by ${video.createdBy}`)
    Hub.dispatch('video', {
      event: 'newVideo',
      data: video,
    })
  }, [])

  const handleClose = useCallback(() => {
    console.log('WebSocket disconnected')
  }, [])

  const connectWebSocket = useCallback(
    async (user: any) => {
      if (!user) return
      const webSocketApi = await API.endpoint('webSocketApi')
      const newSocket = new WebSocket(`${webSocketApi}?userId=${user.username}`)
      newSocket.addEventListener('open', handleOpen)
      newSocket.addEventListener('message', handleMessage)
      newSocket.addEventListener('close', handleClose)
      setSocket(newSocket)
    },
    [setSocket, handleOpen, handleMessage, handleClose],
  )

  useEffect(() => {
    connectWebSocket(user)
  }, [user, connectWebSocket])

  useEffect(() => {
    return () => {
      if (socket) {
        socket.close()
      }
    }
  }, [])
}
