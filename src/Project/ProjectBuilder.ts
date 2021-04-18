import { generated } from "../Types/generated.type";
import { language } from "../Types/lanuage";
import { PackageHandler } from "../Utils/HandlePackages";
import Prompter from "../Utils/Prompter";
import { mkdirSync, writeFileSync } from "fs";
import { join } from "path";
import chalk from "chalk";
import {
  EventJS,
  CommandJS,
  FeatureJS,
  getMainTemplate,
  getEnvTemplate,
  FeatureTS,
  CommandTS,
  EventTS,
} from "../Utils/templates";
import prompts from "prompts";

class ProjectBuilder {
  static async buildProject(proj_name: string, language: language) {
    const package_manager = await Prompter.getPackageManager();
    const handler_choice = await Prompter.getHandler();

    const root_path = join(process.cwd(), proj_name);

    mkdirSync(root_path);

    console.log(chalk.bold("Installing main dependencies..."));
    new PackageHandler(proj_name, package_manager, handler_choice, language);

    const env = await Prompter.getTokenAndURI();
    const prefix = await Prompter.getPrefix();

    console.log(chalk.bold("Generating main project..."));

    await this.genEnv(root_path, ...env);
    await this.genMain(language, root_path, prefix);

    mkdirSync(join(root_path, "src", "commands"));
    mkdirSync(join(root_path, "src", "events"));
    mkdirSync(join(root_path, "src", "features"));

    console.log(
      chalk.green("√") +
        chalk.white(
          chalk.bold(
            ` Successfully created new project ` +
              chalk.green(`"${proj_name}"`) +
              `. Use "cd ${proj_name}"`,
          ),
        ),
    );
  }

  static genStructure(structure: generated, language: language) {
    switch (structure) {
      case "command":
        this.genCommand(language);
        break;
      case "event":
        this.genEvent(language);
        break;
      case "feature":
        this.genFeature(language);
        break;
    }
  }

  private static async genMain(
    language: language,
    root: string,
    prefix: string,
  ) {
    const template = getMainTemplate(language, prefix);
    const src = join(root, "src");
    mkdirSync(src);
    writeFileSync(
      join(src, language === "ts" ? "index.ts" : "index.js"),
      template,
    );
  }

  private static async genEnv(root: string, token: string, uri: string) {
    writeFileSync(join(root, ".env"), getEnvTemplate(token, uri));
  }

  private static genEvent(language: language) {}
  private static genCommand(language: language) {}
  private static genFeature(language: language) {}
}

export default ProjectBuilder;
