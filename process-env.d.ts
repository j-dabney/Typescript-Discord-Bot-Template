// Adds typing to environment variables in global scope.

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      TOKEN: string;
      DISCORD_CLIENT_ID: string;
      MONGO_URL: string;

      DEV_TOKEN: string;
      DEV_DISCORD_CLIENT_ID: string;
      DEV_GUILD_ID: string;
      DEV_MONGO_URL: string;
      DEVELOPER_USER_IDS: string;
    }
  }
}
