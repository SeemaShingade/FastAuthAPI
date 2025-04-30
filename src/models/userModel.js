import db from '../config/knex.js'
import bcrypt from 'bcrypt'

export const findByEmail = async (email) => {
    return db('users').where({ email }).first()
}

export const createUser = async (userData) => {
    const hashedPassword = await bcrypt.hash(userData.password, 10)
    userData.password = hashedPassword;
    const params={...userData,created_at: new Date(),status_of_login: 0  }
    const [newUser] = await db('users').insert(params).returning('*')
    if (!newUser) {
        throw new Error('User creation failed')
    }
    return newUser
}
