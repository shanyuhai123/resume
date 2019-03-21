<template>
  <div v-if="profile">
    <YShareTitle :title="title"></YShareTitle>
    <v-card-text>
      <div class="experience">
        <v-layout
          v-for="(exp, index) in profile"
          :key="index"
          align-center
          row
          wrap
        >
          <v-flex class="exp-header" xs12>
            <span class="company headline">
              {{ exp.company }}
            </span>
            <span class="time caption">
              {{ exp.from }}
              <v-icon class="mx-1">arrow_right_alt</v-icon>
              {{ exp.to }}
            </span>
          </v-flex>
          <v-flex xs12 class="my-2 exp-item">
            <span class="exp-item-t">职位名称： </span>
            <span class="exp-item-s"> {{ exp.title }}</span>
          </v-flex>
          <v-flex xs12 class="my-2 exp-item">
            <span class="exp-item-t">工作任务： </span>
            <span class="exp-item-s">{{ exp.description }}</span>
          </v-flex>
        </v-layout>
      </div>
    </v-card-text>
  </div>
</template>

<script>
import YShareTitle from "@/components/SharePage/YShareTitle.vue";
export default {
  name: "y-share-experience",
  components: {
    YShareTitle
  },
  props: {
    profile: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      title: "工作经历"
    };
  }
};
</script>

<style lang="stylus" scoped>
.exp-header
  display flex
  align-items center
  justify-content space-between
  @media (max-width 500px)
    flex-direction column
    .time
      align-self flex-end
  .time
    display flex
    align-items center
    @media (max-width 500px)
      text-align right

.exp-item
  display flex
  &-t
    flex 0 0 70px
  &-s
    flex 1 1 auto
</style>
