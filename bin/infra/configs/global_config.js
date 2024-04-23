require('dotenv').config();
const confidence = require('confidence');

const config = {
  port: process.env.PORT,
  secretKey: {
    jwt: process.env.SECRET_JWT,
    encryptPasswordProfile: process.env.SECRET_ENCRYPT_PASSWORD_PROFILE
  },
  basicAuth: {
    username: process.env.BASIC_AUTH_USERNAME,
    password: process.env.BASIC_AUTH_PASSWORD
  },
  basicAuthApi: [
    {
      username: process.env.BASIC_AUTH_USERNAME,
      password: process.env.BASIC_AUTH_PASSWORD
    }
  ],
  mongoDbUrl: process.env.MONGO_DATABASE_URL,
  minioEndpoint: process.env.MINIO_URL,
  minioPort: process.env.MINIO_PORT,
  minioUseSsl: process.env.MINIO_USE_SSL,
  minioAccessKey: process.env.MINIO_ACCESS_KEY,
  minioSecretKey: process.env.MINIO_SECRET_KEY,
  minioIpPublic: process.env.MINIO_IP_PUBLIC || 'https://geodashboard2.braga.co.id/panel/assets/',
};

const store = new confidence.Store(config);

exports.get = key => store.get(key);
