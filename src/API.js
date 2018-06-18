/* eslint import/prefer-default-export: 0 */

const TODAYS_MATHES_URL = 'http://worldcup.sfg.io/matches/today';
const TEAM_RESULTS_URL = 'http://worldcup.sfg.io/teams/results';

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
