declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production',
      BOT_TOKEN: string,
      DUST_EMOJI_ID: string,
      COIN_EMOJI_ID: string,
      JSON_DB_FILE: string,
      DAILY_GOLD_AMOUNT: string,
      DAILY_DUST_AMOUNT: string,
      BONUS_GOLD_AMOUNT: string,
      BONUS_DUST_AMOUNT: string,
      RANDOM_CARD_COST: string,
      TOWER_ENTRIES_EACH_DAY: string,
      TICKETS_WON_ON_FAILED_TOWER: string,
      TOWER_REP_GAIN_TRY: string,
      TOWER_REP_GAIN_CLEAR: string,
      TOWER_REP_GAIN_CLEAR_LAST_FLOOR: string,
      EXPRESS_PORT: string,
      HTTP_ROUTE_SUFFIX: string,
      GOOGLE_APPLICATION_CREDENTIALS: string,
      SPREADSHEET_ID: string,
      POKEDEX_SHEET_NAME: string,
    }
  }
}

export {};
