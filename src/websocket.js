export default {
  // 保证整个项目只有一个socket实例
  ws: null,
  init(config, onMessage, onError) {
    if (!this.ws) {
      // 实例化
      this.ws = new WebSocket(`ws://47.112.26.219:3175/${config.timestamp}`);
    }

    this.ws.onmessage = event => {
      let message = JSON.parse(event.data);
      onMessage && onMessage(message);
    };

    this.ws.onerror = error => {
      onError && onError(error);
    };

    this.ws.onclose = () => {
      this.ws = null;
    };
  },
  send(msg) {
    this.ws.send(JSON.stringify(msg));
  }
};
