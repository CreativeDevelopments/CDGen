import { language } from "../../Types/lanuage";
import { ClientEvents } from "discord.js";
import { events_params } from "../Events.Params";

const EventJS = `const { Event } = require("cdcommands");

module.exports = new Event("{event_name}", async (client, {event_params}) => {
  console.log("This event works.");
});\n`;

const EventTS = `import { Event } from 'cdcommands';

export default new Event("{event_name}", (client, {event_params}) => {
  console.log("This event works.");
});\n`;

export function getEventTemplate(
  language: language,
  event: keyof ClientEvents,
) {
  if (language === "ts")
    return EventTS.replace("{event_name}", event).replace(
      "{event_params}",
      events_params[event],
    );
  else
    return EventJS.replace("{event_name}", event).replace(
      "{event_params}",
      events_params[event],
    );
}
