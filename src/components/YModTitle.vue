<template>
  <div class="y-mod-title">
    <span class="border"></span>
    <span class="title font-weight-bold">{{ title }}</span>
    <v-btn
      small
      flat
      class="text-xs-right"
      color="cyan darken-1"
      v-if="edit"
      @click="$emit('add')"
    >
      <v-icon>library_add</v-icon><span class="ml-1">{{ btnTitle }}</span>
    </v-btn>
  </div>
</template>

<script>
export default {
  name: "y-mod-title",
  props: {
    title: {
      type: String,
      required: true
    },
    edit: {
      type: Boolean
    },
    btnTitle: {
      type: String,
      default: "增加"
    }
  },
  data() {
    return {};
  }
};
</script>

<style lang="stylus" scoped>
.y-mod-title
  width 100%
  display flex
  align-items center
  justify-content space-between
  .border
    height 30px
    width 5px
    position absolute
    left 0
    background-color #00acc1
</style>
