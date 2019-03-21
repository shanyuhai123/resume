<template>
  <div class="base">
    <v-expansion-panel class="elevation-0" v-model="showProjects" expand>
      <v-expansion-panel-content>
        <v-card class="elevation-0">
          <v-card-title primary-title>
            <YModTitle :title="title" edit @add="addProjects_v"></YModTitle>
          </v-card-title>
          <v-card-text v-if="projectExp.length">
            <div class="project-list">
              <v-hover
                v-for="(project, index) in projectExp"
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
                        {{ project.name }}
                      </v-flex>
                      <v-flex shrink class="text-xs-right">
                        <v-btn
                          flat
                          small
                          color="cyan darken-1"
                          @click="editProjects_v(project)"
                          >修改</v-btn
                        >
                        <v-btn
                          flat
                          small
                          color="cyan darken-1"
                          @click="deleteProjects_c(project)"
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
                    <v-layout
                      align-center
                      justify-space-between
                      wrap
                      class="text-xs-left"
                    >
                      <v-flex xs12>
                        项目描述： {{ project.description }}
                      </v-flex>
                      <v-flex xs12 sm6>项目职责： {{ project.duty }}</v-flex>
                      <v-flex xs12>
                        技术选取： {{ project.technology }}
                      </v-flex>
                      <v-flex xs12> 项目难点：{{ project.difficulty }} </v-flex>
                    </v-layout>
                  </v-card-text>
                </v-card>
              </v-hover>
            </div>
          </v-card-text>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>
    <v-expansion-panel class="elevation-0" v-model="addProjects" expand>
      <v-expansion-panel-content>
        <v-card>
          <v-card-title class="grey lighten-3" primary-title>
            <div class="title font-weight-bold ">添加项目经验</div>
          </v-card-title>
          <v-card-text class="grey lighten-3">
            <v-layout row wrap justify-space-between>
              <v-flex xs12 sm5 d-flex>
                <v-text-field
                  label="项目名称"
                  v-model="sub_projectExp.name"
                  outline
                >
                </v-text-field>
              </v-flex>
              <v-flex xs12 sm5 d-flex>
                <v-text-field
                  label="项目职责"
                  v-model="sub_projectExp.duty"
                  outline
                >
                </v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-textarea
                  outline
                  label="项目描述"
                  v-model="sub_projectExp.description"
                ></v-textarea>
              </v-flex>
              <v-flex xs12>
                <v-textarea
                  outline
                  label="技术选取"
                  v-model="sub_projectExp.technology"
                ></v-textarea>
              </v-flex>
              <v-flex xs12>
                <v-textarea
                  outline
                  label="项目难点"
                  v-model="sub_projectExp.difficulty"
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
            @click="addProjects_c"
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
    <v-expansion-panel class="elevation-0" v-model="editProjects" expand>
      <v-expansion-panel-content>
        <v-card>
          <v-card-title class="grey lighten-3" primary-title>
            <div class="title font-weight-bold ">编辑工作经验</div>
          </v-card-title>
          <v-card-text class="grey lighten-3">
            <v-layout row wrap justify-space-between>
              <v-flex xs12 sm5 d-flex>
                <v-text-field
                  label="项目名称"
                  v-model="sub_projectExp.name"
                  outline
                >
                </v-text-field>
              </v-flex>
              <v-flex xs12 sm5 d-flex>
                <v-text-field
                  label="项目职责"
                  v-model="sub_projectExp.duty"
                  outline
                >
                </v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-textarea
                  outline
                  label="项目描述"
                  v-model="sub_projectExp.description"
                ></v-textarea>
              </v-flex>
              <v-flex xs12>
                <v-textarea
                  outline
                  label="技术选取"
                  v-model="sub_projectExp.technology"
                ></v-textarea>
              </v-flex>
              <v-flex xs12>
                <v-textarea
                  outline
                  label="项目难点"
                  v-model="sub_projectExp.difficulty"
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
            @click="editProjects_c()"
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
  name: "y-home-projects",
  components: { YModTitle },
  data() {
    return {
      showProjects: [true],
      addProjects: [],
      editProjects: [],
      title: "项目经历",
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
      sub_projectExp: {}
    };
  },
  computed: {
    ...mapGetters("home", ["projectExp"])
  },
  methods: {
    ...mapActions("home", ["setProjects"]),
    addProjects_v() {
      this.showProjects = [];
      this.addProjects = [true];
    },
    editProjects_v(project) {
      const { name, description, duty, technology, difficulty, _id } = project;
      this.sub_projectExp = {
        name,
        description,
        duty,
        technology,
        difficulty,
        _id
      };

      this.showProjects = [];
      this.editProjects = [true];
    },
    deleteProjects_c(project) {
      const { _id } = project;
      const url = `/resume/v0/profiles/projects?projects_id=${_id}`;

      this.$axios
        .delete(url)
        .then(res => {
          const { data } = res;
          this.setProjects({ projects: data });
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
    addProjects_c() {
      this.loader = "loading";
      const l = this.loader;
      this[l] = !this[l];

      const url = "/resume/v0/profiles/projects";
      if (!this.sub_projectExp.to) {
        this.sub_projectExp.to = "至今";
      }
      const data = this.sub_projectExp;

      this.$axios
        .post(url, data)
        .then(res => {
          this[l] = false;

          const { data } = res;
          this.setProjects({ projects: data });

          this.loader = null;
          this.showProjects = [true];
          this.addProjects = [];
          this.sub_projectExp = {};
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
          this.showProjects = [true];
          this.addProjects = [];
          this.sub_projectExp = {};
        });
    },
    editProjects_c() {
      this.loader = "loading";
      const l = this.loader;
      this[l] = !this[l];

      const url = "/resume/v0/profiles/projects";
      const data = this.sub_projectExp;

      this.$axios
        .put(url, data)
        .then(res => {
          this[l] = false;

          const { data } = res;
          this.setProjects({ projects: data });

          this.loader = null;
          this.showProjects = [true];
          this.editProjects = [];
          this.sub_projectExp = {};
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
          this.showProjects = [true];
          this.editProjects = [];
          this.sub_projectExp = {};
        });
    },
    remove(item) {
      this.sub_projectExp.keys.splice(
        this.sub_projectExp.keys.indexOf(item),
        1
      );
      this.sub_projectExp.keys = [...this.sub_projectExp.keys];
    }
  }
};
</script>

<style lang="stylus" scoped>
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
