import { Video } from '@youtube-sharing-app/core/domains'
import './videoItem.style.css'

export const VideoItem = ({ data }: { data: Video }) => {
  return (
    <div className="video-container">
      <div className="video">
        <div className="iframe-wrapper">
          <iframe
            title={data?.title}
            src={`https://www.youtube.com/embed/${data?.videoId}`}
            allowFullScreen
          ></iframe>
        </div>
      </div>
      <div className="info">
        <h2>{data?.title}</h2>
        <p>Shared by: {data?.createdBy}</p>
      </div>
    </div>
  )
}
