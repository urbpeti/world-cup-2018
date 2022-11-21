/* eslint import/prefer-default-export: 0 */

const TODAYS_MATHES_URL = 'https://worldcupjson.net/matches/today';
const TEAM_RESULTS_URL = 'https://worldcupjson.net/teams';
const ALL_MATH_STAT_URL = 'https://worldcupjson.net/matches';

export async function getTodaysMatches() {
  try {
    const response = await fetch(TODAYS_MATHES_URL);
    return response.json();
  } catch (error) {
    console.error(error);
    return error;
  }
}

export async function getTeamResults() {
  try {
    const response = await fetch(TEAM_RESULTS_URL);
    return response.json();
  } catch (error) {
    console.error(error);
    return error;
  }
}

export async function getAllMathStatistic() {
  try {
    const response = await fetch(ALL_MATH_STAT_URL);
    return response.json();
  } catch (error) {
    console.error(error);
    return error;
  }
}
