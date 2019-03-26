<template>
  <v-speed-dial
    class="tabbar-dial"
    v-model="fab"
    fab
    small
    direction="bottom"
    transition="slide-y-transition"
  >
    <template v-slot:activator>
      <v-btn v-model="fab" color="blue darken-2" small dark>
        更多操作
      </v-btn>
    </template>
    <v-tooltip left>
      <template v-slot:activator="{ on }">
        <v-btn small dark color="green" v-on="on" :href="link" target="_blank">
          制作简历
        </v-btn>
      </template>
      <span>跳转至注册账号</span>
    </v-tooltip>
    <v-tooltip left>
      <template v-slot:activator="{ on }">
        <v-btn small dark color="indigo" v-on="on" @click="$emit('download')">
          下载简历
        </v-btn>
      </template>
      <span>下载简历</span>
    </v-tooltip>
    <v-tooltip left>
      <template v-slot:activator="{ on }">
        <v-btn
          small
          dark
          color="purple darken-4"
          v-on="on"
          :href="source"
          target="_blank"
        >
          查看源码
        </v-btn>
      </template>
      <span>前往 Github 查看源码</span>
    </v-tooltip>
    <v-tooltip left>
      <template v-slot:activator="{ on }">
        <v-btn small dark color="red" v-on="on" @click="$emit('closeNav')">
          <v-icon>close</v-icon>
        </v-btn>
      </template>
      <span>关闭</span>
    </v-tooltip>
  </v-speed-dial>
</template>

<script>
export default {
  name: "y-share-nav",
  props: {
    link: {
      type: String,
      required: true
    },
    source: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      fab: false
    };
  }
};
</script>
