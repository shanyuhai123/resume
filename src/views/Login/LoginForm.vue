<template>
  <v-card class="mx-auto form-card">
    <v-card-actions>
      <v-btn :disabled="step === 1" flat @click="step--">
        Resgister
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn :disabled="step === 2" color="primary" depressed @click="step++">
        Login
      </v-btn>
    </v-card-actions>
    <v-divider></v-divider>

    <v-window v-model="step">
      <v-window-item :value="1">
        <v-card-text>
          <span class="caption grey--text text--darken-1">
            您需要使用邮箱注册该服务。
          </span>
          <v-form ref="r_form" v-model="r_valid" lazy-validation>
            <v-text-field
              v-model="r_name"
              :counter="12"
              :rules="r_nameRules"
              label="昵称"
              required
            ></v-text-field>
            <v-text-field
              v-model="r_email"
              :rules="r_emailRules"
              label="邮箱"
              required
            ></v-text-field>
            <v-text-field
              v-model="r_password"
              :counter="20"
              :rules="r_passwordRules"
              label="密码"
              type="password"
              required
            ></v-text-field>

            <v-btn :disabled="!r_valid" color="success" @click="registerBtn">
              注册
            </v-btn>
          </v-form>
        </v-card-text>
      </v-window-item>

      <v-window-item :value="2">
        <v-card-text>
          <span class="caption grey--text text--darken-1">
            输入正确的邮箱和密码来登录您的服务。
          </span>
          <v-form ref="l_form" v-model="l_valid" lazy-validation>
            <v-text-field
              v-model="l_email"
              :rules="l_emailRules"
              label="邮箱"
              required
            ></v-text-field>
            <v-text-field
              v-model="l_password"
              :counter="20"
              :rules="l_passwordRules"
              label="密码"
              type="password"
              required
            ></v-text-field>

            <v-btn :disabled="!l_valid" color="success" @click="loginBtn">
              登录
            </v-btn>
          </v-form>
        </v-card-text>
      </v-window-item>
    </v-window>

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
  </v-card>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "login-form",
  data: () => ({
    step: 1,
    r_valid: false,
    l_valid: false,
    r_name: "",
    r_email: "",
    r_password: "",
    l_email: "",
    l_password: "",
    r_nameRules: [
      v => !!v || "昵称是必填的",
      v =>
        (v && v.length >= 1 && v.length <= 12) ||
        "昵称的长度需要大于 1 位小于 12位"
    ],
    r_emailRules: [
      v => !!v || "邮箱是必填的",
      v => /.+@.+/.test(v) || "邮箱是无效的"
    ],
    r_passwordRules: [
      v => !!v || "密码是必填的",
      v =>
        (v && v.length >= 6 && v.length <= 20) ||
        "密码的长度需要大于 6 位小于 20位"
    ],
    l_emailRules: [
      v => !!v || "邮箱是必填的",
      v => /.+@.+/.test(v) || "邮箱是无效的"
    ],
    l_passwordRules: [
      v => !!v || "密码是必填的",
      v =>
        (v && v.length >= 6 && v.length <= 20) ||
        "密码的长度需要大于 6 位小于 20位"
    ],
    snackbar: false,
    snackbarSettings: {
      text: "待修正",
      color: "",
      y: "top",
      x: "null",
      mode: "multi-line",
      timeout: 6000
    }
  }),
  methods: {
    ...mapActions("user", ["setAuthorization"]),
    registerBtn() {
      const url = "/resume/v0/users/register";
      const data = {
        name: this.r_name,
        email: this.r_email,
        password: this.r_password
      };

      if (this.$refs.r_form.validate()) {
        this.$axios
          .post(url, data)
          .then(() => {
            const message = { success: "恭喜您，注册成功" };
            this.snackbarSettings.text = Object.values(message);
            this.snackbar = true;
            setTimeout(() => {
              this.step = 2;
            }, 1000);
          })
          .catch(err => {
            const message = err.response.data;
            this.snackbarSettings.text = Object.values(message);
            this.snackbar = true;
          });
      }
    },
    loginBtn() {
      const url = "/resume/v0/users/login";
      const data = {
        email: this.l_email,
        password: this.l_password
      };

      if (this.$refs.l_form.validate()) {
        this.$axios
          .post(url, data)
          .then(res => {
            const { success, token } = res.data;
            if (success == true) {
              this.setAuthorization({ authorization: token });
              const message = { message: "恭喜您，登录成功" };
              this.snackbarSettings.text = Object.values(message);
              this.snackbar = true;
              sessionStorage.setItem("rs_auth", token);
              setTimeout(() => {
                sessionStorage.setItem("rs_login", true);
                this.$router.push("/");
              }, 1000);
            }
          })
          .catch(err => {
            const message = err.response.data;
            this.snackbarSettings.text = Object.values(message);
            this.snackbar = true;
          });
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
.form-card
  width 500px
  @media (max-width 500px)
    width 100%
.snb-layout
  display flex
  flex-direction column
</style>
