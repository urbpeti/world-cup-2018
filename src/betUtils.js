/* eslint import/prefer-default-export: 0 */
const { getTeamResults } = require('./API');

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

let teamStats = null;

function teamActualPoint(team) {
  return teamStats.find(stat => stat.country === team).points;
}

function teamWithPoint(team) {
  return `${team} ${teamActualPoint(team)}`;
}

function userPoints(user) {
  return user.bettedCountries.reduce((sum, team) =>
    sum + teamActualPoint(team), 0);
}

export async function convertDataToTable() {
  teamStats = await getTeamResults();
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
