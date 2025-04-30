import { registerUserSchema,loginSchema } from '../validations/userValidation.js' 
import * as User from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
export const getAllUsers = async (req, reply) => {
  const users = await User.findAll()
  return users
}

export const getUserById = async (req, reply) => {
  const { id } = req.params
  const user = await User.findById(id)
  return user || reply.code(404).send({ message: 'User not found' })
}

export const createUser = async (req, reply) => {
    const { error, value } = registerUserSchema.validate(req.body)
    if(error){
        return reply.status(400).send({ message: error.details[0].message })
    }
    // Check if user already exists
    const existingUser = await User.findByEmail(value.email)
    if (existingUser) {
        return reply.status(400).send({ message: 'User already exists' })
    }
    // Create new user
    try {
        const newUser = await User.createUser(value)
        return reply.code(200).send({ message: 'User registered', user: newUser })
      } catch (err) {
        console.error('Registration Error:', err)
        return reply.code(500).send({ error: 'User registration failed' })
      }

    }
      export const loginUser = async (req, reply) => {
        const { error, value } = registerUserSchema.validate(req.body)
        if(error){
            return reply.status(400).send({ message: error.details[0].message })
        }
        // Check if user already exists
        const findUser = await User.findByEmail(value.email)
        if (findUser) {
            return reply.status(400).send({ message: 'User Not Found' })
        }
        // match password
        const isMatch = await bcrypt.compare(password, value.password)
        if (!isValidPassword) {
            return reply.status(401).send({ message: 'Invalid credentials' })
        }
        // Generate JWT token
        const token = jwt.sign({ id: findUser.id ,email:findUser.email}, process.env.JWT_SECRET, { expiresIn: '1h' })
        return reply.code(200).send({ message: 'Login successful', token })
      }
  

