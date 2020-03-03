import dotenv from 'dotenv';

dotenv.config();

const config = {
  TINY_PNG_API_KEY: process.env.TINY_PNG_API_KEY,
};

export default config;
