import { registerAs } from "@nestjs/config";

export default registerAs('url', () => ({
  url: process.env.URL,
}));