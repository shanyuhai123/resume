<template>
  <div class="user">
    <Tabbar @displayResume="displayResume"> </Tabbar>
    <router-view></router-view>
  </div>
</template>

<script>
import Tabbar from "@/components/Tabbar";
import { mapGetters } from "vuex";
import WS from "@/websocket.js";

export default {
  name: "user",
  components: { Tabbar },
  computed: {
    ...mapGetters("home", ["nickname"])
  },
  mounted() {
    const timestamp = new Date().getTime();
    WS.init({ timestamp });
  },
  methods: {
    displayResume() {
      const url = "/resume/v0/shares";
      this.$axios
        .post(url)
        .then(res => {
          const { shareId } = res.data;
          const msg = {
            updateMarket: true,
            author: this.nickname
          };

          this.$router.push({ name: "shares", query: { shareId } });
          WS.send(msg);
        })
        .catch(err => {
          // eslint-disable-next-line no-console
          console.log(err);
        });
    }
  }
};
</script>
