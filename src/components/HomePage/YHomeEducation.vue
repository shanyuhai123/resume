<template>
  <div class="base">
    <v-expansion-panel class="elevation-0" v-model="showEducation" expand>
      <v-expansion-panel-content>
        <v-card class="elevation-0">
          <v-card-title primary-title>
            <YModTitle :title="title" edit @add="addEducation_v"></YModTitle>
          </v-card-title>
          <v-card-text v-if="educationExp.length">
            <div class="education-list">
              <v-hover
                v-for="(education, index) in educationExp"
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
                        {{ education.school }}
                      </v-flex>
                      <v-flex shrink class="text-xs-right">
                        <v-btn
                          flat
                          small
                          color="cyan darken-1"
                          @click="editEducation_v(education)"
                          >修改</v-btn
                        >
                        <v-btn
                          flat
                          small
                          color="cyan darken-1"
                          @click="deleteEducation_c(education)"
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
                      <v-flex xs12 sm6>
                        专业名称： {{ education.major }} |
                        {{ education.degree }}
                      </v-flex>
                      <v-flex xs12 sm6>
                        在校时间： {{ education.from }} -
                        {{ education.to }}
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
    <v-expansion-panel class="elevation-0" v-model="addEducation" expand>
      <v-expansion-panel-content>
        <v-card>
          <v-card-title class="grey lighten-3" primary-title>
            <div class="title font-weight-bold ">添加教育经历</div>
          </v-card-title>
          <v-card-text class="grey lighten-3">
            <v-layout row wrap justify-space-between>
              <v-flex xs12 sm5 d-flex>
                <v-text-field
                  label="学校名称"
                  v-model="sub_educationExp.school"
                  outline
                >
                </v-text-field>
              </v-flex>
              <v-flex xs12 sm5 d-flex>
                <v-text-field
                  label="专业"
                  v-model="sub_educationExp.major"
                  outline
                >
                </v-text-field>
              </v-flex>
              <v-flex xs12 sm5 d-flex>
                <v-text-field
                  label="学历"
                  v-model="sub_educationExp.degree"
                  outline
                >
                </v-text-field>
              </v-flex>
              <v-flex xs12 sm5>
                <v-dialog
                  ref="edu_start_add"
                  v-model="edu_start_add"
                  :return-value.sync="sub_educationExp.from"
                  persistent
                  lazy
                  full-width
                  width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="sub_educationExp.from"
                      label="入学时间"
                      prepend-icon="event"
                      readonly
                      v-on="on"
                      outline
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="sub_educationExp.from"
                    type="month"
                    scrollable
                    locale="zh"
                  >
                    <v-spacer></v-spacer>
                    <v-btn flat color="primary" @click="edu_start_add = false">
                      Cancel
                    </v-btn>
                    <v-btn
                      flat
                      color="primary"
                      @click="$refs.edu_start_add.save(sub_educationExp.from)"
                    >
                      OK
                    </v-btn>
                  </v-date-picker>
                </v-dialog>
              </v-flex>
              <v-flex xs12 sm5>
                <v-dialog
                  ref="edu_end_add"
                  v-model="edu_end_add"
                  :return-value.sync="sub_educationExp.to"
                  persistent
                  lazy
                  full-width
                  width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="sub_educationExp.to"
                      label="毕业时间"
                      prepend-icon="event"
                      readonly
                      v-on="on"
                      outline
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="sub_educationExp.to"
                    type="month"
                    scrollable
                    locale="zh"
                  >
                    <v-spacer></v-spacer>
                    <v-btn flat color="primary" @click="edu_end_add = false">
                      Cancel
                    </v-btn>
                    <v-btn
                      flat
                      color="primary"
                      @click="$refs.edu_end_add.save(sub_educationExp.to)"
                    >
                      OK
                    </v-btn>
                  </v-date-picker>
                </v-dialog>
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
            @click="addEducation_c"
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
    <v-expansion-panel class="elevation-0" v-model="editEducation" expand>
      <v-expansion-panel-content>
        <v-card>
          <v-card-title class="grey lighten-3" primary-title>
            <div class="title font-weight-bold ">编辑教育经历</div>
          </v-card-title>
          <v-card-text class="grey lighten-3">
            <v-layout row wrap justify-space-between>
              <v-flex xs12 sm5 d-flex>
                <v-text-field
                  label="学校名称"
                  v-model="sub_educationExp.school"
                  outline
                >
                </v-text-field>
              </v-flex>
              <v-flex xs12 sm5 d-flex>
                <v-text-field
                  label="专业"
                  v-model="sub_educationExp.major"
                  outline
                >
                </v-text-field>
              </v-flex>
              <v-flex xs12 sm5 d-flex>
                <v-text-field
                  label="学历"
                  v-model="sub_educationExp.degree"
                  outline
                >
                </v-text-field>
              </v-flex>
              <v-flex xs12 sm5>
                <v-dialog
                  ref="edu_start_edit"
                  v-model="edu_start_edit"
                  :return-value.sync="sub_educationExp.from"
                  persistent
                  lazy
                  full-width
                  width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="sub_educationExp.from"
                      label="入学时间"
                      prepend-icon="event"
                      readonly
                      v-on="on"
                      outline
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="sub_educationExp.from"
                    type="month"
                    scrollable
                    locale="zh"
                  >
                    <v-spacer></v-spacer>
                    <v-btn flat color="primary" @click="edu_start_edit = false">
                      Cancel
                    </v-btn>
                    <v-btn
                      flat
                      color="primary"
                      @click="$refs.edu_start_edit.save(sub_educationExp.from)"
                    >
                      OK
                    </v-btn>
                  </v-date-picker>
                </v-dialog>
              </v-flex>
              <v-flex xs12 sm5>
                <v-dialog
                  ref="edu_end_edit"
                  v-model="edu_end_edit"
                  :return-value.sync="sub_educationExp.to"
                  persistent
                  lazy
                  full-width
                  width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="sub_educationExp.to"
                      label="毕业时间"
                      prepend-icon="event"
                      readonly
                      v-on="on"
                      outline
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="sub_educationExp.to"
                    type="month"
                    scrollable
                    locale="zh"
                  >
                    <v-spacer></v-spacer>
                    <v-btn flat color="primary" @click="edu_end_edit = false">
                      Cancel
                    </v-btn>
                    <v-btn
                      flat
                      color="primary"
                      @click="$refs.edu_end_edit.save(sub_educationExp.to)"
                    >
                      OK
                    </v-btn>
                  </v-date-picker>
                </v-dialog>
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
            @click="editEducation_c()"
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
  name: "y-home-education",
  components: { YModTitle },
  data() {
    return {
      showEducation: [true],
      addEducation: [],
      editEducation: [],
      title: "教育经历",
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
      sub_educationExp: {},
      edu_start_add: false,
      edu_end_add: false,
      edu_start_edit: false,
      edu_end_edit: false
    };
  },
  computed: {
    ...mapGetters("home", ["educationExp"])
  },
  methods: {
    ...mapActions("home", ["setEducation"]),
    addEducation_v() {
      this.showEducation = [];
      this.addEducation = [true];
    },
    editEducation_v(education) {
      const { school, major, degree, from, to, _id } = education;
      this.sub_educationExp = {
        school,
        major,
        degree,
        from,
        to,
        _id
      };

      this.showEducation = [];
      this.editEducation = [true];
    },
    deleteEducation_c(education) {
      const { _id } = education;
      const url = `/resume/v0/profiles/education?education_id=${_id}`;

      this.$axios
        .delete(url)
        .then(res => {
          const { data } = res;
          this.setEducation({ education: data });
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
    addEducation_c() {
      this.loader = "loading";
      const l = this.loader;
      this[l] = !this[l];

      const url = "/resume/v0/profiles/education";
      const data = this.sub_educationExp;

      this.$axios
        .post(url, data)
        .then(res => {
          this[l] = false;

          const { data } = res;
          this.setEducation({ education: data });

          this.loader = null;
          this.showEducation = [true];
          this.addEducation = [];
          this.sub_educationExp = {};
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
          this.showEducation = [true];
          this.addEducation = [];
          this.sub_educationExp = {};
        });
    },
    editEducation_c() {
      this.loader = "loading";
      const l = this.loader;
      this[l] = !this[l];

      const url = "/resume/v0/profiles/education";
      const data = this.sub_educationExp;

      this.$axios
        .put(url, data)
        .then(res => {
          this[l] = false;

          const { data } = res;
          this.setEducation({ education: data });

          this.loader = null;
          this.showEducation = [true];
          this.editEducation = [];
          this.sub_educationExp = {};
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
          this.showEducation = [true];
          this.editEducation = [];
          this.sub_educationExp = {};
        });
    },
    remove(item) {
      this.sub_educationExp.keys.splice(
        this.sub_educationExp.keys.indexOf(item),
        1
      );
      this.sub_educationExp.keys = [...this.sub_educationExp.keys];
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
