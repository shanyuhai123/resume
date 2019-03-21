<template>
  <div class="page my-3 pa-2 elevation-6">
    <YHomeBase></YHomeBase>
    <v-divider></v-divider>
    <YHomeSkills></YHomeSkills>
    <v-divider></v-divider>
    <YHomeExperience></YHomeExperience>
    <v-divider></v-divider>
    <YHomeProject></YHomeProject>
    <v-divider></v-divider>
    <YHomeEducation></YHomeEducation>
    <v-divider></v-divider>
    <YHomeEvaluation></YHomeEvaluation>
  </div>
</template>

<script>
import YHomeBase from "@/components/HomePage/YHomeBase";
import YHomeSkills from "@/components/HomePage/YHomeSkills";
import YHomeExperience from "@/components/HomePage/YHomeExperience";
import YHomeProject from "@/components/HomePage/YHomeProject";
import YHomeEducation from "@/components/HomePage/YHomeEducation";
import YHomeEvaluation from "@/components/HomePage/YHomeEvaluation";

export default {
  name: "page",
  components: {
    YHomeBase,
    YHomeSkills,
    YHomeExperience,
    YHomeProject,
    YHomeEducation,
    YHomeEvaluation
  }
};
</script>

<style lang="stylus" scoped>
.page
  width 1000px
  margin 0 auto
  @media (max-width 500px)
    width 100%
</style>
