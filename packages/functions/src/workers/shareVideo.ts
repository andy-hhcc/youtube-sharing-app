import { createVideo, getConnections, deleteConnection } from 'src/dal'
import { Table } from 'sst/node/table'
import { SQSEvent } from 'aws-lambda'
import { WebSocketApi } from 'sst/node/websocket-api'
import { ApiGatewayManagementApi } from 'aws-sdk'

export const handler = async (event: SQSEvent) => {
  const records: any[] = event.Records
  const record = JSON.parse(records[0].body)

  try {
    const tableName = Table.table.tableName

    const connections = await getConnections({
      tableName,
    })
    const filterdConnections = connections.filter(
      connection => connection.userId !== record.sentBy,
    )

    const apiGW = new ApiGatewayManagementApi({
      endpoint: WebSocketApi.webSocketApi.url.replace('wss://', ''),
    })

    const postToConnection = async (connectionId: string) => {
      try {
        if (!connectionId) return
        await apiGW
          .postToConnection({
            ConnectionId: connectionId,
            Data: JSON.stringify(record.detail),
          })
          .promise()
      } catch (e: any) {
        if (e.statusCode === 410) {
          await deleteConnection({ tableName, connectionId })
        }
      }
    }
    await Promise.all(filterdConnections.map(item => postToConnection(item.id)))
  } catch (err) {
    console.log(err)
  }

  return {}
}
