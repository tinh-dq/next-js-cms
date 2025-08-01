const loginWhitelist = ["/sign-in", "/sign-up", "/forgot-password", "/reset-password"];

export function isWhitelisted(path: string) {
  return loginWhitelist.includes(path);
}
