import { APIGatewayProxyHandler } from 'aws-lambda'
import { createConnection } from 'src/dal'
import { Table } from 'sst/node/table'

export const handler: APIGatewayProxyHandler = async event => {
  await createConnection({
    tableName: Table.table.tableName,
    connectionId: event.requestContext.connectionId,
    userId: event.queryStringParameters?.userId
  })
  
  return {
    statusCode: 200,
    body: 'connected',
  }
}
