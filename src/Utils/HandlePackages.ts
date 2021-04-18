import { packageHandlerType } from "../Types/package.handler.type";
import { execSync } from "child_process";
import { handlerChoice } from "../Types/handlerChoice.type";
import { language } from "../Types/lanuage";

export class PackageHandler {
  private file_path: string = require.main?.path + "/src";
  private package_handler: packageHandlerType = "npm";
  private handler_choice: handlerChoice = "cdcommands";
  private langauge: language = "ts";

  constructor(
    file_path: string,
    package_handler: packageHandlerType,
    handler_choice: handlerChoice,
    language: language,
  ) {
    this.file_path = file_path;
    this.package_handler = package_handler;
    this.handler_choice = handler_choice;
    this.langauge = language;

    this.setup();
  }

  private setup(): void {
    if (this.package_handler === "npm") this.initNPM();
    else this.initYARN();
  }

  private initNPM(): void {
    execSync(`cd ${this.file_path} && npm init -y`);
    execSync(`cd ${this.file_path} && npm i discord.js`);
    execSync(`cd ${this.file_path} && npm i dotenv`);
    execSync(`cd ${this.file_path} && npm i ${this.handler_choice}`);
    if (this.langauge === "ts") {
      execSync(`cd ${this.file_path} && npm i @types/node --save-dev`);
      execSync(`cd ${this.file_path} && npm i @types/dotenv --save-dev`);
      execSync(`cd ${this.file_path} && tsc -init`);
    }
  }

  private initYARN(): void {
    execSync(`cd ${this.file_path} && yarn init`);
    execSync(`cd ${this.file_path} && yarn add discord.js`);
    execSync(`cd ${this.file_path} && yarn add dotenv`);
    execSync(`cd ${this.file_path} && yarn add ${this.handler_choice}`);
    if (this.langauge === "ts") {
      execSync(`cd ${this.file_path} && yarn add @types/node --dev`);
      execSync(`cd ${this.file_path} && yarn add @types/dotenv --dev`);
      execSync(`cd ${this.file_path} && tsc -init`);
    }
  }
}
