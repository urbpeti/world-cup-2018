<template>
  <v-app>
    <toolbar/>
    <v-content >
      <v-container fill-height>
        <v-layout>
          <v-flex xs12 md8 offset-md2>
              <router-view/>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import Toolbar from "./components/Toolbar.vue";

export default {
  components: {
    Toolbar
  }
};
</script>
