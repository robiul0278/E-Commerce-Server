import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join((process.cwd(), '.env')) });

export default {
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  jwt_secret_token :process.env.JWT_SECRET_TOKEN,
  token_expiration :process.env.TOKEN_EXPIRATION,
  node_env:process.env.NODE_ENV,
};
