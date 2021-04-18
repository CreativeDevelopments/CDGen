import { handlerChoice } from "./handlerChoice.type";

export type jsonType = {
  events: string;
  commands: string;
  features: string;
  handler: handlerChoice;
  language: "js" | "ts";
};
