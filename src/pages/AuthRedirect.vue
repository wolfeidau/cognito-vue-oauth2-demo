<template>
</template>
<script>

export default {
  mounted () {
    this.$nextTick(() => {
      let loggedIn = this.$auth.storeTokens()
      if (loggedIn) window.location.href = '/dashboard'
      else window.location.href = '/'
    })
  }
}
</script>