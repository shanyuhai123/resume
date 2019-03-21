<template>
  <div class="share-page">
    <v-card class="pa-2 my-4">
      <YShareBase :profile="profile.base"></YShareBase>
      <v-divider></v-divider>
      <YShareSkills :profile="profile.skills"></YShareSkills>
      <v-divider></v-divider>
      <YShareExperience :profile="profile.experience"></YShareExperience>
      <v-divider></v-divider>
      <YShareProjects :profile="profile.projects"></YShareProjects>
      <v-divider></v-divider>
      <YShareEducation :profile="profile.education"></YShareEducation>
      <v-divider></v-divider>
      <YShareEvaluation :profile="profile.evaluation"></YShareEvaluation>
    </v-card>
  </div>
</template>

<script>
import YShareBase from "@/components/SharePage/YShareBase.vue";
import YShareSkills from "@/components/SharePage/YShareSkills.vue";
import YShareExperience from "@/components/SharePage/YShareExperience.vue";
import YShareProjects from "@/components/SharePage/YShareProjects.vue";
import YShareEducation from "@/components/SharePage/YShareEducation.vue";
import YShareEvaluation from "@/components/SharePage/YShareEvaluation.vue";

import { mapGetters } from "vuex";
export default {
  name: "share-page",
  components: {
    YShareBase,
    YShareSkills,
    YShareExperience,
    YShareProjects,
    YShareEducation,
    YShareEvaluation
  },
  computed: {
    ...mapGetters("share", ["profile"])
  }
};
</script>

<style lang="stylus" scoped>
.share-page
  width 1000px
  margin 10px auto 0
  @media (max-width 500px)
    width 100%
</style>
