import { Video } from '@youtube-sharing-app/core/domains'
import { useVideo } from '../../hooks/useVideo'
import { VideoItem } from '../../components'

export const Body = () => {
  const { loading, items } = useVideo()

  if (loading) {
    return <div className="">Loading</div>
  }

  if (items.length === 0) {
    return <div className="">No videos</div>
  }
  
  const renderVideos = (items: Video[]) => {
    return items.map((video) => (
      <VideoItem 
        key={video.id}
        data={video}
      />
    ))
  }
  return <div className="body">
    {renderVideos(items)}
  </div>
}
