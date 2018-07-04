<template>
  <div>
    <v-navigation-drawer
      v-model="drawer"
      fixed
      clipped
      app
    >
      <v-list>
        <v-list-tile>
          <v-list-tile-content>
            <v-list-tile-title>
              Szia
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar
      fixed
      clipped-left
      dense
      app
    >
      <v-toolbar-side-icon @click.stop="toogleDrawer"></v-toolbar-side-icon>
      <v-icon class="mx-3">home</v-icon>
      <v-toolbar-title class="mr-5 align-center">
        <span class="title">
          World Cup 2018
        </span>
      </v-toolbar-title>
    </v-toolbar>
  </div>
</template>

<script>
export default {
  data: () => ({
    drawer: false,
  }),
  methods: {
    toogleDrawer() {
      this.drawer = !this.drawer;
    },
  },
};
</script>
