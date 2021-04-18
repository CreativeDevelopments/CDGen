import prompts from "prompts";
import { getDataReturnValue } from "../Types/getData.return.type";
import { handlerChoice } from "../Types/handlerChoice.type";
import { language } from "../Types/lanuage";
import { packageHandlerType } from "../Types/package.handler.type";
import { tokenUri } from "../Types/tokenUri.type";
import {
  get_prefix,
  handler,
  language as lang,
  package_handler,
  questions,
  token_uri,
} from "./prompts";

class Prompter {
  static async getData(): Promise<getDataReturnValue> {
    const { option, data } = await prompts(questions);
    return [option, data];
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
}

export default Prompter;
