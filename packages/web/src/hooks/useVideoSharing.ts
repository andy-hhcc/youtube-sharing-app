import { Video } from '@youtube-sharing-app/core/domains'
import { API, Auth, Hub } from 'aws-amplify'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { v4 } from 'uuid'

export const useVideoSharing = () => {
  const [loading, setLoading] = useState(false)

  const shareVideo = async (url: string, createdBy: string) => {
    setLoading(true)
    try {
      const video: Video = {
        id: v4(),
        url,
        createdBy: createdBy,
      }
      const response = await API.post('api', '/videos', {
        headers: {
          Authorization: `Bearer ${(await Auth.currentSession())
            .getAccessToken()
            .getJwtToken()}`,
        },
        body: video,
      })
      dispatchEvent(response)
    } catch (err) {
      toast('Share video failed')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const dispatchEvent = (video: Video) => {
    Hub.dispatch('video', {
      event: 'newVideo',
      data: video,
    })
  }

  return { loading, shareVideo }
}
