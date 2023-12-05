//libraries that we need to configure the environment variables
import 'dotenv/config';
import env from 'env-var';

//object with all the environment variables of our system --key--value

export const envs = {
  PORT: env.get('PORT').required().asPortNumber(),
  DB_URI: env.get('DB_URI').required().asString(),
};
