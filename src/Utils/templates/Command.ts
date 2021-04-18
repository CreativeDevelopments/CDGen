import { language } from "../../Types/lanuage";

const CommandJS = `const { Command } = require("cdcommands");

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

const CommandTS = `import { Command } from "cdcommands";

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

export function getCommandTemplate(
  language: language,
  name: string,
  category: string,
) {
  if (language === "ts")
    return CommandTS.replace(/{name}/g, name).replace("{category}", category);
  else
    return CommandJS.replace(/{name}/g, name).replace("{category}", category);
}
