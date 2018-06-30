/* eslint import/prefer-default-export: 0 */
const { getAllMathStatistic } = require('./API');

const bettingGroupsCount = 8;
const users = [
  {
    name: 'Joe',
    value: 'joe',
    bettedCountries: [
      'Argentina',
      'Spain',
      'Switzerland',
      'Uruguay',
      'Egypt',
      'England',
      'Japan',
      'Peru',
    ],
  },
  {
    name: 'Ilcsi',
    value: 'ilcsi',
    bettedCountries: [
      'Argentina',
      'Spain',
      'Sweden',
      'Uruguay',
      'Senegal',
      'England',
      'Japan',
      'Peru',
    ],
  },
  {
    name: 'Viki',
    value: 'viki',
    bettedCountries: [
      'Germany',
      'Spain',
      'Switzerland',
      'Colombia',
      'Egypt',
      'Croatia',
      'Australia',
      'Nigeria',
    ],
  },
  {
    name: 'Dani',
    value: 'dani',
    bettedCountries: [
      'Argentina',
      'France',
      'Denmark',
      'Uruguay',
      'Egypt',
      'England',
      'Australia',
      'Peru',
    ],
  },
  {
    name: 'Peti',
    value: 'peti',
    bettedCountries: [
      'Germany',
      'Belgium',
      'Denmark',
      'Uruguay',
      'Senegal',
      'Croatia',
      'Japan',
      'Peru',
    ],
  }];

let teamPoints = null;

function teamActualPoint(team) {
  return teamPoints[team];
}

function teamWithPoint(team) {
  return `${team} ${teamActualPoint(team)}`;
}

function userPoints(user) {
  return user.bettedCountries.reduce((sum, team) =>
    sum + teamActualPoint(team), 0);
}

function initIfUndefinedTeamPoint(team) {
  if (teamPoints[team] === undefined) {
    teamPoints[team] = 0;
  }
}

function initCountriesPoints(match) {
  initIfUndefinedTeamPoint(match.home_team.country);
  initIfUndefinedTeamPoint(match.away_team.country);
}

function addShutOutPoints(match) {
  if (match.home_team.goals === 0) {
    teamPoints[match.away_team.country] += 1;
  }
  if (match.away_team.goals === 0) {
    teamPoints[match.home_team.country] += 1;
  }
}

async function calcTeamsPoint() {
  if (teamPoints !== null) {
    return;
  }
  teamPoints = {};
  const allmatches = await getAllMathStatistic();
  const finishedMatches = allmatches.filter(match => match.winner !== null);

  finishedMatches.forEach((match) => {
    initCountriesPoints(match);

    if (match.winner === 'Draw') {
      teamPoints[match.home_team.country] += 1;
      teamPoints[match.away_team.country] += 1;
    } else {
      teamPoints[match.winner] += 3;
    }
    addShutOutPoints(match);
  });
}

export async function convertDataToTable() {
  await calcTeamsPoint();
  const headers = users.map(user =>
    ({
      text: user.name,
      value: user.name.toLowerCase(),
      sortable: false,
    }));
  const rows = [];
  for (let i = 0; i < bettingGroupsCount; i += 1) {
    const row = users.reduce((bet, user) =>
      ({ ...bet, [user.value]: teamWithPoint(user.bettedCountries[i]) }), {});
    rows.push(row);
  }

  const sum = users.reduce((sumRow, user) =>
    ({ ...sumRow, [user.value]: userPoints(user) }), {});
  rows.push(sum);
  return {
    headers,
    rows,
  };
}
