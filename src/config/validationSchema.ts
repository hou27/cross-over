import * as Joi from 'joi';

export const validationSchema = Joi.object({
  MAILGUN_API_KEY: Joi.string().required(),
  MAILGUN_DOMAIN_NAME: Joi.string().required(),
  MAILGUN_TEMPLATE_NAME_FOR_VERIFY_EMAIL: Joi.string().required(),
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().required(),
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_DATABASE: Joi.string().required(),
  JWT_ACCESS_TOKEN_PRIVATE_KEY: Joi.string().required(),
  JWT_REFRESH_TOKEN_PRIVATE_KEY: Joi.string().required(),
  REDIS_HOST: Joi.string().required(),
  REDIS_PORT: Joi.number().required(),
});
