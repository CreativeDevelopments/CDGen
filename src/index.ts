#!/usr/bin/env node
import { generated } from "./Types/generated.type";
import { getDataReturnValue } from "./Types/getData.return.type";
import { option } from "./Types/option.type";
import ProjectBuilder from "./Project/ProjectBuilder";
import Prompter from "./Utils/Prompter";

async function main() {
  const args = process.argv.slice(2);

  if (args.length > 0) {
    const [choice, type] = <getDataReturnValue>args;
    //@ts-ignore
    if (choice === "create" || choice === "new") {
      const type = <generated>await Prompter.getData(true);
      await handleArgumentsProvided("create", type);
    } else await handleArgumentsProvided(choice, type);
  } else {
    const answer = <getDataReturnValue>await Prompter.getData(false);
    await handleArgumentsProvided(...answer);
  }
}

async function handleArgumentsProvided(choice: option, type: generated) {
  if (!type && choice && choice === "gen")
    type = (await Prompter.getGenType()) as generated;

  if (choice === "create") {
    const lang = await Prompter.getLanguage();
    ProjectBuilder.buildProject(type, lang);
  } else await ProjectBuilder.genStructure(type);
}

main();
