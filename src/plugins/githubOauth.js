import fastifyOauth2 from '@fastify/oauth2'

export async function registerGithubOAuth(fastify) {
  fastify.register(fastifyOauth2, {
    name: 'githubOAuth2',
    scope: ['user:email'],
    credentials: {
      client: {
        id: process.env.GITHUB_CLIENT_ID,
        secret: process.env.GITHUB_CLIENT_SECRET
      },
      auth: fastifyOauth2.GITHUB_CONFIGURATION
    },
    startRedirectPath: '/v1/githubLogin',
    callbackUri: 'http://localhost:4000/v1/githubLogin/callback'
  })
}
