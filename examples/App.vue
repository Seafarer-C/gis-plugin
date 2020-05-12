<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" @click="test" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";

export default {
  name: "App",
  components: {
    HelloWorld
  },
  methods: {
    test() {
      this.$gisModal({
        title: "多标签",
        width: 1200,
        height: 430,
        draggable: true,
        render: h => {
          return h("div", "hello");
        },
        buttons: [
          {
            title: "确定",
            type: "primary",
            close: false,
            event: e => {
              // e.direction = 'horizontal'
              e.handleSubmit();
            }
          },
          { title: "关闭", type: "default", close: true }
        ]
      });
    }
  }
};
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
