import Joi from 'joi'

export const registerUserSchema = Joi.object({
  name: Joi.string().min(10).max(50).required().messages({
    'string.empty': 'Name is required',
    'string.min': 'Name must be at least 10 characters long',
    'string.max': 'Name cannot exceed 50 characters'
  }),

  email: Joi.string().email().required().messages({
    'string.empty': 'Email is required',
    'string.email': 'Email must be a valid email address',
    'any.required': 'Email is required',
  }),

  phone_number: Joi.string().pattern(/^[0-9]{10}$/).required().messages({
    'string.empty': 'Phone number is required',
    'string.pattern.base': 'Phone number must be 10 digits'
  }),

  password: Joi.string().min(8)
  .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/)
  .required().messages({
    'string.empty': 'Password is required',
    'string.pattern.base': 'Password must be at least 8 characters and include uppercase, lowercase, number, and special character'
}),
provider: Joi.string().valid('local', 'google', 'github').required().messages({
  'string.empty': 'provider is required',
  'any.only': 'provider must be either local or google or github'
})
})

export const loginSchema = Joi.object({
    email: Joi.string().email().required().messages({
      'string.empty': 'Email is required',
      'string.email': 'Enter a valid email'
    }),
    password: Joi.string().required().messages({
      'string.empty': 'Password is required'
    })
  })

  