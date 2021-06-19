<template>
  <v-app>
      <v-main>
        <router-view></router-view>
        <bottom-nav />
      </v-main>
  </v-app>
</template>

<script>
  import BottomNav from "@/components/Bottom.vue";
  export default {
    name: "app",
    components: {
      BottomNav
    }
  }
</script>