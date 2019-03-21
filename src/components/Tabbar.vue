<template>
  <v-toolbar class="tabbar">
    <v-speed-dial
      class="tabbar-dial"
      v-model="fab"
      fab
      small
      direction="bottom"
      :open-on-hover="hover"
      transition="slide-x-reverse-transition"
    >
      <template v-slot:activator>
        <v-btn v-model="fab" color="blue darken-2" dark fab>
          <v-icon>account_circle</v-icon>
          <v-icon>close</v-icon>
        </v-btn>
      </template>
      <v-tooltip right>
        <template v-slot:activator="{ on }">
          <v-btn fab dark color="green" v-on="on">
            <v-icon>home</v-icon>
          </v-btn>
        </template>
        <span>首页(建设中)</span>
      </v-tooltip>
      <v-tooltip right>
        <template v-slot:activator="{ on }">
          <v-btn fab dark color="indigo" v-on="on">
            <v-icon>local_library</v-icon>
          </v-btn>
        </template>
        <span>指南(建设中)</span>
      </v-tooltip>
      <v-tooltip right>
        <template v-slot:activator="{ on }">
          <v-btn fab dark color="red" v-on="on">
            <v-icon>settings</v-icon>
          </v-btn>
        </template>
        <span>设置(建设中)</span>
      </v-tooltip>
    </v-speed-dial>
    <v-toolbar-title>RS</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-toolbar-items v-on="on">
          <v-btn flat color="orange darken-2" @click="$emit('displayResume')">
            <v-icon medium color="orange darken-2">share</v-icon>
            <span class="ml-2">SHARE</span>
          </v-btn>
        </v-toolbar-items>
      </template>
      <span>分享你的简历吧</span>
    </v-tooltip>
  </v-toolbar>
</template>

<script>
export default {
  name: "tabbar",
  data: () => ({
    navs: [
      { title: "首页", path: "home" },
      { title: "设置", path: "settings" },
      { title: "指南", path: "guide" }
    ],
    fab: false,
    hover: false
  }),
  methods: {
    linkUser(item) {
      // eslint-disable-next-line no-console
      console.log(item);
    }
  }
};
</script>

<style lang="stylus" scoped>
.tabbar
  z-index 99
  &-dial
    left -20px
    transform scale(0.75)
</style>
