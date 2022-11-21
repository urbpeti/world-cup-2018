<template>
  <v-layout wrap justify-space-between>
    <v-flex class="xs12 mt-2">
      <v-card>
        <v-card-title>Today's Games</v-card-title>
        <v-list>
          <template v-for="match in todaysMatches">
            <div :key="match.fifa_id">
              <p class="ml-2">{{ match.datetime }}</p>
              <v-list-tile>
                <v-layout justify-space-between>
                  <div>{{ match.home_team.country }}</div>
                  <div>{{ match.home_team.goals }} - {{ match.away_team.goals }}</div>
                  <div>{{ match.away_team.country }}</div>
                </v-layout>
              </v-list-tile>
            </div>
          </template>
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { getTodaysMatches } from '../API';

function dateFormatToHUN(date) {
  return `${date.toLocaleString('HU')}`;
}

export default {
  data: () => ({
    todaysMatches: [],
  }),
  mounted() {
    this.getTodaysMatches();
  },
  methods: {
    async getTodaysMatches() {
      const data = await getTodaysMatches();
      this.todaysMatches = data.map(match => ({
        ...match,
        datetime: dateFormatToHUN(new Date(match.datetime)),
      }));
    },
  },
};

</script>
