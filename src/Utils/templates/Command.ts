import { handlerChoice } from "../../Types/handlerChoice.type";
import { language } from "../../Types/lanuage";

const CommandCDCommandsJS = `const { Command } = require("cdcommands");

module.exports = new Command({
  name: "{name}",
  category: "{category}",
  aliases: ["related", "names"],
  description: "Some basic information on this command",
  details: "Some more detailed information about this command",
  minArgs: 0,
  maxArgs: Infinity,
  usage: "{prefix}{name}",
  noDisable: false,
  userPermissions: ["SEND_MESSAGES"],
  botPermissions: ["SEND_MESSAGES"],
  init: (client) => {
    console.log("This is similar to a feature, but run once when the command is loaded.");
  },
  run: ({ message, args, client, prefix, language }) => {
    console.log("This command works.");
  },
});\n`;

const CommandCDHandlerJS = `const { Command } = require("cdhandler");

module.exports = new Command({
  aliases: ["something", "else"],
  argsMessage: "Some message",
  botPermissions: [],
  botPermissionsMessage: "Some message",
  callback: ({ message, args, client, handler }) => {},
  category: "{category}",
  cooldown: 2,
  cooldownMessage: "",
  description: "",
  dev: false,
  devMessage: "",
  example: "",
  execute: ({ message, args, client, handler }) => {},
  fire: "",
  hidden: false,
  hidden2: false,
  locked: false,
  lockedMessage: "Some message",
  maxArgs: 3,
  minArgs: 3,
  name: "{name}",
  nsfw: false,
  nsfwMessage: "Some message",
  permissions: [""],
  permissionsMessage: "Some message",
  run: ({ message, args, client, handler }) => {},
  usage: "Some usage",
});\n`;

const CommandCDCommandsTS = `import { Command } from "cdcommands";

export default new Command({
  name: "{name}",
  category: "{category}",
  aliases: ["related", "names"],
  description: "Some basic information on this command",
  details: "Some more detailed information about this command",
  minArgs: 0,
  maxArgs: Infinity,
  usage: "{prefix}{name}",
  noDisable: false,
  userPermissions: ["SEND_MESSAGES"],
  botPermissions: ["SEND_MESSAGES"],
  init: (client) => {
    console.log("This is similar to a feature, but run once when the command is loaded.");
  },
  run: ({ message, args, client, prefix, language }) => {
    console.log("This command works.");
  },
});\n`;

const CommandCDHandlerTS = `import { Command } from "cdhandler";

export default new Command({
  aliases: ["something", "else"],
  argsMessage: "Some message",
  botPermissions: [],
  botPermissionsMessage: "Some message",
  callback: ({ message, args, client, handler }) => {},
  category: "{category}",
  cooldown: 2,
  cooldownMessage: "",
  description: "",
  dev: false,
  devMessage: "",
  example: "",
  execute: ({ message, args, client, handler }) => {},
  fire: "",
  hidden: false,
  hidden2: false,
  locked: false,
  lockedMessage: "Some message",
  maxArgs: 3,
  minArgs: 3,
  name: "{name}",
  nsfw: false,
  nsfwMessage: "Some message",
  permissions: [""],
  permissionsMessage: "Some message",
  run: ({ message, args, client, handler }) => {},
  usage: "Some usage",
});\n`;

export function getCommandTemplate(
  handler: handlerChoice,
  language: language,
  name: string,
  category: string,
) {
  if (language === "ts")
    return (handler === "cdcommands" ? CommandCDCommandsTS : CommandCDHandlerTS)
      .replace(/{name}/g, name)
      .replace("{category}", category);
  else
    return (handler === "cdcommands" ? CommandCDCommandsJS : CommandCDHandlerJS)
      .replace(/{name}/g, name)
      .replace("{category}", category);
}
