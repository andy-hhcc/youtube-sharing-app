import { ApiHandler } from 'sst/node/api'
import { Video } from '@youtube-sharing-app/core/domains'
import { getYouTubeVideoId } from '@youtube-sharing-app/core/utils'
import axios from 'axios'
import { createVideo } from 'src/dal'
import { Table } from 'sst/node/table'
import AWS from 'aws-sdk'
import { Queue } from 'sst/node/queue'

const sqs = new AWS.SQS()

const parserURL = 'https://www.youtube.com/oembed?url=parser_url&format=json'

export const handler = async (event: any) => {
  const data = JSON.parse(event?.body || '{}') as unknown as Video

  const videoId = getYouTubeVideoId(data.url)
  const response = await axios.get(parserURL.replace('parser_url', data.url))
  const youtubeData = response.data
  const tableName = Table.table.tableName
  
  const video = await createVideo({
    tableName,
    video: {
      ...data,
      title: youtubeData?.title || '',
      videoId,
    },
  })

  try {
    await sqs
      .sendMessage({
        QueueUrl: Queue.queue.queueUrl,
        MessageBody: JSON.stringify({
          detail: video,
          sentBy: event.requestContext?.authorizer?.jwt?.claims?.sub
        }),
      })
      .promise()
  } catch (err) {
    console.error(err)
  }

  return {
    statusCode: 201,
    body: JSON.stringify(video),
  }
}
