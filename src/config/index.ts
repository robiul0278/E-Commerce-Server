import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join((process.cwd(), '.env')) });

export default {
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  jwt_secret_token :process.env.JWT_SECRET_TOKEN,
  jwt_refresh_token :process.env.JWT_REFRESH_TOKEN,
  jwt_secret_expiration :process.env.JWT_SECRET_EXPIRATION,
  jwt_refresh_expiration :process.env.JWT_REFRESH_EXPIRATION,
  node_env:process.env.NODE_ENV,
};
