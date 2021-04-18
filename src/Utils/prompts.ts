import { PromptObject } from "prompts";
import { events_params } from "./Events.Params";

export const question: PromptObject = {
  type: "text",
  name: "data",
  message: "What would you like to call your project?",
  validate: (v: string) =>
    v.length === 0 ? "Your project name can't be empty!" : true,
};

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

export const paths: PromptObject[] = [
  {
    name: "commands",
    type: "text",
    message: "Where do you want your commands stored?",
    validate: (v: string) =>
      v.length === 0 ? "Commands path may not be empty!" : true,
  },
  {
    name: "events",
    type: "text",
    message: "Where do you want your events stored?",
    validate: (v: string) =>
      v.length === 0 ? "Events path may not be empty!" : true,
  },
  {
    name: "features",
    type: "text",
    message: "Where do you want your features stored?",
    validate: (v: string) =>
      v.length === 0 ? "Features path may not be empty!" : true,
  },
];

export const event_type: PromptObject = {
  name: "event",
  type: "select",
  message: "What event would you like to generate?",
  choices: Object.keys(events_params).map((event) => ({
    value: event,
    title: event.toUpperCase(),
    description: `Select the ${event} event.`,
  })),
};

export const get_prefix: PromptObject = {
  name: "prefix",
  type: "text",
  message: "What do you want your bots prefix to be?",
  validate: (v: string) => (v.length === 0 ? "Prefix may not be empty!" : true),
};

export const token_uri: PromptObject[] = [
  {
    name: "token",
    type: "text",
    message: "What is your bot token?",
    validate: (v: string) =>
      v.length === 0 ? "Token may not be empty!" : true,
  },
  {
    name: "uri",
    type: "text",
    message: "What is your mongoose uri?",
    validate: (v: string) =>
      v.length === 0 ? "Token may not be empty!" : true,
  },
];

export const handler: PromptObject = {
  name: "handler",
  type: "select",
  message: "What command/event handler would you like to use?",
  choices: [
    {
      title: "CDCommands",
      value: "cdcommands",
      description: "Select CDCommands for your command/event handler.",
    },
    {
      title: "CDHandler",
      value: "cdhandler",
      description: "Select CDHandler for your command/event handler.",
    },
  ],
};

export const package_handler: PromptObject = {
  name: "package",
  type: "select",
  message: "What package manager do you use?",
  choices: [
    {
      title: "NPM",
      value: "npm",
      description: "Select NPM for your package manager",
    },
    {
      title: "Yarn",
      value: "yarn",
      description: "Select Yarn for your package manager",
    },
  ],
};

export const language: PromptObject = {
  name: "choice",
  type: "select",
  message: "What language do you use?",
  choices: [
    {
      title: "JavaScript",
      value: "js",
      description: "Select JavaScript",
    },
    {
      title: "TypeScript",
      value: "ts",
      description: "Select TypeScript",
    },
  ],
};
