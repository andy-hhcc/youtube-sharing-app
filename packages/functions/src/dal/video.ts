import { Video } from '@youtube-sharing-app/core/domains'
import { Video as VideoModel } from '@youtube-sharing-app/core/dal'
import { DynamoDB } from 'aws-sdk'
import { v4 } from 'uuid'
import { videoMapper } from 'src/mappers/videoMapper'

const dynamoDb = new DynamoDB.DocumentClient()

export const createVideo = async ({
  tableName,
  video,
}: {
  tableName: string
  video: Video
}): Promise<Video> => {
  const timestamp = new Date().getTime()
  const detail: Video = {
    ...video,
    id: v4(),
  }
  const params = {
    TableName: tableName,
    Item: {
      pk: `video`,
      sk: `video#${timestamp}#${detail.id}`,
      ...detail,
    } as VideoModel,
  }
  await dynamoDb.put(params).promise()
  return detail
}

export const getVideos = async ({ tableName }: { tableName: string }) => {
  const params = {
    TableName: tableName,
    KeyConditionExpression: 'pk = :pk',
    ExpressionAttributeValues: {
      ':pk': 'video',
    },
    ScanIndexForward: false,
  }
  const results = await dynamoDb.query(params).promise()

  return results.Items?.map(item => videoMapper(item as unknown as VideoModel))
}
