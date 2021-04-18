import { language } from "../../Types/lanuage";

const MainJS = `const { Client } = require("discord.js");
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
  });
  
  console.log(\`\${client.user.tag} has logged in!\`);
});

client.login(process.env.TOKEN);\n`;

const MainTS = `import { Client } from "discord.js";
import { CDCommands } from "cdcommands";
import "dotenv/config";

const client = new Client();

client.on("ready", () => {
  new CDCommands(client, {
    commandsDir: "{commands}",
    eventsDir: "{events}",
    featuresDir: "{features}",
    defaultPrefix: "{prefix}",
    mongoURI: process.env.MONGO_URI,
  });

  console.log(\`\${client.user?.tag} has logged in!\`);
});

client.login(process.env.TOKEN);\n`;

export function getMainTemplate(
  language: language,
  prefix: string,
  ...paths: [string, string, string]
) {
  const [commands, events, features] = paths;

  if (language === "ts")
    return MainTS.replace("{prefix}", prefix)
      .replace("{commands}", commands)
      .replace("{events}", events)
      .replace("{features}", features);
  else
    return MainJS.replace("{prefix}", prefix)
      .replace("{commands}", commands)
      .replace("{events}", events)
      .replace("{features}", features);
}
