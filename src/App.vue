<template>
  <div id="app">
    <h1 class="h1">测试案例介绍</h1>
    <ol id="nav">
      <router-link tag="li" to="/list">My To Do List</router-link>
      <router-link tag="li" to="/common">The test method</router-link>
      <router-link tag="li" to="/list">案例介绍</router-link>
      <router-link tag="li" to="/list">案例介绍</router-link>
      <router-link tag="li" to="/list">案例介绍</router-link>
      <router-link tag="li" to="/list">案例介绍</router-link>
    </ol>
    <router-view/>
  </div>
</template>

<script>
export default {
  date () {
    return {
      
    }
  },
  
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.h1 {font-size: 30px;text-align: left;}
#nav {
  list-style-type: upper-roman;
  li {text-align: left;font-size: 15px;}
}
</style>
