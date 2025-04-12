export const getEnvVar = (env: string, message?: string) => {
  const envVar = process.env[env];
  if (envVar) return envVar;
  throw new Error(message ?? `Environment variable: ${env} not defined!`);
};
