<template>
  <div class="user">
    <Tabbar @displayResume="displayResume"></Tabbar>
    <router-view></router-view>
  </div>
</template>

<script>
import Tabbar from "@/components/Tabbar";
export default {
  name: "user",
  components: { Tabbar },
  methods: {
    displayResume() {
      const url = "/resume/v0/shares";
      this.$axios
        .post(url)
        .then(res => {
          const { shareId } = res.data;

          this.$router.push({ name: "shares", query: { shareId } });
        })
        .catch(err => {
          // eslint-disable-next-line no-console
          console.log(err);
        });
    }
  }
};
</script>
