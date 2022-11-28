<template>
  <v-app>
    <toolbar />
    <v-content>
      <v-container fill-height>
        <v-layout>
          <!-- offset-md2 -->
          <v-flex xs12 md12 >
            <router-view />
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import Toolbar from './components/Toolbar.vue';

export default {
  components: {
    Toolbar,
  },
};
</script>
