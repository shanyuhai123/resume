<template>
  <div class="market">
    市场 {{ messageList }}
    <button @click="sendMessage">发送</button>
  </div>
</template>

<script>
import WS from "@/websocket.js";

export default {
  name: "market",
  mounted() {
    const timestamp = new Date().getTime();
    WS.init(
      { timestamp },
      message => {
        this.messageList.push({
          msg: message.msg
        });
      },
      error => {
        // eslint-disable-next-line no-console
        console.log(error);
      }
    );
  },
  data() {
    return {
      messageList: []
    };
  },
  methods: {
    sendMessage() {
      const msg = {
        updateMarket: true,
        author: "shanyuhai999"
      };

      WS.send(msg);
    }
  }
};
</script>
