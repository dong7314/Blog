import { registerAs } from '@nestjs/config';

export default registerAs('minio', () => ({
  endpoint: process.env.MINIO_DOMAIN,
  accessKey: process.env.MINIO_ACCESS_KEY,
  secreKey: process.env.MINIO_SECRET_KEY,
}));
