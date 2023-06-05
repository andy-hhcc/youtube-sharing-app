import {
  StackContext,
  Api,
  StaticSite,
  Cognito,
  Table,
  WebSocketApi,
  Queue,
} from 'sst/constructs'

export const YoutubeSharingStack = ({ stack }: StackContext) => {
  // Create user_pool
  const auth = new Cognito(stack, 'auth', {
    login: ['email'],
  })

  // Create database
  const table = new Table(stack, 'table', {
    fields: {
      pk: 'string',
      sk: 'string',
    },
    primaryIndex: { partitionKey: 'pk', sortKey: 'sk' },
  })

  // WebSocket Api
  const webSocketApi = new WebSocketApi(stack, 'webSocketApi', {
    defaults: {
      function: {
        bind: [table],
      },
    },
    routes: {
      $connect: 'packages/functions/src/workers/connect.handler',
      $disconnect: 'packages/functions/src/workers/disconnect.handler',
    },
  })

  // Create Queue
  const queue = new Queue(stack, 'queue', {
    consumer: {
      function: {
        bind: [table, webSocketApi],
        handler: 'packages/functions/src/workers/shareVideo.handler',
      },
    },
  })

  // Create Api
  const api = new Api(stack, 'api', {
    authorizers: {
      jwt: {
        type: 'user_pool',
        userPool: {
          id: auth.userPoolId,
          clientIds: [auth.userPoolClientId],
        },
      },
    },
    defaults: {
      authorizer: 'jwt',
      function: {
        bind: [table, queue],
      },
    },
    routes: {
      'GET /videos': 'packages/functions/src/workers/getVideos.handler',
      'POST /videos': 'packages/functions/src/workers/createVideo.handler',
    },
  })

  // Allow authenticated requests to access api
  auth.attachPermissionsForAuthUsers(stack, [api])
  auth.attachPermissionsForAuthUsers(stack, [webSocketApi])

  const web = new StaticSite(stack, 'web', {
    path: 'packages/web',
    buildOutput: 'dist',
    buildCommand: 'npm run build',
    environment: {
      VITE_APP_API_URL: api.url,
      VITE_APP_WEB_SOCKET_API_URL: webSocketApi.url,
      VITE_APP_USER_POOL_ID: auth.userPoolId,
      VITE_APP_USER_POOL_CLIENT_ID: auth.userPoolClientId,
    },
  })

  stack.addOutputs({
    ApiEndpoint: api.url,
    WebSocketApiEndpoint: webSocketApi.url,
    UserPoolId: auth.userPoolId,
    UserPoolClientId: auth.userPoolClientId,
    WebUrl: web.url,
  })
}
