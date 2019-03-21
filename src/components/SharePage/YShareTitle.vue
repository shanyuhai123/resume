<template>
  <div class="y-share-title mt-3">
    <span :class="[{ modify: isModify }, borderColor]"></span>
    <span class="title">{{ title }}</span>
  </div>
</template>

<script>
export default {
  name: "y-share-title",
  props: {
    title: {
      type: String,
      required: true
    },
    borderColor: {
      type: String,
      default: "light-blue darken-4"
    }
  },
  data() {
    return {
      isModify: true
    };
  }
};
</script>

<style lang="stylus" scoped>
.y-share-title
  display flex
  align-items center
  .modify
    height 20px
    width 4px
    margin 0 4px 0 0
</style>
