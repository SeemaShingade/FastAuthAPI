import * as User from '../models/userModel.js'

const addUserInfo = async (userInfo,proValue) => {
    const existingUser = await User.findByEmail(userInfo.email)
    if (existingUser) {
        return reply.status(400).send({ message: 'User already exists' })
    }
    // Create new user
      const userData ={name:userInfo.name,email:userInfo.email,phone_number:'',password:'',provider:proValue} 
    try {
        const newUser = await User.createUser(userData)
        return reply.code(200).send({ message: 'User registered', user: newUser })
      } catch (err) {
        console.error('Registration Error:', err)
        return reply.code(500).send({ error: 'User registration failed' })
      }

}
export const googleCallback = async (req, reply) => {
    try {
      const token = await req.server.googleOAuth2.getAccessTokenFromAuthorizationCodeFlow(req)
      // Fetch user info from Google API using the token
      const userInfo = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
        headers: { Authorization: `Bearer ${token.token.access_token}` }
      }).then(res => res.json())
      addUserInfo(userInfo,'google')
    return reply.send({ message: 'Google login successful', token })
    } catch (error) {
      console.error('Google login error:', error)
      return reply.code(500).send({ error: 'Google login failed' })
    }
  }
  
  export const githubCallback = async (req, reply) => {
    try {
      const token = await req.server.githubOAuth2.getAccessTokenFromAuthorizationCodeFlow(req)
      const accessToken = token.token.access_token

    const userInfo = await fetch('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'User-Agent': 'fastify-oauth-app'
      }
    }).then(res => res.json())
    const emails = await fetch('https://api.github.com/user/emails', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'User-Agent': 'fastify-oauth-app'
        }
      }).then(res => res.json())

      const primaryEmail = emails.find(e => e.primary)?.email || userInfo.email
      addUserInfo({ name: userInfo.name, email: primaryEmail},'github')
      return reply.send({ message: 'GitHub login successful', token })
    } catch (error) {
      return reply.code(500).send({ error: 'GitHub login failed' })
    }
  }
  