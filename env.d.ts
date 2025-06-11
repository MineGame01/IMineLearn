declare namespace NodeJS {
  interface ProcessEnv {
    ANALYZE: string;
    PRIVATE_KEY_JWT: string;
    MONGO_DB_URL: string;
    NEXT_PUBLIC_REST_API_URL: string;
    NEXT_PUBLIC_FIREBASE_API_KEY: string;
    IS_SERVER_ENVIRONMENT: string;
  }
}
