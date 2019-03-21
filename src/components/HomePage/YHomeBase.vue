<template>
  <div class="base">
    <v-expansion-panel class="elevation-0" v-model="showBase" expand>
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
          <v-card-text>
            <h2 class="username mb-3">{{ name }}</h2>
            <div class="user-info mb-3">
              <div class="mr-4 user-info-item">
                <v-icon class="mr-2">access_time</v-icon>
                <span>{{ base.age || unset }}</span>
              </div>
              <div class="mr-4 user-info-item">
                <v-icon class="mr-2">school</v-icon>
                <span>{{ base.degree || unset }}</span>
              </div>
              <div class="mr-4 user-info-item">
                <v-icon class="mr-2">group</v-icon>
                <span>{{ base.status || unset }}</span>
              </div>
            </div>
            <div class="user-contact">
              <div class="mr-4 user-contact-item">
                <v-icon class="mr-2">phone_android</v-icon>
                <span>{{ base.phone || unset }}</span>
              </div>
              <div class="mr-4 user-contact-item">
                <v-icon class="mr-2">email</v-icon>
                <span>{{ base.email || unset }}</span>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>
    <v-expansion-panel class="elevation-0" v-model="editBase" expand>
      <v-expansion-panel-content>
        <v-card>
          <v-card-title class="grey lighten-3" primary-title>
            <div class="title font-weight-bold ">编辑基础信息</div>
          </v-card-title>
          <v-card-text class="grey lighten-3">
            <v-layout row wrap justify-space-between>
              <v-flex xs12 sm5 d-flex>
                <v-text-field
                  label="姓名"
                  v-model="sub_base.name"
                  outline
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm5 d-flex>
                <v-text-field
                  label="年龄"
                  v-model="sub_base.age"
                  outline
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm5 d-flex>
                <v-select
                  :items="status"
                  label="求职状态"
                  v-model="sub_base.status"
                  outline
                ></v-select>
              </v-flex>
              <v-flex xs12 sm5 d-flex>
                <v-select
                  :items="degree"
                  label="学历"
                  v-model="sub_base.degree"
                  outline
                ></v-select>
              </v-flex>
              <v-flex xs12 sm5 d-flex>
                <v-text-field
                  label="电话"
                  v-model="sub_base.phone"
                  outline
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm5 d-flex>
                <v-text-field
                  label="邮箱"
                  v-model="sub_base.email"
                  outline
                ></v-text-field>
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
  name: "y-home-base",
  components: {
    YModTitle
  },
  data() {
    return {
      showBase: [true],
      editBase: [],
      title: "基本信息",
      loader: null,
      loading: false,
      status: ["离职-随时到岗", "在职-考虑机会"],
      degree: ["大专", "本科", "研究生"],
      modal: false,
      snackbar: false,
      snackbarSettings: {
        text: "待修正",
        color: "",
        y: "top",
        x: "null",
        mode: "multi-line",
        timeout: 5000
      },
      unset: "未知",
      sub_base: {}
    };
  },
  computed: {
    ...mapGetters("home", ["name", "base"])
  },
  methods: {
    ...mapActions("home", ["setBase"]),
    edit() {
      let { name, age, degree, status, phone, email } = this.base;
      const nickname = this.name;
      if (name == "未知") {
        name = nickname;
      }
      this.sub_base = { name, age, degree, status, phone, email };

      this.showBase = [];
      this.editBase = [true];
    },
    save() {
      this.loader = "loading";
      const l = this.loader;
      this[l] = !this[l];

      const url = "/resume/v0/profiles/base";
      const data = this.sub_base;
      this.$axios
        .post(url, data)
        .then(res => {
          this[l] = false;

          const { data } = res;
          this.setBase({ base: data });

          this.loader = null;
          this.editBase = [];
          this.showBase = [true];
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
          this.editBase = [];
          this.showBase = [true];
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
