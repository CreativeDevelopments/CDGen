import { packageHandlerType } from "../Types/package.handler.type";
import { execSync } from "child_process";
import { handlerChoice } from "../Types/handlerChoice.type";

export class PackageHandler {
  private file_path: string = require.main?.path + "/src";
  private package_handler: packageHandlerType = "npm";
  private handler_choice: handlerChoice = "cdcommands";

  constructor(
    file_path: string,
    package_handler: packageHandlerType,
    handler_choice: handlerChoice,
  ) {
    this.file_path = file_path;
    this.package_handler = package_handler;
    this.handler_choice = handler_choice;

    this.setup();
  }

  private setup(): void {
    if (this.package_handler === "npm") this.initNPM();
    else this.initYARN();
  }

  private initNPM(): void {}
  private initYARN(): void {}
}
