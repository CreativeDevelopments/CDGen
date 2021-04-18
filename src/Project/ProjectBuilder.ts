import { generated } from "../Types/generated.type";
import { language } from "../Types/lanuage";
import { PackageHandler } from "../Utils/HandlePackages";
import Prompter from "../Utils/Prompter";
import { mkdirSync, writeFileSync, existsSync } from "fs";
import { join } from "path";
import chalk from "chalk";
import {
  getMainTemplate,
  getEnvTemplate,
  getCommandTemplate,
  getEventTemplate,
  getFeatureTemplate,
  getCDConfig,
} from "../Utils/templates";
import prompts from "prompts";
import { jsonType } from "../Types/json.type";
import { handlerChoice } from "../Types/handlerChoice.type";

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

    this.genCDConfig(
      language,
      root_path,
      handler_choice,
      commands,
      events,
      features,
    );
    await this.genEnv(root_path, ...env);
    await this.genMain(
      language,
      root_path,
      handler_choice,
      prefix,
      commands,
      events,
      features,
    );

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

  static async genStructure(structure: generated) {
    const config_file = join(process.cwd(), "CDConfig.json");
    try {
      require(config_file);
    } catch (err) {
      throw new Error("The current directory is not a valid cdgen project.");
    }
    switch (structure) {
      case "command":
        await this.genCommand();
        break;
      case "event":
        await this.genEvent();
        break;
      case "feature":
        await this.genFeature();
        break;
    }
  }

  private static async genMain(
    language: language,
    root: string,
    handler: handlerChoice,
    prefix: string,
    ...paths: [string, string, string]
  ) {
    const template = getMainTemplate(language, prefix, handler, ...paths);
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
    handler: handlerChoice,
    ...args: [string, string, string]
  ) {
    writeFileSync(
      join(root, "CDConfig.json"),
      getCDConfig(language, handler, ...args),
    );
  }

  private static async genEvent() {
    const root = process.cwd();

    const json_config: jsonType = await import(join(root, "CDConfig.json"));
    const language = json_config.language;

    const event = await Prompter.getEventType();
    const event_template = getEventTemplate(language, event);

    const path = join(root, "src", json_config.events);

    if (existsSync(join(path, `${event}.${language}`))) {
      const overwrite = await Prompter.overWriteWarning();
      if (!overwrite)
        return console.log(chalk.bold(chalk.red(`Canceled Operation.`)));
    }

    writeFileSync(join(path, `${event}.${language}`), event_template);

    console.log(
      chalk.bold(
        `Successfully generated event "${event}" at path "${join(
          path,
          `${event}.${language}`,
        )}".`,
      ),
    );
  }

  private static async genCommand() {
    const root = process.cwd();
    const json_config: jsonType = await import(join(root, "CDConfig.json"));
    const language = json_config.language;

    const [name, category] = await Prompter.getCommandData();

    const commandTemplate = getCommandTemplate(language, name, category);

    const path = join(root, "src", json_config.commands, category);

    if (!existsSync(path)) mkdirSync(path);

    if (existsSync(join(path, `${name}.${language}`))) {
      const overwrite = await Prompter.overWriteWarning();
      if (!overwrite)
        return console.log(chalk.bold(chalk.red(`Canceled Operation.`)));
    }

    writeFileSync(join(path, `${name}.${language}`), commandTemplate);

    console.log(
      chalk.bold(
        `Successfully generated command "${name}" at path ${join(
          path,
          `${name}.${language}`,
        )}`,
      ),
    );
  }

  private static async genFeature() {
    const root = process.cwd();
    const json_config: jsonType = await import(join(root, "CDConfig.json"));
    const language = json_config.language;

    const feature_name = await Prompter.getFeatureName();
    const feature_template = getFeatureTemplate(language, json_config.handler);

    const path = join(
      root,
      "src",
      json_config.features,
      `${feature_name}.${language}`,
    );

    if (existsSync(path)) {
      const overwrite = await Prompter.overWriteWarning();
      if (!overwrite)
        return console.log(chalk.bold(chalk.red(`Canceled Operation.`)));
    }

    writeFileSync(path, feature_template);

    console.log(
      chalk.bold(
        `Successfully generated feature "${feature_name}" at path "${path}"`,
      ),
    );
  }
}

export default ProjectBuilder;
