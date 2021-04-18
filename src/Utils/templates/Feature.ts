import { handlerChoice } from "../../Types/handlerChoice.type";
import { language } from "../../Types/lanuage";

const FeatureCDCommandsJS = `const { Feature } = require("cdcommands");

module.exports = new Feature((client) => {
  console.log("This is a feature! It is run once on start!");
});\n`;

const FeatureCDHandlerJS = `module.exports = (client) => {
  console.log("This is a feature! It is run once on start!");
};\n`;

const FeatureCDCommandsTS = `import { Feature } from "cdcommands";

export default new Feature((client) => {
  console.log("This is a feature! It is run once on start!");
});\n`;

const FeatureCDHandlerTS = `import { Client } from "discord.js";

export default (client: Client) => {
  console.log("This is a feature! It is run once on start!");
};\n`;

export function getFeatureTemplate(language: language, handler: handlerChoice) {
  if (language === "ts")
    return handler === "cdcommands" ? FeatureCDCommandsTS : FeatureCDHandlerTS;
  else
    return handler === "cdcommands" ? FeatureCDCommandsJS : FeatureCDHandlerJS;
}
