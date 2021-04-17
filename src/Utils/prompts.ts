import { PromptObject } from "prompts";

export const questions: Array<PromptObject> = [
  {
    name: "option",
    message: "What would you like to do?",
    type: "select",
    choices: [
      {
        title: "New",
        description: "Create a new Discord Bot Project",
        value: "new",
      },
      {
        title: "Generate",
        description: "Generate a new component for your existing project",
        value: "gen",
      },
    ],
  },
  {
    type: (previous: string) => (previous === "new" ? "text" : null),
    name: "data",
    message: "What would you like to call your project?",
    validate: (v: string) =>
      v.length === 0 ? "Your project name can't be empty!" : true,
  },
  {
    type: (previous: string) => (previous === "gen" ? "select" : null),
    name: "data",
    message: "What would you like to create?",
    choices: [
      {
        title: "Event",
        value: "event",
        description: "Generate an Event.",
      },
      {
        title: "Feature",
        value: "feature",
        description: "Generate a Feature.",
      },
      {
        title: "Command",
        value: "command",
        description: "Generate a Command.",
      },
    ],
  },
];
