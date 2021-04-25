import { handlerChoice } from "../../Types/handlerChoice.type";
import { language } from "../../Types/lanuage";

const MainCDCommandsJS = `const { Client } = require("discord.js");
const { CDCommands } = require("cdcommands");
require("dotenv").config();

const client = new Client();

client.on("ready", () => {
  new CDCommands(client, {
    commandsDir: "{commands}",
    eventsDir: "{events}",
    featuresDir: "{features}",
    defaultPrefix: "{prefix}",
    mongoURI: process.env.MONGO_URI,
    ignoreBots: true,
  });
  
  console.log(\`\${client.user.tag} has logged in!\`);
});

client.login(process.env.TOKEN);\n`;

const MainCDHandlerJS = `const { Client } = require("discord.js");
const { CDHandler } = require("cdhandler");
require("dotenv/config").config();

const client = new Client();

client.on("ready", () => {
  new CDHandler(client, {
    commandsDir: "{commands}",
    eventsDir: "{events}",
    featuresDir: "{features}",
    prefix: "{prefix}",
    defaults: true,
  });

  console.log(\`\${client.user.tag} has logged in!\`);
});

client.login(process.env.TOKEN);\n`;

const MainCDCommandsTS = `import { Client } from "discord.js";
import { CDCommands } from "cdcommands";
import "dotenv/config";

const client = new Client();

client.on("ready", () => {
  new CDCommands(client, {
    commandsDir: "{commands}",
    eventsDir: "{events}",
    featuresDir: "{features}",
    defaultPrefix: "{prefix}",
    mongoURI: process.env.MONGO_URI as string,
    ignoreBots: true,
  });

  console.log(\`\${client.user?.tag} has logged in!\`);
});

client.login(process.env.TOKEN);\n`;

const MainCDHandlerTS = `import { Client } from "discord.js";
import { CDHandler } from "cdhandler";
import "dotenv/config";

const client = new Client();

client.on("ready", () => {
  new CDHandler(client, {
    commandsDir: "{commands}",
    eventsDir: "{events}",
    featuresDir: "{features}",
    prefix: "{prefix}",
    defaults: true,
  });

  console.log(\`\${client.user?.tag} has logged in!\`);
});

client.login(process.env.TOKEN);\n`;

export function getMainTemplate(
  language: language,
  prefix: string,
  handler: handlerChoice,
  ...paths: [string, string, string]
) {
  const [commands, events, features] = paths;

  if (language === "ts")
    return (handler === "cdcommands" ? MainCDCommandsTS : MainCDHandlerTS)
      .replace("{prefix}", prefix)
      .replace("{commands}", commands)
      .replace("{events}", events)
      .replace("{features}", features);
  else
    return (handler === "cdcommands" ? MainCDCommandsJS : MainCDHandlerJS)
      .replace("{prefix}", prefix)
      .replace("{commands}", commands)
      .replace("{events}", events)
      .replace("{features}", features);
}
