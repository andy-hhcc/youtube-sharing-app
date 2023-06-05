import { APIGatewayProxyHandler } from 'aws-lambda'
import { deleteConnection } from 'src/dal'
import { Table } from 'sst/node/table'

export const handler: APIGatewayProxyHandler = async event => {
  await deleteConnection({
    tableName: Table.table.tableName,
    connectionId: event.requestContext.connectionId,
  })
  return {
    statusCode: 200,
    body: 'disconnected',
  }
}
