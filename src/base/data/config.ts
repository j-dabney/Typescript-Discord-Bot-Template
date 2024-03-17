import dotenv from "dotenv";
dotenv.config();

export default {
  "token": process.env.TOKEN as string,
  "discordClientId": process.env.DISCORD_CLIENT_ID as string,
  "mongoUrl": process.env.MONGO_URL as string,

  "devToken": process.env.DEV_TOKEN as string,
  "devDiscordClientId": process.env.DEV_DISCORD_CLIENT_ID as string,
  "devGuildId": process.env.DEV_GUILD_ID as string,
  "devMongoUrl": process.env.DEV_MONGO_URL as string,
  "developerUserIds": (process.env.DEVELOPER_USER_IDS || " ").split(",") as string[]
};
