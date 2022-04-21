declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: string;
      APPLICATION_PORT: number;

      MONGODB_USERNAME: string;
      MONGODB_PASSWORD: string;
      MONGODB_HOST: string;
      MONGODB_PORT: number;
      MONGODB_DATABASE: string;

      BCRYPT_SALT: number;
      JWT_SECRET: string;
    }
  }
}

export {};
