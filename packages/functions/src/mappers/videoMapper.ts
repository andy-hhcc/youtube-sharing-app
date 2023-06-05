import { Video as VideoModel } from "@youtube-sharing-app/core/dal";
import { Video } from "@youtube-sharing-app/core/domains";

export const videoMapper = (model: VideoModel): Video => {
  return {
    id: model.id,
    url: model.url,
    videoId: model.videoId,
    title: model.title,
    createdBy: model.createdBy,
  }
}