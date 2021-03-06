/* eslint import/prefer-default-export: 0 */
const { getAllMathStatistic } = require('./API');
const { users } = require('./bettingDatas');

const bettingGroupsCount = 8;

let teamPoints = null;

function teamActualPoint(team) {
  return teamPoints[team];
}

function teamWithPoint(team) {
  return `${team} ${teamActualPoint(team)}`;
}

function userPoints(user) {
  return user.bettedCountries.reduce((sum, team) => sum + teamActualPoint(team), 0);
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

function isPeanlties(match) {
  return match.home_team.penalties + match.away_team.penalties > 0;
}

async function calcTeamsPoint() {
  if (teamPoints !== null) {
    return;
  }
  teamPoints = {};
  const allmatches = await getAllMathStatistic();
  const finishedMatches = allmatches.filter(match => match.winner !== null);

  finishedMatches.forEach(match => {
    initCountriesPoints(match);

    if (match.winner === 'Draw') {
      teamPoints[match.away_team.country] += 1;
      teamPoints[match.home_team.country] += 1;
    } else {
      teamPoints[match.winner] += 3;
    }

    if (isPeanlties(match)) {
      teamPoints[match.away_team.country] += 1;
      teamPoints[match.home_team.country] += 1;
      teamPoints[match.winner] -= 1;
    }
    addShutOutPoints(match);
  });
}

export async function convertDataToTable() {
  await calcTeamsPoint();
  const headers = [
    {
      text: 'Entrant',
      value: 'name',
    },
    {
      text: 'Points',
      value: 'points',
    },
    {
      text: 'Group 1',
      value: 'group1',
    },
    {
      text: 'Group 2',
      value: 'group2',
    },
    {
      text: 'Group 3',
      value: 'group3',
    },
    {
      text: 'Group 4',
      value: 'group4',
    },
    {
      text: 'Group 5',
      value: 'group5',
    },
    {
      text: 'Group 6',
      value: 'group6',
    },
    {
      text: 'Group 7',
      value: 'group7',
    },
    {
      text: 'Group 8',
      value: 'group8',
    },
  ];

  const usersWithData = users.map(user => {
    const userWithTeamsAndPoints = user;
    for (let i = 0; i < bettingGroupsCount; i += 1) {
      userWithTeamsAndPoints[`group${i + 1}`] = teamWithPoint(user.bettedCountries[i]);
      userWithTeamsAndPoints.points = userPoints(user);
    }
    return userWithTeamsAndPoints;
  });

  usersWithData.sort((a, b) => b.points - a.points);
  const rows = usersWithData;
  return {
    headers,
    rows,
  };
}
