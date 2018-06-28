<template>
  <div id="app">
		<login></login>
  </div>
</template>

<script>
(function() {
	var html = document.querySelector("html"),
		rem = html.offsetWidth / 7.5;
	html.style.fontSize = rem + "px";
})();
import login from './components/login.vue'

export default {
  name: 'app',
  components: { login }
}
</script>

<style lang="scss">
@import url("assets/css/base.css");
body,html {
	width: 100%;
  height: 100%;
  
}

#app {
  font-family: Arial, Helvetica, "STHeiti STXihei", "Microsoft YaHei", Tohoma, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 100%;
  height: 100%;
}
</style>
