import { language } from "../../Types/lanuage";
import { ClientEvents } from "discord.js";
import { events_params } from "../Events.Params";
import { handlerChoice } from "../../Types/handlerChoice.type";

const EventCDCommandsJS = `const { Event } = require("cdcommands");

module.exports = new Event("{event_name}", async (client, {event_params}) => {
  console.log("This event works.");
});\n`;

const EventCDHandlerJS = `module.exports = async (client, {event_params}) => {
  console.log("This event works.");
};`;

const EventCDCommandsTS = `import { Event } from 'cdcommands';

export default new Event("{event_name}", (client, {event_params}) => {
  console.log("This event works.");
});\n`;

const EventCDHandlerTS = `import { Client } from "discord.js";

export default (client: Client, {event_params}) => {
  console.log("This event works.");
};`;

export function getEventTemplate(
  language: language,
  handler: handlerChoice,
  event: keyof ClientEvents,
) {
  if (language === "ts")
    return (handler === "cdcommands" ? EventCDCommandsTS : EventCDHandlerTS)
      .replace("{event_name}", event)
      .replace("{event_params}", events_params[event]);
  else
    return (handler === "cdcommands" ? EventCDCommandsJS : EventCDHandlerJS)
      .replace("{event_name}", event)
      .replace("{event_params}", events_params[event]);
}
