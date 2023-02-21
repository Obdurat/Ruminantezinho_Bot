declare global {
  namespace NodeJS {
    interface ProcessEnv {
      BOT_TOKEN: string;
      CLIENT_ID: string;
      GUILD_ID: string;
      GPT_URL: string;
      GPT_KEY: string;
    }
  }
}

export {}