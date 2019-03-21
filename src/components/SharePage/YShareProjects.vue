<template>
  <div v-if="profile">
    <YShareTitle :title="title"></YShareTitle>
    <v-card-text>
      <div class="projects">
        <v-layout
          class="mb-2"
          v-for="(project, index) in profile"
          :key="index"
          align-center
          row
          wrap
        >
          <v-flex class="project-header mb-2" xs12>
            <span class="company headline">
              {{ project.name }}
            </span>
          </v-flex>
          <v-flex xs12 class="my-1 project-item">
            <span class="project-item-t">项目描述： </span>
            <span class="project-item-s">
              <pre class="pre">
                {{ project.description }}
              </pre>
            </span>
          </v-flex>
          <v-flex xs12 class="my-1 project-item">
            <span class="project-item-t">项目职责： </span>
            <span class="project-item-s">
              <pre class="pre">
                {{ project.duty }}
              </pre>
            </span>
          </v-flex>
          <v-flex xs12 class="my-1 project-item">
            <span class="project-item-t">技术选取： </span>
            <span class="project-item-s">
              <pre class="pre">
                {{ project.technology }}
              </pre>
            </span>
          </v-flex>
          <v-flex xs12 class="my-1 project-item">
            <span class="project-item-t">项目难点： </span>
            <span class="project-item-s">
              <pre class="pre">
                {{ project.difficulty }}
              </pre>
            </span>
          </v-flex>
        </v-layout>
      </div>
    </v-card-text>
  </div>
</template>

<script>
import YShareTitle from "@/components/SharePage/YShareTitle.vue";
export default {
  name: "y-share-projects",
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
      title: "项目经历"
    };
  }
};
</script>

<style lang="stylus" scoped>
.project-header
  display flex
  align-items center
  justify-content space-between
  .time
    display flex
    align-items center

.project-item
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
