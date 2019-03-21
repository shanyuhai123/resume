<template>
  <div v-if="profile">
    <YShareTitle :title="title"></YShareTitle>
    <v-card-text>
      <div class="evaluation">
        <pre class="pre">
          {{ profile }}
        </pre>
      </div>
    </v-card-text>
  </div>
</template>

<script>
import YShareTitle from "@/components/SharePage/YShareTitle.vue";
export default {
  name: "y-share-evaluation",
  components: {
    YShareTitle
  },
  props: {
    profile: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      title: "自我评价"
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
  text-indent -1.9em
  white-space pre-wrap
  word-wrap break-word
</style>
