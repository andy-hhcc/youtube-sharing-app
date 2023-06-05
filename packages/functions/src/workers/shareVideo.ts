import { ApiHandler } from 'sst/node/api'
import { Video } from '@youtube-sharing-app/core/domains'
import { getYouTubeVideoId } from '@youtube-sharing-app/core/utils'
import axios from 'axios'
import { createVideo } from 'src/dal'
import { Table } from 'sst/node/table'

const parserURL = 'https://www.youtube.com/oembed?url=parser_url&format=json'

export const handler = ApiHandler(async event => {
  const data = JSON.parse(event?.body || '{}') as unknown as Video

  const videoId = getYouTubeVideoId(data.url)
  const response = await axios.get(parserURL.replace('parser_url', data.url))
  const youtubeData = response.data
  
  const video = await createVideo({
    tableName: Table.table.tableName,
    video: {
      ...data,
      title: youtubeData?.title || '',
      videoId,
    },
  })
  
  return {
    statusCode: 201,
    body: JSON.stringify(video),
  }
})
