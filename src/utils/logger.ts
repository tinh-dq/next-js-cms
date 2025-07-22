import log from "loglevel";

log.setLevel(process.env.NODE_ENV === "production" ? log.levels.INFO : log.levels.DEBUG);

export const logger = log;
