import prompts from "prompts";
import { getDataReturnValue } from "../Types/getData.return.type";
import { questions } from "./prompts";

class Prompter {
  static async getData(): Promise<getDataReturnValue> {
    const { option, data } = await prompts(questions);
    // console.log(data);
    return [option, data];
  }
}

export default Prompter;

// (async () => console.log(await Prompter.getData()))();
