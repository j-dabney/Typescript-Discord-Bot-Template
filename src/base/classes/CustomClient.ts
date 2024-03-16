import { Client, Collection, GatewayIntentBits } from "discord.js";
import ICustomClient from "../interfaces/ICustomClient";
import IConfig from "../interfaces/IConfig";
import config from "../data/config";
import Handler from "./Handler";
import Command from "./Command";
import SubCommand from "./SubCommand";
import { connect } from "mongoose";

export default class CustomClient extends Client implements ICustomClient {
  handler: Handler;
  config: IConfig;
  commands: Collection<string, Command>;
  subCommands: Collection<string, SubCommand>;
  cooldowns: Collection<string, Collection<string, number>>;
  developmentMode: boolean;

  constructor() {
    super({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
      ],
    })

    this.config = config;
    this.handler = new Handler(this);
    this.commands = new Collection();
    this.subCommands = new Collection();
    this.cooldowns = new Collection();
    this.developmentMode = (process.argv.slice(2).includes("--development"));
  }

  Init(): void {
    console.log(`Starting the bot in ${this.developmentMode ? "development" : "production"} mode.`);
    this.LoadHandlers();

    this.login(this.developmentMode ? this.config.devToken : this.config.token)
    .catch((err) => console.error(err));

    connect(this.developmentMode ? this.config.devMongoUrl : this.config.mongoUrl)
    .then(() => console.log("Connected to MongoDB."))
    .catch((err) => console.error(err));
  }

  LoadHandlers(): void {
    this.handler.LoadEvents();
    this.handler.LoadCommands();
  }

}
