<template>
  <div class="market-page" v-if="marketList">
    <v-card class="pa-2 my-4">
      <v-layout row wrap align-center justify-space-between>
        <v-flex
          v-for="(item, index) in marketList"
          :key="index"
          xs12
          sm5
          class="ma-1"
        >
          <y-market-item :market-item="item"></y-market-item>
        </v-flex>
      </v-layout>
    </v-card>
  </div>
</template>

<script>
import YMarketItem from "@/components/MarketPage/YMarketItem.vue";

export default {
  name: "market-page",
  components: {
    YMarketItem
  },
  props: {
    marketList: {
      type: Array,
      required: true,
      default: () => []
    }
  }
};
</script>

<style lang="stylus" scoped>
.market-page
  width 1000px
  margin 10px auto 0
  @media (max-width 500px)
    width 100%
</style>
