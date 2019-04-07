<template>
  <div class="market">
    <v-progress-linear
      :indeterminate="marketLoading"
      v-if="marketLoading"
      height="5"
      color="teal darken-1"
      class="my-0"
    ></v-progress-linear>
    <v-toolbar color="primary" dark flat>
      <v-toolbar-title>简历市场</v-toolbar-title>
    </v-toolbar>
    <v-alert :value="true" type="info" v-if="newResume.length">
      <div class="market-alert">
        <span> 市场又更新了 {{ newResume.length }} 封简历！！！</span>
        <v-spacer></v-spacer>
        <v-btn color="error" @click="refresh">刷新</v-btn>
      </div>
    </v-alert>
    <market-page v-if="!marketLoading" :market-list="marketList"></market-page>
  </div>
</template>

<script>
import MarketPage from "@/views/Market/Page.vue";
import WS from "@/websocket.js";

export default {
  name: "market",
  components: {
    MarketPage
  },
  mounted() {
    const timestamp = new Date().getTime();
    WS.init(
      { timestamp },
      message => {
        this.newResume.push({
          msg: message.msg
        });
      },
      error => {
        // eslint-disable-next-line no-console
        console.log(error);
      }
    );
    this.getMarket();
  },
  data() {
    return {
      marketLoading: true,
      marketList: [],
      newResume: []
    };
  },
  methods: {
    getMarket() {
      const url = `/resume/v0/shares/all`;
      this.$axios
        .get(url)
        .then(res => {
          this.marketLoading = false;
          this.marketList = res.data;
        })
        .catch(err => {
          // eslint-disable-next-line no-console
          console.log(err);
        });
    },
    refresh() {
      this.newResume = [];
      this.$router.push({ name: "market" });
    }
  }
};
</script>

<style lang="stylus" scoped>
.market-alert
  display flex
  align-items center
  justify-content space-between
</style>
