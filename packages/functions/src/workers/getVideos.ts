import { ApiHandler } from 'sst/node/api'
import { getVideos } from 'src/dal'
import { Table } from 'sst/node/table'

export const handler = ApiHandler(async event => {
  const videos = await getVideos({
    tableName: Table.table.tableName,
  })
  return {
    statusCode: 200,
    body: JSON.stringify(videos),
  }
})
