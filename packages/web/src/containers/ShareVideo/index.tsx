import { useCallback, useState } from 'react'
import Modal from 'react-modal'
import './shareVideo.style.css'
import { useVideoSharing } from '../../hooks'
import { toast } from 'react-toastify'

export const ShareVideo = ({ user }: any) => {
  const [isOpen, setOpen] = useState(false)
  const [url, setUrl] = useState<string>()
  const { shareVideo } = useVideoSharing()

  const openModal = () => {
    setOpen(true)
  }

  const closeModal = () => {
    setOpen(false)
  }

  const handleShare = useCallback(() => {
    if (!url) return
    const email = user?.attributes?.email
    shareVideo(url, email).then(() => {
      setOpen(false)
    }).catch((err) => {
      toast('Share video failed')
      console.error(err)
    })
  }, [shareVideo, user, url])

  return (
    <div className="share-container">
      <button onClick={openModal}>Share a movie</button>
      <Modal isOpen={isOpen} className="share-modal">
        <div className="form">
          <input
            type="text"
            placeholder="Youtube url"
            onChange={e => setUrl(e.target.value)}
          />
          <div className="button-group">
            <button onClick={closeModal}>Close</button>
            <button onClick={handleShare} disabled={!url}>
              Share
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
