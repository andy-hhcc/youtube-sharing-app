import { Connection as ConnectionModel } from '@youtube-sharing-app/core/dal'
import { Connection } from '@youtube-sharing-app/core/domains'
import { DynamoDB } from 'aws-sdk'
import { connectionMapper } from 'src/mappers'

const dynamoDb = new DynamoDB.DocumentClient()

export const createConnection = async ({
  tableName,
  connectionId,
  userId,
}: any) => {
  const params = {
    TableName: tableName,
    Item: {
      pk: `connection`,
      sk: `connection#${connectionId}`,
      id: connectionId,
      userId: userId,
    } as ConnectionModel,
  }
  await dynamoDb.put(params).promise()
}

export const deleteConnection = async ({ tableName, connectionId }: any) => {
  const params = {
    TableName: tableName,
    Key: {
      pk: `connection`,
      sk: `connection#${connectionId}`,
    } as ConnectionModel,
  }
  await dynamoDb.delete(params).promise()
}

export const getConnections = async ({
  tableName,
}: any): Promise<Connection[]> => {
  const params = {
    TableName: tableName,
    KeyConditionExpression: 'pk = :pk',
    ExpressionAttributeValues: {
      ':pk': 'connection',
    },
    ScanIndexForward: false,
  }

  const connections = await dynamoDb
    .query(params)
    .promise()

  return (
    connections.Items?.map(item => connectionMapper(item as ConnectionModel)) ||
    []
  )
}
