declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: string;
      APPLICATION_PORT: number;

      MONGODB_USERNAME: string;
      MONGODB_PASSWORD: string;

      BCRYPT_SALT: number;
      JWT_SECRET: string;
    }
  }
}

export {};
