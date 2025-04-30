// src/routes/user.route.js
import * as userController from '../controllers/userController.js'

export default async function userRoutes(fastify, options) {
  fastify.post('/register', userController.createUser)
  fastify.post('/login', userController.loginUser)

}
