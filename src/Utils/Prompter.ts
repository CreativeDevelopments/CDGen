import { ClientEvents } from "discord.js";
import prompts from "prompts";
import { generated } from "../Types/generated.type";
import { getDataReturnValue } from "../Types/getData.return.type";
import { handlerChoice } from "../Types/handlerChoice.type";
import { language } from "../Types/lanuage";
import { packageHandlerType } from "../Types/package.handler.type";
import { tokenUri } from "../Types/tokenUri.type";
import {
  event_type,
  feature_name,
  get_prefix,
  handler,
  language as lang,
  package_handler,
  paths,
  question,
  questions,
  token_uri,
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
    return [commands ?? "commands", events ?? "events", features ?? "features"];
  }

  static async getFeatureName(): Promise<string> {
    const { feature } = await prompts(feature_name);
    return feature;
  }
}

export default Prompter;
