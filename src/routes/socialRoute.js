// src/routes/auth.route.js

import { googleCallback, githubCallback } from '../controllers/socialController.js'

export default async function authRoutes(fastify, options) {
  fastify.get('/v1/googleLogin/callback', googleCallback)
  fastify.get('/v1/githubLogin/callback', githubCallback)
}
