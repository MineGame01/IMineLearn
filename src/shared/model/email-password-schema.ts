import Joi from 'joi'

export const emailAndPasswordSchema = Joi.object<{ email: string; password: string }, true>({
    email: Joi.string().email({ tlds: false, minDomainSegments: 2 }).required(),
    password: Joi.string().min(6).pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
})