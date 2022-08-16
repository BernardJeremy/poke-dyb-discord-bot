declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production',
      BOT_TOKEN: string, // Discord bot token
      DUST_EMOJI_ID: string, // Dust discord emoji id (ex : <:dust:1001431763861643334>)
      COIN_EMOJI_ID: string, // Coin discord emoji id (ex : <:pokedollar:1001433965711859762>)
      JSON_DB_FILE: string, // JSON DB file path
      DAILY_GOLD_AMOUNT: string, // Amount of gold won for each daily
      DAILY_DUST_AMOUNT: string, // Amount of dust won for each daily
      BONUS_GOLD_AMOUNT: string, // Amount of gold won for each bonus
      BONUS_DUST_AMOUNT: string, // Amount of dust won for each bonus
      RANDOM_CARD_COST: string, // Cost of a random card (!invoc)
      TOWER_ENTRIES_EACH_DAY: string, // Cost of a tower run
      TICKETS_WON_ON_FAILED_TOWER: string, // Number of tickets won when failing a tower run
      TOWER_REP_GAIN_TRY: string, // Reputation gained on a failed tower run
      TOWER_REP_GAIN_CLEAR: string, // Reputation gained on a succesfull tower run
      TOWER_REP_GAIN_CLEAR_LAST_FLOOR: string, // Reputation gained on a 6th succesfull tower run
      SAFARI_TICKETS_COST: string, // Cost of a safari encounter
      SAFARI_STARTING_BALL_NBR: string, // Number of safari ball at encounter start
      SAFARI_STARTING_CATCH_RATE: string, // Catch rate at encounter start
      SAFARI_STARTING_ESCAPE_RATE: string, // Escape rate at encounter start
      SAFARI_POKEMON_MIN_RARITY: string, // Minimum rarity for a safary encounter
      SAFARI_POKEMON_MAX_RARITY: string, // Maximum rarity for a safary encounter
      EXPRESS_PORT: string, // HTTP port
      HTTP_ROUTE_SUFFIX: string, // HTTP route suffix
      GOOGLE_APPLICATION_CREDENTIALS: string, // Path to GCP service account json key
      SPREADSHEET_ID: string, // ID of GDOC spreadsheet
      POKEDEX_SHEET_NAME: string, // Name of the pokedex spreadsheet
    }
  }
}

export {};
