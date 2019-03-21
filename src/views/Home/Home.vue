<template>
  <div class="home">
    <v-progress-linear
      :indeterminate="homeLoading"
      v-if="homeLoading"
      height="15"
      color="error"
    ></v-progress-linear>
    <div v-if="!homeLoading">
      <div v-if="!isInit">
        <v-alert v-model="alert" type="error" justify-space-between>
          您尚未初始化您的模板。
          <v-btn
            color="success"
            absolute
            class="initBtn"
            @click="alert = !alert"
          >
            初始化
          </v-btn>
        </v-alert>
        <v-card
          class="y404 mt-5 mx-2"
          height="400"
          align-center
          justify-center
          fill-height
        >
          <Y404></Y404>
          <v-dialog v-model="dialog" persistent max-width="290">
            <v-card>
              <v-card-title class="headline">要使用简历服务吗？</v-card-title>
              <v-card-text>
                为了让体验更自由，当您点击同意时我们才会进一步使用您注册的账号来进行服务，并初始化您的数据模板。
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="green darken-1" flat @click="dialog = false">
                  拒绝
                </v-btn>
                <v-btn
                  :loading="loading"
                  :disabled="loading"
                  color="info"
                  @click="initTemplate"
                >
                  同意
                  <template v-slot:loader>
                    <span class="custom-loader">
                      <v-icon light>cached</v-icon>
                    </span>
                  </template>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-card>
        <v-snackbar
          v-model="snackbar"
          :left="snackbarSettings.x === 'left'"
          :multi-line="snackbarSettings.mode === 'multi-line'"
          :right="snackbarSettings.x === 'right'"
          :timeout="snackbarSettings.timeout"
          :top="snackbarSettings.y === 'top'"
          :color="snackbarSettings.color"
          :vertical="snackbarSettings.mode === 'vertical'"
        >
          <div class="snb-layout">
            <span v-for="(item, index) in snackbarSettings.text" :key="index">
              {{ item }}
            </span>
          </div>
          <v-btn color="pink" flat @click="snackbar = false">
            Close
          </v-btn>
        </v-snackbar>
      </div>
      <Page v-else></Page>
    </div>
  </div>
</template>

<script>
import Y404 from "@/components/Y404";
import Page from "@/views/Home/Page";
import { mapActions } from "vuex";
export default {
  name: "home",
  components: { Page, Y404 },
  data: () => ({
    homeLoading: true,
    isInit: false,
    alert: true,
    dialog: false,
    snackbar: false,
    snackbarSettings: {
      text: "待修正",
      color: "",
      y: "top",
      x: "null",
      mode: "multi-line",
      timeout: 5000
    },
    loader: null,
    loading: false
  }),
  created() {
    this.init();
  },
  watch: {
    alert: function(val) {
      if (!this.isInit && !val) {
        this.dialog = true;
      }
    },
    dialog: function(val) {
      if (!this.isInit && !val) {
        this.alert = true;
      }
    }
  },
  methods: {
    ...mapActions("home", [
      "setName",
      "setBase",
      "setSkills",
      "setExperience",
      "setProjects",
      "setEducation",
      "setEvaluation",
      "setProfileId"
    ]),
    init() {
      const url = "/resume/v0/profiles";
      this.$axios
        .get(url)
        .then(res => {
          this.homeLoading = false;
          this.isInit = true;
          const {
            name = "",
            base = {},
            skills = [],
            experience = [],
            projects = [],
            education = [],
            evaluation = "",
            _id = ""
          } = res.data[0];

          this.setProfileId({ profileId: _id });
          this.setName({ name });
          this.setBase({ base });
          this.setSkills({ skills });
          this.setExperience({ experience });
          this.setProjects({ projects });
          this.setEducation({ education });
          this.setEvaluation({ evaluation });
        })
        .catch(err => {
          this.homeLoading = false;
          const { status, data: message } = err.response;

          if (status == "404") {
            this.snackbarSettings.text = Object.values(message);
            this.snackbar = true;
          } else if (status == "401") {
            this.snackbarSettings.text = "您的权限已过期，请重新登录";
            this.snackbar = true;
            setTimeout(() => {
              sessionStorage.setItem("rs_login", false);
              this.$router.push("/login");
            }, 2000);
          } else {
            this.snackbarSettings.text = "服务器存在问题，请联系开发者";
            this.snackbar = true;
            setTimeout(() => {
              sessionStorage.setItem("rs_login", false);
              this.$router.push("/about");
            }, 1000);
          }
        });
    },
    initTemplate() {
      this.loader = "loading";
      const l = this.loader;
      this[l] = !this[l];

      const url = "/resume/v0/profiles/init";
      this.$axios
        .post(url)
        .then(res => {
          this[l] = false;
          this.isInit = true;
          this.dialog = false;

          const {
            name = "",
            base = {},
            skills = [],
            experience = [],
            projects = [],
            education = [],
            evaluation = ""
          } = res.data;

          this.setName({ name });
          this.setBase({ base });
          this.setSkills({ skills });
          this.setExperience({ experience });
          this.setProjects({ projects });
          this.setEducation({ education });
          this.setEvaluation({ evaluation });

          this.loader = null;
        })
        .catch(err => {
          this[l] = false;
          const { data: message } = err.response;
          this.snackbarSettings.text = Object.values(message);
          this.snackbar = true;
          this.loader = null;
        });

      this.loader = null;
    }
  }
};
</script>

<style lang="stylus" scoped>
.initBtn
  right 10px
  bottom 12px


.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
