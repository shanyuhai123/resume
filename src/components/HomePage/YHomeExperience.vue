<template>
  <div class="base">
    <v-expansion-panel class="elevation-0" v-model="showExperience" expand>
      <v-expansion-panel-content>
        <v-card class="elevation-0">
          <v-card-title primary-title>
            <YModTitle :title="title" edit @add="addExperience_v"></YModTitle>
          </v-card-title>
          <v-card-text v-if="workExp.length">
            <div class="work-list">
              <v-hover
                v-for="(work, index) in workExp"
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
                        {{ work.company }}
                      </v-flex>
                      <v-flex shrink class="text-xs-right">
                        <v-btn
                          flat
                          small
                          color="cyan darken-1"
                          @click="editExperience_v(work)"
                          >修改</v-btn
                        >
                        <v-btn
                          flat
                          small
                          color="cyan darken-1"
                          @click="deleteExperience_c(work)"
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
                      <v-flex xs12 sm6>职位名称： {{ work.title }}</v-flex>
                      <v-flex xs12 sm6>
                        在职时间： {{ work.from }} - {{ work.to }}
                      </v-flex>
                      <v-flex xs12 class="text-xs-left">
                        工作任务：{{ work.description }}
                      </v-flex>
                    </v-layout>
                  </v-card-text>
                </v-card>
              </v-hover>
            </div>
          </v-card-text>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>
    <v-expansion-panel class="elevation-0" v-model="addExperience" expand>
      <v-expansion-panel-content>
        <v-card>
          <v-card-title class="grey lighten-3" primary-title>
            <div class="title font-weight-bold ">添加工作经验</div>
          </v-card-title>
          <v-card-text class="grey lighten-3">
            <v-layout row wrap justify-space-between>
              <v-flex xs12 sm5 d-flex>
                <v-text-field
                  label="公司名称"
                  v-model="sub_workExp.company"
                  outline
                >
                </v-text-field>
              </v-flex>
              <v-flex xs12 sm5 d-flex>
                <v-text-field
                  label="职位名称"
                  v-model="sub_workExp.title"
                  outline
                >
                </v-text-field>
              </v-flex>
              <v-flex xs12 sm5>
                <v-dialog
                  ref="skill_start_add"
                  v-model="skill_start_add"
                  :return-value.sync="sub_workExp.from"
                  persistent
                  lazy
                  full-width
                  width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="sub_workExp.from"
                      label="入职时间"
                      prepend-icon="event"
                      readonly
                      v-on="on"
                      outline
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="sub_workExp.from"
                    type="month"
                    scrollable
                    locale="zh"
                  >
                    <v-spacer></v-spacer>
                    <v-btn
                      flat
                      color="primary"
                      @click="skill_start_add = false"
                    >
                      Cancel
                    </v-btn>
                    <v-btn
                      flat
                      color="primary"
                      @click="$refs.skill_start_add.save(sub_workExp.from)"
                    >
                      OK
                    </v-btn>
                  </v-date-picker>
                </v-dialog>
              </v-flex>
              <v-flex xs12 sm5>
                <v-dialog
                  ref="skill_end_add"
                  v-model="skill_end_add"
                  :return-value.sync="sub_workExp.to"
                  persistent
                  lazy
                  full-width
                  width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="sub_workExp.to"
                      label="离职时间(默认至今)"
                      prepend-icon="event"
                      readonly
                      v-on="on"
                      outline
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="sub_workExp.to"
                    type="month"
                    scrollable
                    locale="zh"
                  >
                    <v-spacer></v-spacer>
                    <v-btn flat color="primary" @click="skill_end_add = false">
                      Cancel
                    </v-btn>
                    <v-btn
                      flat
                      color="primary"
                      @click="$refs.skill_end_add.save(sub_workExp.to)"
                    >
                      OK
                    </v-btn>
                  </v-date-picker>
                </v-dialog>
              </v-flex>
              <v-flex xs12>
                <v-textarea
                  outline
                  name="work-task"
                  label="工作任务"
                  v-model="sub_workExp.description"
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
            @click="addExperience_c"
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
    <v-expansion-panel class="elevation-0" v-model="editExperience" expand>
      <v-expansion-panel-content>
        <v-card>
          <v-card-title class="grey lighten-3" primary-title>
            <div class="title font-weight-bold ">编辑工作经验</div>
          </v-card-title>
          <v-card-text class="grey lighten-3">
            <v-layout row wrap justify-space-between>
              <v-flex xs12 sm5 d-flex>
                <v-text-field
                  label="公司名称"
                  v-model="sub_workExp.company"
                  outline
                >
                </v-text-field>
              </v-flex>
              <v-flex xs12 sm5 d-flex>
                <v-text-field
                  label="职位名称"
                  v-model="sub_workExp.title"
                  outline
                >
                </v-text-field>
              </v-flex>
              <v-flex xs12 sm5>
                <v-dialog
                  ref="skill_start_edit"
                  v-model="skill_start_edit"
                  :return-value.sync="sub_workExp.from"
                  persistent
                  lazy
                  full-width
                  width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="sub_workExp.from"
                      label="开始工作时间"
                      prepend-icon="event"
                      readonly
                      v-on="on"
                      outline
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="sub_workExp.from"
                    type="month"
                    scrollable
                    locale="zh"
                  >
                    <v-spacer></v-spacer>
                    <v-btn
                      flat
                      color="primary"
                      @click="skill_start_edit = false"
                    >
                      Cancel
                    </v-btn>
                    <v-btn
                      flat
                      color="primary"
                      @click="$refs.skill_start_edit.save(sub_workExp.from)"
                    >
                      OK
                    </v-btn>
                  </v-date-picker>
                </v-dialog>
              </v-flex>
              <v-flex xs12 sm5>
                <v-dialog
                  ref="skill_end_edit"
                  v-model="skill_end_edit"
                  :return-value.sync="sub_workExp.to"
                  persistent
                  lazy
                  full-width
                  width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="sub_workExp.to"
                      label="结束工作时间(默认为在职)"
                      prepend-icon="event"
                      readonly
                      v-on="on"
                      outline
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="sub_workExp.to"
                    type="month"
                    scrollable
                    locale="zh"
                  >
                    <v-spacer></v-spacer>
                    <v-btn flat color="primary" @click="skill_end_edit = false">
                      Cancel
                    </v-btn>
                    <v-btn
                      flat
                      color="primary"
                      @click="$refs.skill_end_edit.save(sub_workExp.to)"
                    >
                      OK
                    </v-btn>
                  </v-date-picker>
                </v-dialog>
              </v-flex>
              <v-flex xs12>
                <v-textarea
                  outline
                  name="work-task"
                  label="工作任务"
                  v-model="sub_workExp.description"
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
            @click="editExperience_c()"
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
  name: "y-home-experience",
  components: { YModTitle },
  data() {
    return {
      showExperience: [true],
      addExperience: [],
      editExperience: [],
      title: "工作经历",
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
      sub_workExp: {},
      skill_start_add: false,
      skill_end_add: false,
      skill_start_edit: false,
      skill_end_edit: false
    };
  },
  computed: {
    ...mapGetters("home", ["workExp"])
  },
  methods: {
    ...mapActions("home", ["setExperience"]),
    addExperience_v() {
      this.showExperience = [];
      this.addExperience = [true];
    },
    editExperience_v(experience) {
      const { company, title, from, to, description, _id } = experience;
      this.sub_workExp = { company, title, from, to, description, _id };

      this.showExperience = [];
      this.editExperience = [true];
    },
    deleteExperience_c(work) {
      const { _id } = work;
      const url = `/resume/v0/profiles/experience?experience_id=${_id}`;

      this.$axios
        .delete(url)
        .then(res => {
          const { data } = res;
          this.setExperience({ experience: data });
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
    addExperience_c() {
      this.loader = "loading";
      const l = this.loader;
      this[l] = !this[l];

      const url = "/resume/v0/profiles/experience";
      if (!this.sub_workExp.to) {
        this.sub_workExp.to = "至今";
      }
      const data = this.sub_workExp;

      this.$axios
        .post(url, data)
        .then(res => {
          this[l] = false;

          const { data } = res;
          this.setExperience({ experience: data });

          this.loader = null;
          this.showExperience = [true];
          this.addExperience = [];
          this.sub_workExp = {};
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
          this.showExperience = [true];
          this.addExperience = [];
          this.sub_workExp = {};
        });
    },
    editExperience_c() {
      this.loader = "loading";
      const l = this.loader;
      this[l] = !this[l];

      const url = "/resume/v0/profiles/experience";
      const data = this.sub_workExp;

      this.$axios
        .put(url, data)
        .then(res => {
          this[l] = false;

          const { data } = res;
          this.setExperience({ experience: data });

          this.loader = null;
          this.showExperience = [true];
          this.editExperience = [];
          this.sub_workExp = {};
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
          this.showExperience = [true];
          this.editExperience = [];
          this.sub_workExp = {};
        });
    },
    remove(item) {
      this.sub_workExp.keys.splice(this.sub_workExp.keys.indexOf(item), 1);
      this.sub_workExp.keys = [...this.sub_workExp.keys];
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
