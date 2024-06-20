<template>
  <Menu v-if="renderMenu" />
  <router-view :key="$route.name"></router-view>
</template>

<script>
import Menu from './components/Menu/MenuPag.vue'

export default {
  name: 'App',
  components: {
    Menu
  },
  computed: {
    renderMenu() {
      return this.$route.path !== '/'
    }
  }
}
</script>
