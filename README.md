# resume

## 介绍

该简历前端使用的框架为 Vuetify，后端为 Koa

在线测试地址为 `http://resume.shanyuhai.top`

### 吐槽

初始化充满 BUG 的后端花了 1.5 天时间

设计是最纠结的事情，虽然也没有什么设计，但是就是各种推倒重来，花费 1 天时间

前端真的是糟心。。。

写前端的时候发现之前的设计不合理，修改部分样式，以及适应 Vuetify（之前用的都是 Element、iView、Mint……）

哭了的是后端部分，除了注册接口其余的全部被删了重来……

### 项目耗时

2019-03-10 ～ 2019-03-11 初始化后端
2019-03-11 ～ 2019-03-12 初步设计页面
2019-03-12 ～ 2019-03-13 注册，登录及首页轮廓
2019-03-14 ～ 2019-03-15 睡觉（贪心，多件事一起忙，熬夜导致两天没精神、乏力。真的不要熬夜啊，血亏。）
2019-03-16 ～ 2019-03-19 初步完成基础部分
2019-03-20 ～ 2019-03-20 更改基础设置，部署至服务器

## 启动项目

```js
git clone https://github.com/shanyuhai123/resume.git
cd resume
npm install

### Compiles and hot-reloads for development
npm run serve

### Compiles and minifies for production
npm run build

### Run your tests
npm run test

### Lints and fixes files
npm run lint
```

## 目标

> 终于把初稿弄出来了，还有很多优化的地方

1. 将 alert 提示提取到全局，避免在各个组件中重复
2. 将子组件的触发事件提交到父组件，而不是现在这般一把梭
3. 增加后端的配置，当用户未分享时传回相应的状态而非白屏
4. 使用 async await 替代 promise 中的 catch
5. 增加模板
6. 当分享时自动添加简历到市场
7. 列表排序
