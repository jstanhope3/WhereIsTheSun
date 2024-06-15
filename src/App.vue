<script setup lang="ts">
// import { RouterLink, RouterView } from 'vue-router'
// import HelloWorld from './components/HelloWorld.vue'
import WeatherMap from './components/WeatherMap.vue'
import LocationForm from './components/LocationForm.vue'
import SliderBar from './components/SliderBar.vue';

</script>

<template>
  <div class="container">
    <div class="logo">
      <img src="../public/sun.png" ></img>
    </div>
    <div class="form">
      <LocationForm/>
    </div>
    <div class="form">
      <SliderBar/>
    </div>
    <div class="form"> </div>
    <div>
      <WeatherMap/>
      <!-- <LocationsDisplay/> -->
    </div>
  </div>
</template>

<style scoped>
.container {
  align-items: center;
  float: left;
  width: 100%;
}

.logo {
  width: 100%;
  height: 200px;
  align-items: center;
  justify-content: center;
  display:flex;
}

.logo img {
  height: 200px;
  width: 200px;
}

.form {
  padding-top: 15px;
}
</style>
