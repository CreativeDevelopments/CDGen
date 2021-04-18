#!/usr/bin/env node
import { generated } from "./Types/generated.type";
import { getDataReturnValue } from "./Types/getData.return.type";
import { option } from "./Types/option.type";
import { join } from "path";
import ProjectBuilder from "./Project/ProjectBuilder";
import Prompter from "./Utils/Prompter";
import { jsonType } from "./Types/json.type";
import chalk from "chalk";

async function main() {
  const args = process.argv.slice(2);

  if (args.length > 0) {
    const [choice, type] = <getDataReturnValue>args;
    if (choice === "new") {
      const type = <generated>await Prompter.getData(true);
      await handleArgumentsProvided("new", type);
    } else await handleArgumentsProvided(choice, type);
  } else {
    const answer = <getDataReturnValue>await Prompter.getData(false);
    await handleArgumentsProvided(...answer);
  }
}

async function handleArgumentsProvided(choice: option, type: generated) {
  if (choice === "new") {
    const lang = await Prompter.getLanguage();
    ProjectBuilder.buildProject(type, lang);
  } else await ProjectBuilder.genStructure(type);
}

main();
