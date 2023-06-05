import { useEffect, useState } from 'react'
import { Video } from '@youtube-sharing-app/core/domains'
import { API, Auth, Hub } from 'aws-amplify'

export const useVideo = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [items, setItems] = useState<Video[]>([])

  const getVideos = async () => {
    setLoading(true)
    try {
      const response = await API.get('api', '/videos', {
        headers: {
          Authorization: `Bearer ${(await Auth.currentSession())
            .getAccessToken()
            .getJwtToken()}`,
        },
      })
      setItems(response)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getVideos()
  }, [])

  Hub.listen('video', async ({ payload: { event, data } }) => {
    switch (event) {
      case 'newVideo':
        setItems([data, ...items])
        break
    }
  })
  return { loading, items }
}
