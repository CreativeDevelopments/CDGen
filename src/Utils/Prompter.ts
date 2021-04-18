import { ClientEvents } from "discord.js";
import prompts from "prompts";
import { generated } from "../Types/generated.type";
import { getDataReturnValue } from "../Types/getData.return.type";
import { handlerChoice } from "../Types/handlerChoice.type";
import { language } from "../Types/lanuage";
import { packageHandlerType } from "../Types/package.handler.type";
import { tokenUri } from "../Types/tokenUri.type";
import {
  command_data,
  event_type,
  feature_name,
  get_prefix,
  handler,
  language as lang,
  overwrite_warning,
  package_handler,
  paths,
  question,
  questions,
  token_uri,
  type_only,
} from "./prompts";

class Prompter {
  static async getData(
    short: boolean,
  ): Promise<getDataReturnValue | generated> {
    if (short) {
      const { data } = await prompts(question);
      return data;
    } else {
      const { option, data } = await prompts(questions);
      return [option, data];
    }
  }

  static async getGenType(): Promise<string> {
    const { type } = await prompts(type_only);
    return type;
  }

  static async getLanguage(): Promise<language> {
    const { choice } = await prompts(lang);
    return choice;
  }

  static async getPackageManager(): Promise<packageHandlerType> {
    const { package: pkg } = await prompts(package_handler);
    return pkg;
  }

  static async getHandler(): Promise<handlerChoice> {
    const { handler: handle } = await prompts(handler);
    return handle;
  }

  static async getTokenAndURI(): Promise<tokenUri> {
    const { token, uri } = await prompts(token_uri);
    return [token, uri];
  }

  static async getPrefix(): Promise<string> {
    const { prefix } = await prompts(get_prefix);
    return prefix;
  }

  static async getEventType(): Promise<keyof ClientEvents> {
    const { event } = await prompts(event_type);
    return event;
  }

  static async getPaths(): Promise<[string, string, string]> {
    const { commands, events, features } = await prompts(paths);
    return [
      commands.length > 0 ? commands : "commands",
      events.length > 0 ? events : "events",
      features.length > 0 ? features : "features",
    ];
  }

  static async getFeatureName(): Promise<string> {
    const { feature } = await prompts(feature_name);
    return feature;
  }

  static async getCommandData(): Promise<[string, string]> {
    const { name, category } = await prompts(command_data);
    return [name, category];
  }

  static async overWriteWarning(): Promise<boolean> {
    const { overwrite } = await prompts(overwrite_warning);
    return overwrite;
  }
}

export default Prompter;
