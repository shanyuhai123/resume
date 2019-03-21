<template>
  <div class="login" full-height>
    <Sea></Sea>
    <LoginForm></LoginForm>
  </div>
</template>

<script>
import Sea from "@/components/Animation/Sea.vue";
import LoginForm from "@/views/Login/LoginForm";
export default {
  name: "login",
  components: { Sea, LoginForm }
};
</script>

<style lang="stylus" scoped>
.login
  position relative
  margin 0 auto
  width 1000px
  height 100%
  display flex
  align-items center
  justify-content center
  @media (max-width 500px)
    width 80%
    flex-direction column
</style>
