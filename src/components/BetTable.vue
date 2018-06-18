<template>
  <v-data-table
    :headers="headers"
    :items="bets"
    hide-actions
  >
    <template slot="items" slot-scope="props">
      <td v-for="header in headers" :key="header.value" class="team-with-score">{{props.item[header.value]}}</td>
    </template>
  </v-data-table>
</template>

<script>
import { convertDataToTable } from "../betUtils";

export default {
  async mounted() {
    const data = await convertDataToTable();
    this.bets = data.rows;
    this.headers = data.headers;
  },
  data() {
    return {
      headers: [],
      bets: []
    };
  }
};
</script>

<style>
.team-with-score {
  white-space: nowrap;
}
</style>
