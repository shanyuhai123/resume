<template>
  <div class="base">
    <v-expansion-panel class="elevation-0" v-model="showSkills" expand>
      <v-expansion-panel-content>
        <v-card class="elevation-0">
          <v-card-title primary-title>
            <YModTitle :title="title" edit @add="addSkills_v"></YModTitle>
          </v-card-title>
          <v-card-text v-if="skills.length">
            <div class="skill-list">
              <v-hover
                v-for="(skill, index) in skills"
                :key="index"
                open-delay="80"
              >
                <v-card
                  slot-scope="{ hover }"
                  :color="`${hover ? 'blue-grey darken-2' : ''} elevation-1`"
                  :class="`${hover ? 'white--text' : ''}`"
                >
                  <v-card-title class="px-2 my-2 pb-0">
                    <v-layout row wrap justify-space-between align-center>
                      <v-flex class="headline " grow>
                        {{ skill.name }}
                      </v-flex>
                      <v-flex shrink class="text-xs-right">
                        <v-btn
                          flat
                          small
                          color="cyan darken-1"
                          @click="editSkills_v(skill)"
                          >修改</v-btn
                        >
                        <v-btn
                          flat
                          small
                          color="cyan darken-1"
                          @click="deleteSkills_c(skill)"
                        >
                          删除
                          <template v-slot:loader>
                            <span class="custom-loader">
                              <v-icon light>cached</v-icon>
                            </span>
                          </template>
                        </v-btn>
                      </v-flex>
                    </v-layout>
                  </v-card-title>
                  <v-card-text class="text-xs-center pt-0">
                    <v-chip
                      v-for="(key, index) in skill.keys"
                      :key="index"
                      flat
                      color="cyan darken-1"
                      text-color="white"
                    >
                      {{ key }}
                    </v-chip>
                  </v-card-text>
                </v-card>
              </v-hover>
            </div>
          </v-card-text>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>
    <v-expansion-panel class="elevation-0" v-model="addSkills" expand>
      <v-expansion-panel-content>
        <v-card>
          <v-card-title class="grey lighten-3" primary-title>
            <div class="title font-weight-bold ">添加技能</div>
          </v-card-title>
          <v-card-text class="grey lighten-3">
            <v-layout row wrap justify-space-between>
              <v-flex xs12 sm5 d-flex>
                <v-text-field
                  label="技能名"
                  v-model="sub_skills.name"
                  outline
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm5 d-flex>
                <v-combobox
                  v-model="sub_skills.keys"
                  label="技能列表(使用回车键分割)"
                  chips
                  clearable
                  solo
                  multiple
                  outline
                >
                  <template v-slot:selection="data">
                    <v-chip
                      :selected="data.selected"
                      close
                      @input="remove(data.item)"
                    >
                      <strong>{{ data.item }}</strong>
                    </v-chip>
                  </template>
                </v-combobox>
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
            @click="addSkills_c"
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
    <v-expansion-panel class="elevation-0" v-model="editSkills" expand>
      <v-expansion-panel-content>
        <v-card>
          <v-card-title class="grey lighten-3" primary-title>
            <div class="title font-weight-bold ">编辑技能</div>
          </v-card-title>
          <v-card-text class="grey lighten-3">
            <v-layout row wrap justify-space-between>
              <v-flex xs12 sm5 d-flex>
                <v-text-field
                  label="技能名"
                  v-model="sub_skills.name"
                  outline
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm5 d-flex>
                <v-combobox
                  v-model="sub_skills.keys"
                  label="技能列表"
                  chips
                  clearable
                  solo
                  multiple
                  outline
                >
                  <template v-slot:selection="data">
                    <v-chip
                      :selected="data.selected"
                      close
                      @input="remove(data.item)"
                    >
                      <strong>{{ data.item }}</strong>
                    </v-chip>
                  </template>
                </v-combobox>
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
            @click="editSkills_c()"
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
  name: "y-home-skill",
  components: { YModTitle },
  data() {
    return {
      showSkills: [true],
      addSkills: [],
      editSkills: [],
      title: "技能列表",
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
      sub_skills: {}
    };
  },
  computed: {
    ...mapGetters("home", ["skills"])
  },
  methods: {
    ...mapActions("home", ["setSkills"]),
    addSkills_v() {
      this.showSkills = [];
      this.addSkills = [true];
    },
    editSkills_v(skill) {
      const { name, keys, _id } = skill;
      this.sub_skills = { name, keys, _id };

      this.showSkills = [];
      this.editSkills = [true];
    },
    deleteSkills_c(skill) {
      const { _id } = skill;
      const url = `/resume/v0/profiles/skills?skill_id=${_id}`;

      this.$axios
        .delete(url)
        .then(res => {
          const { data } = res;
          this.setSkills({ skills: data });
        })
        .catch(err => {
          const { status } = err.response;

          if (status == "400") {
            const message = err.response.data;
            this.snackbarSettings.text = Object.values(message);
            this.snackbar = true;
          } else if (status == "401") {
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
        });
    },
    addSkills_c() {
      this.loader = "loading";
      const l = this.loader;
      this[l] = !this[l];

      const url = "/resume/v0/profiles/skills";
      const data = this.sub_skills;

      this.$axios
        .post(url, data)
        .then(res => {
          this[l] = false;

          const { data } = res;
          this.setSkills({ skills: data });

          this.loader = null;
          this.showSkills = [true];
          this.addSkills = [];
          this.sub_skills = {};
        })
        .catch(err => {
          this[l] = false;
          const { status } = err.response;

          if (status == "400") {
            const message = err.response.data;
            this.snackbarSettings.text = Object.values(message);
            this.snackbar = true;
          } else if (status == "401") {
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
          this.showSkills = [true];
          this.addSkills = [];
          this.sub_skills = {};
        });
    },
    editSkills_c() {
      this.loader = "loading";
      const l = this.loader;
      this[l] = !this[l];

      const url = "/resume/v0/profiles/skills";
      const data = this.sub_skills;

      this.$axios
        .put(url, data)
        .then(res => {
          this[l] = false;

          const { data } = res;
          this.setSkills({ skills: data });

          this.loader = null;
          this.showSkills = [true];
          this.editSkills = [];
          this.sub_skills = {};
        })
        .catch(err => {
          this[l] = false;
          const { status } = err.response;

          if (status == "400") {
            const message = err.response.data;
            this.snackbarSettings.text = Object.values(message);
            this.snackbar = true;
          } else if (status == "401") {
            sessionStorage.setItem("rs_login", false);
            this.$router.push("/login");
            setTimeout(() => {
              this.snackbarSettings.text = "您的权限已过期，请重新登录";
              this.snackbar = true;
            }, 1000);
          } else {
            sessionStorage.setItem("rs_login", false);
            this.$router.push("/about");
            setTimeout(() => {
              this.snackbarSettings.text = "服务器存在问题，请联系开发者";
              this.snackbar = true;
            }, 1000);
          }
          this.loader = null;
          this.showSkills = [true];
          this.editSkills = [];
          this.sub_skills = {};
        });
    },
    remove(item) {
      this.sub_skills.keys.splice(this.sub_skills.keys.indexOf(item), 1);
      this.sub_skills.keys = [...this.sub_skills.keys];
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

.snb-layout
  display flex
  flex-direction column
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
