// index.js
import Fastify from 'fastify'
import dotenv from 'dotenv'
import userRoutes from './src/routes/userRoute.js'
import authRoutes from './src/routes/socialRoute.js'

import fastifyFormbody from '@fastify/formbody'
import { registerGoogleOAuth } from './src/plugins/googleOauth.js'
import { registerGithubOAuth } from './src/plugins/githubOauth.js'
dotenv.config()

const fastify = Fastify({ logger: true })
console.log('✅ Environment variables loaded successfully!')
console.log('✅ Database connected successfully!')


// Register Plugins
await registerGoogleOAuth(fastify)
await registerGithubOAuth(fastify)
fastify.register(authRoutes)
// Register Routes
fastify.register(fastifyFormbody)
fastify.register(userRoutes, { prefix: '/v1/users' })

const start = async () => {
  try {
    await fastify.listen({ port: process.env.PORT || 3000, host: '0.0.0.0' })
    console.log(`Server running at http://localhost:${process.env.PORT}`)
    console.log(fastify.printRoutes());

  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()
