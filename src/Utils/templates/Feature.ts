import { language } from "../../Types/lanuage";

const FeatureJS = `const { Feature } = require("cdcommands");

module.exports = new Feature((client) => {
    console.log("This is a feature! It is run once on start!");
});\n`;

const FeatureTS = `import { Feature } from "cdcommands";

export default new Feature((client) => {
    console.log("This is a feature! It is run once on start!");
});\n`;

export function getFeatureTemplate(language: language) {
  if (language === "ts") return FeatureTS;
  else return FeatureJS;
}
