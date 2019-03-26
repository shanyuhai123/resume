<template>
  <div class="share">
    <v-progress-linear
      :indeterminate="shareLoading"
      v-if="shareLoading"
      height="5"
      color="teal darken-1"
      class="my-0"
    ></v-progress-linear>
    <YShareNav
      class="share-nav"
      @closeNav="navShow = !navShow"
      @download="download"
      :link="link"
      :source="source"
      v-if="navShow"
    ></YShareNav>
    <share-page v-if="!shareLoading" ref="pdfPage"></share-page>
  </div>
</template>

<script>
import SharePage from "@/views/Share/Page.vue";
import YShareNav from "@/components/SharePage/YShareNav.vue";

import { mapActions, mapGetters } from "vuex";
export default {
  name: "share",
  components: {
    SharePage,
    YShareNav
  },
  mounted() {
    this.getShareInfo();
  },
  computed: {
    ...mapGetters("share", ["profile"])
  },
  data() {
    return {
      shareLoading: true,
      navShow: true,
      link: "http://resume.shanyuhai.top",
      source: "https://github.com/shanyuhai123/resume"
    };
  },
  methods: {
    ...mapActions("share", ["setShareProfile"]),
    getShareInfo() {
      const { shareId } = this.$route.query;
      const url = `/resume/v0/shares?shareId=${shareId}`;
      this.$axios
        .get(url)
        .then(res => {
          this.shareLoading = false;
          const { profile } = res.data;
          this.setShareProfile({ profile });
        })
        .catch(err => {
          // eslint-disable-next-line no-console
          console.log(err);
        });
    },
    download() {
      const {
        base: { name: user }
      } = this.profile;
      this.$pdf(this.$refs.pdfPage.$el, user);
    }
  }
};
</script>

<style lang="stylus" scoped>
.share-nav
  z-index 11
  position fixed
  top 20px
  right 10px
</style>
