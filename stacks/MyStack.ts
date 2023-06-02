import { StackContext, Api, StaticSite, Cognito } from 'sst/constructs'

export const YoutubeSharingStack = ({ stack }: StackContext) => {
  // Create user_pool
  const auth = new Cognito(stack, 'auth', {
    login: ['email'],
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
    },
    routes: {
      'GET /private': 'packages/functions/src/lambda.handler',
      'GET /public': {
        function: 'packages/functions/src/lambda.handler',
        authorizer: 'none',
      },
    },
  })

  // Allow authenticated requests to access api
  auth.attachPermissionsForAuthUsers(stack, [api])

  const web = new StaticSite(stack, 'web', {
    path: 'packages/web',
    buildOutput: 'dist',
    buildCommand: 'npm run build',
    environment: {
      VITE_APP_API_URL: api.url,
      VITE_APP_USER_POOL_ID: auth.userPoolId,
      VITE_APP_USER_POOL_CLIENT_ID: auth.userPoolClientId,
    },
  })

  stack.addOutputs({
    ApiEndpoint: api.url,
    UserPoolId: auth.userPoolId,
    UserPoolClientId: auth.userPoolClientId,
    WebUrl: web.url,
  })
}
