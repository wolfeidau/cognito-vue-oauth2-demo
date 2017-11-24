<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <a href="#" v-on:click="greet">Logout</a>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: 'Welcome to Your Vue'
    }
  },
  methods: {
    greet: function (event) {
      this.$auth.logout()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
