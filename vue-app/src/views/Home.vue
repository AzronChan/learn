<template>
  <div class="home">
    <HelloWorld v-if="helloWorldShow" msg="Welcome to Your Vue.js App" title="aaa"/>
    <a href="javascript:;" @click="clickHandle()">click me</a>
    <a href="javascript:;" @click="showHelloWorld()">show HelloWorld</a>
    <h1 id="title" v-if="show">出现</h1>
    <ul>
      <li v-for="item in lists">
        <span>{{item.title}}</span>
        <span>{{item.name}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "home",
  data() {
    return {
      show: false,
      helloWorldShow : false,
      lists : [{
        title : 1,
      },{
        title : 2,
      }]
    };
  },
  components: {
    HelloWorld
  },
  mounted() {
    // setTimeout(() => {
      // this.lists[2].name = 2;
      // this.lists[0].title = 10;
      // this.$set(this.lists,0,{title:10})
      this.lists[0] = {
        title : 9
      }
      // this.lists[1].name = 'three';
      // this.lists[1].title = 3;
      // this.lists[1] =  {
      //   title : 3
      // }
      // this.$set(this.lists, 1, {title: 2,name : 'aaa'})
    // }, 200);
  },
  updated () {
     if (this.show) {
       console.log(1)
       console.log(document.getElementById("title"));
       
     }
     if (this.helloWorldShow){
       console.log(document.querySelector('[title="aaa"]'))
     }
  },
  methods: {
    showHelloWorld(){
      this.helloWorldShow = !this.helloWorldShow;
    },
    clickHandle() {
      this.show = !this.show;
      if (this.show) {
        // console.log(document.getElementById("title"));
        this.$nextTick(function() {
           console.log(2)
          console.log(document.getElementById("title"));
        });
      }
    }
  }
};
</script>
