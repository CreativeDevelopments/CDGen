#!/usr/bin/env node
import { generated } from "./Types/generated.type";
import { getDataReturnValue } from "./Types/getData.return.type";
import { option } from "./Types/option.type";
import ProjectBuilder from "./Project/ProjectBuilder";
import Prompter from "./Utils/Prompter";

async function main() {
  const args = process.argv.slice(2);

  if (args.length > 0) {
    if (args.length < 2) throw new Error("Invalid Argument Size.");

    const [choice, type] = <getDataReturnValue>args.splice(2);
    await handleArgumentsProvided(choice, type);
  } else {
    const answer = await Prompter.getData();
    await handleArgumentsProvided(...answer);
  }
}

async function handleArgumentsProvided(choice: option, type: generated) {
  const lang = await Prompter.getLanguage();

  if (choice === "new") ProjectBuilder.buildProject(type, lang);
  else {
  }
}

main();
