<template>
  <div v-if="profile">
    <YShareTitle :title="title"></YShareTitle>
    <v-card-text>
      <h4 class="title">{{ profile.name }}</h4>
      <div class="infos my-3">
        <div class="info-item">
          <v-icon class="mr-2">access_time</v-icon>
          <span>{{ profile.age }}</span>
        </div>
        <div class="info-item">
          <v-icon class="mr-2">school</v-icon>
          <span>{{ profile.degree }}</span>
        </div>
        <div class="info-item">
          <v-icon class="mr-2">group</v-icon>
          <span>{{ profile.status }}</span>
        </div>
      </div>
      <div class="infos">
        <div class="info-item">
          <v-icon class="mr-2">phone</v-icon>
          <span>{{ profile.phone }}</span>
        </div>
        <div class="info-item">
          <v-icon class="mr-2">email</v-icon>
          <span>{{ profile.email }}</span>
        </div>
      </div>
    </v-card-text>
  </div>
</template>

<script>
import YShareTitle from "@/components/SharePage/YShareTitle.vue";
export default {
  name: "y-share-base",
  components: {
    YShareTitle
  },
  props: {
    profile: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      title: "基本信息"
    };
  }
};
</script>

<style lang="stylus" scoped>
.infos
  display flex
  align-items center
  .info-item
    display flex
    align-items center
    padding 0 5px
  .info-item + .info-item
    margin-left 10px
</style>
