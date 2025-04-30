import fastifyOauth2 from '@fastify/oauth2'

export async function registerGoogleOAuth(fastify) {
  fastify.register(fastifyOauth2, {
    name: 'googleOAuth2',
    scope: ['profile', 'email'],
    credentials: {
      client: {
        id: process.env.GOOGLE_CLIENT_ID,
        secret: process.env.GOOGLE_CLIENT_SECRET
      },
      auth: fastifyOauth2.GOOGLE_CONFIGURATION
    },
    startRedirectPath: '/v1/googleLogin',
    callbackUri: 'http://localhost:4000/v1/googleLogin/callback'
  })
}
