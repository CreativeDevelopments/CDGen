import { generated } from "../Types/generated.type";
import { language } from "../Types/lanuage";
import { PackageHandler } from "../Utils/HandlePackages";
import Prompter from "../Utils/Prompter";
import { mkdirSync, writeFileSync, existsSync } from "fs";
import { join } from "path";
import chalk from "chalk";
import {
  CommandJS,
  getMainTemplate,
  getEnvTemplate,
  getEventTemplate,
  getFeatureTemplate,
  CommandTS,
  getCDConfig,
} from "../Utils/templates";
import prompts from "prompts";
import { jsonType } from "../Types/json.type";

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
    const [commands, events, features] = await Prompter.getPaths();

    console.log(chalk.bold("Generating main project..."));

    this.genCDConfig(language, root_path, commands, events, features);
    await this.genEnv(root_path, ...env);
    await this.genMain(language, root_path, prefix, commands, events, features);

    mkdirSync(join(root_path, "src", commands));
    mkdirSync(join(root_path, "src", events));
    mkdirSync(join(root_path, "src", features));

    console.log(
      chalk.green("√") +
        chalk.white(
          chalk.bold(
            ` Successfully created new project ` +
              chalk.green(`"${proj_name}"`) +
              `. Use "cd ${proj_name}" to enter your root directory\n`,
          ),
          chalk.bold(
            ` Use ${chalk.cyanBright(
              "cdgen gen",
            )} to generate a new event, command, or feature!`,
          ),
        ),
    );
  }

  static async genStructure(structure: generated, language: language) {
    const config_file = join(process.cwd(), "CDConfig.json");
    try {
      require(config_file);
    } catch (err) {
      throw new Error("The current directory is not a valid cdgen project.");
    }
    switch (structure) {
      case "command":
        await this.genCommand(language);
        break;
      case "event":
        await this.genEvent(language);
        break;
      case "feature":
        await this.genFeature(language);
        break;
    }
  }

  private static async genMain(
    language: language,
    root: string,
    prefix: string,
    ...paths: [string, string, string]
  ) {
    const template = getMainTemplate(language, prefix, ...paths);
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

  private static async genCDConfig(
    language: "js" | "ts",
    root: string,
    ...args: [string, string, string]
  ) {
    writeFileSync(join(root, "CDConfig.json"), getCDConfig(language, ...args));
  }

  private static async genEvent(language: language) {
    const root = process.cwd();

    const json_config: jsonType = await import(join(root, "CDConfig.json"));

    const event = await Prompter.getEventType();
    const event_template = getEventTemplate(language, event);

    const path = join(root, "src", json_config.events);

    if (existsSync(join(path, `${event}.${language}`)))
      throw new Error(`Event "${event}" already exists.`);
    else writeFileSync(join(path, `${event}.${language}`), event_template);

    console.log(
      chalk.bold(
        `Successfully generated event "${event}" at path "${join(
          path,
          `${event}.${language}`,
        )}".`,
      ),
    );
  }

  private static async genCommand(language: language) {}

  private static async genFeature(language: language) {
    const root = process.cwd();
    const json_config: jsonType = await import(join(root, "CDConfig.json"));

    const feature_name = await Prompter.getFeatureName();
    const feature_template = getFeatureTemplate(language);

    const path = join(
      root,
      "src",
      json_config.features,
      `${feature_name}.${language}`,
    );

    if (existsSync(path))
      throw new Error(`A feature with name "${feature_name}" already exists.`);
    else writeFileSync(path, feature_template);

    console.log(
      chalk.bold(
        `Successfully generated feature "${feature_name}" at path "${path}"`,
      ),
    );
  }
}

export default ProjectBuilder;
