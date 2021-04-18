const cd_config = `{
  "commands": "{commands_path}",
  "events": "{events_path}",
  "features": "{features_path}",
  "language": "{lang}"
}`;

export function getCDConfig(
  language: "js" | "ts",
  commands_path: string,
  events_path: string,
  features_path: string,
): string {
  return cd_config
    .replace("{commands_path}", commands_path)
    .replace("{events_path}", events_path)
    .replace("{features_path}", features_path)
    .replace("{lang}", language);
}
