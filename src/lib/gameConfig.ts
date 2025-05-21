/**
 *
 * game config for madame misfortune
 *
 * */

export const GAME_CONFIG_MADAME = {
  AMUSEMENT_ID: 4, // madame misfortune
  GROUP_ID: 5, // sandra & elias
  COST: 1.0,
  CURRENCY: "EUR",
  STAMP_ID: 3, // raven
  CASH_REWARD_PAYOUT: 2.0, // this will perhaps be calculated within the game somehow?
  STAMP_REWARD_PAYOUT: 0.0, // according to backend team even just a stamp amusement (attraction) must have a tiny cash reward, but I will try with zero anyway
};

/**
 *
 * game config for curse of calculus
 *
 * */

export const GAME_CONFIG_CALCULUS = {
  AMUSEMENT_ID: 11, // curse of calculus
  GROUP_ID: 5, // elias & sandra
  COST: 5.0,
  CURRENCY: "EUR",
  STAMP_ID: 20, // platinum pallas cat
  CASH_REWARD_PAYOUT: 2.0, // this will perhaps be calculated within the game somehow?
  STAMP_REWARD_PAYOUT: 0.1, // according to backend team even a stamp must have a tiny cash reward
};
