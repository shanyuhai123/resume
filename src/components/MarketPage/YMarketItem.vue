<template>
  <v-card v-if="marketItem">
    <v-card-text>
      <v-avatar size="36" color="grey lighten-4">
        <img :src="marketItem.avatar" alt="avatar" />
      </v-avatar>
      <span class="ml-4">简历： {{ marketItem.name }}</span>
      <v-spacer></v-spacer>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        flat
        color="orange"
        :href="
          `http://resume.shanyuhai.top/shares?shareId=${marketItem.shareId}`
        "
        target="_blank"
        >详情</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "y-market-item",
  props: {
    marketItem: {
      type: Object,
      required: true,
      default: () => {}
    }
  }
};
</script>
