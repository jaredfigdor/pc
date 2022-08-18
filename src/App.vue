<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
      class="elevation-0"
    >
    <div class="wrapflex">
      <div class="d-flex align-center">
      

        ProtoCoach
      </div>
</div>
      <v-spacer></v-spacer>

   
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
  
};
</script>

<style>

.d-flex.align-center {
font-weight: 200;
font-size: 25px;



}

.v-app-bar {
  box-shadow: none;
}





</style>
