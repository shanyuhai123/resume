<template>
  <div v-if="profile">
    <YShareTitle :title="title"></YShareTitle>
    <v-card-text>
      <div class="skills">
        <v-layout
          v-for="(skill, index) in profile"
          :key="index"
          align-center
          row
          wrap
        >
          <v-flex xs12 sm3> {{ skill.name }} </v-flex>
          <v-flex class="skill-key" xs12 sm9>
            <v-chip
              color="blue darken-1"
              text-color="white"
              v-for="(key, index) in skill.keys"
              :key="index"
              >{{ key }}</v-chip
            >
          </v-flex>
        </v-layout>
      </div>
    </v-card-text>
  </div>
</template>

<script>
import YShareTitle from "@/components/SharePage/YShareTitle.vue";
export default {
  name: "y-share-skills",
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
      title: "技能列表"
    };
  }
};
</script>

<style lang="stylus" scoped>
.skill-key
  @media (max-width 500px)
    margin 6px 0 2px 0
</style>
