<template>
  <div id="app">
    <left-nav></left-nav>
    <div class="main">
      <router-view/>
    </div>
  </div>
</template>

<script>
import leftNav from "@/components/common/left-nav";
export default {
  name: "App",
  components: {
    leftNav
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
   text-align: left;
  color: #2c3e50;
   height:100%;
}
* {
  padding: 0;
  margin: 0;
}
ul,
li,
ol {
  list-style: none;
}
a{
    text-decoration: none;
    color:white;
}
.main{
  float:left;
  width:95%; 
  background-color: #EFF2F7;
  height:100%;
  overflow: auto;
    font-size: 0.14rem;
}

</style>
