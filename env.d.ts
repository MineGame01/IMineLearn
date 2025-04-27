declare namespace NodeJS {
  interface ProcessEnv {
    ANALYZE: boolean;
    PRIVATE_KEY_JWT: string;
    MONGO_DB_URL: string;
    NEXT_PUBLIC_REST_API_URL: string;
    NEXT_PUBLIC_FIREBASE_API_KEY: string;
  }
}
