<template>
  <div v-if="profile">
    <YShareTitle :title="title"></YShareTitle>
    <v-card-text>
      <div class="education">
        <v-layout
          v-for="(edu, index) in profile"
          :key="index"
          align-center
          row
          wrap
        >
          <v-flex class="edu-header" xs12>
            <span class="company headline">
              {{ edu.school }}
            </span>
            <span class="time caption">
              {{ edu.from }}
              <v-icon class="mx-1">arrow_right_alt</v-icon>
              {{ edu.to }}
            </span>
          </v-flex>
          <v-flex xs12 class="my-2 edu-item">
            <span class="edu-item-t">专业名称： </span>
            <span class="edu-item-s"> {{ edu.major }}</span>
          </v-flex>
          <v-flex xs12 class="my-2 edu-item">
            <span class="edu-item-t">学历： </span>
            <span class="edu-item-s">{{ edu.degree }}</span>
          </v-flex>
        </v-layout>
      </div>
    </v-card-text>
  </div>
</template>

<script>
import YShareTitle from "@/components/SharePage/YShareTitle.vue";
export default {
  name: "y-share-education",
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
      title: "教育经历"
    };
  }
};
</script>

<style lang="stylus" scoped>
.edu-header
  display flex
  align-items center
  justify-content space-between
  .time
    display flex
    align-items center

.edu-item
  display flex
  &-t
    flex 0 0 70px
  &-s
    flex 1 1 auto

.pre
  font-family 'Times New Roman', Times, serif
  font-size 14px
  text-indent -3.6em
  white-space pre-wrap
  word-wrap break-word
</style>
