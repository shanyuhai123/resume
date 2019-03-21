<template>
  <div class="base">
    <v-expansion-panel class="elevation-0" v-model="showEvaluation" expand>
      <v-expansion-panel-content>
        <v-card>
          <v-card-title primary-title>
            <YModTitle
              :title="title"
              btnTitle="编辑"
              edit
              @add="edit"
            ></YModTitle>
          </v-card-title>
          <v-card-text align-center v-if="evaluation.length">
            <p class="font-weight-bold">{{ evaluation }}</p>
          </v-card-text>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>
    <v-expansion-panel class="elevation-0" v-model="editEvaluation" expand>
      <v-expansion-panel-content>
        <v-card>
          <v-card-title class="grey lighten-3" primary-title>
            <div class="title font-weight-bold ">编辑自我评价</div>
          </v-card-title>
          <v-card-text class="grey lighten-3">
            <v-layout row wrap justify-space-between>
              <v-flex xs12 d-flex>
                <v-textarea
                  outline
                  name="evaluation"
                  label="自我评价"
                  v-model="sub_evaluation"
                ></v-textarea>
              </v-flex>
            </v-layout>
          </v-card-text>
          <v-btn
            absolute
            bottom
            small
            right
            :loading="loading"
            :disabled="loading"
            color="info"
            class="mb-4"
            @click="save"
          >
            保存
            <v-icon right>save</v-icon>
            <template v-slot:loader>
              <span class="custom-loader">
                <v-icon light>cached</v-icon>
              </span>
            </template>
          </v-btn>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>
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
</template>

<script>
import YModTitle from "@/components/YModTitle.vue";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "y-home-evaluation",
  components: {
    YModTitle
  },
  data() {
    return {
      showEvaluation: [true],
      editEvaluation: [],
      title: "自我评价",
      loader: null,
      loading: false,
      snackbar: false,
      snackbarSettings: {
        text: "待修正",
        color: "",
        y: "top",
        x: "null",
        mode: "multi-line",
        timeout: 5000
      },
      sub_evaluation: ""
    };
  },
  computed: {
    ...mapGetters("home", ["evaluation"])
  },
  methods: {
    ...mapActions("home", ["setEvaluation"]),
    edit() {
      this.sub_evaluation = this.evaluation;

      this.showEvaluation = [];
      this.editEvaluation = [true];
    },
    save() {
      this.loader = "loading";
      const l = this.loader;
      this[l] = !this[l];

      const url = "/resume/v0/profiles/evaluation";
      const data = this.sub_evaluation;
      this.$axios
        .post(url, { evaluation: data })
        .then(res => {
          this[l] = false;

          const { data } = res;
          this.setEvaluation({ evaluation: data });

          this.loader = null;
          this.editEvaluation = [];
          this.showEvaluation = [true];
        })
        .catch(err => {
          this[l] = false;
          const { status } = err.response;

          if (status == "401") {
            sessionStorage.setItem("rs_login", false);
            this.$router.push("/login");
            setTimeout(() => {
              this.snackbarSettings.text = "您的权限已过期，请重新登录";
              this.snackbar = true;
            }, 2000);
          } else {
            sessionStorage.setItem("rs_login", false);
            this.$router.push("/about");
            setTimeout(() => {
              this.snackbarSettings.text = "服务器存在问题，请联系开发者";
              this.snackbar = true;
            }, 1000);
          }
          this.loader = null;
          this.editEvaluation = [];
          this.showEvaluation = [true];
        });
    }
  }
};
</script>

<style lang="stylus" scoped>
.user-info,
.user-contact
  display flex

.user-contact-item
.user-info-item
  display flex
  align-items center

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
