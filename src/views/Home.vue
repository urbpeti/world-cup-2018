<template>
  <div>
    <bet-table/>
    <todays-games/>
  </div>
</template>

<script>
// @ is an alias to /src
import BetTable from "@/components/BetTable.vue";
import TodaysGames from "@/components/TodaysGames.vue";

export default {
  name: "home",
  components: {
    BetTable,
    TodaysGames
  }
};
</script>
