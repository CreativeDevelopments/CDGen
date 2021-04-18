const EnvTemplate = `TOKEN={token}\nMONGO_URI={mongo_uri}`;

export function getEnvTemplate(token: string, uri: string) {
  return EnvTemplate.replace("{token}", token).replace("{mongo_uri}", uri);
}
