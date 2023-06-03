import { ApiHandler } from 'sst/node/api'
import { Video } from '@youtube-sharing-app/core/domains'
import { createVideo } from 'src/dal'
import { Table } from 'sst/node/table'

export const handler = ApiHandler(async event => {
  const data = JSON.parse(event?.body || '{}') as unknown as Video
  const video = await createVideo({
    tableName: Table.table.tableName,
    video: data,
  })
  return {
    statusCode: 201,
    body: JSON.stringify(video),
  }
})
