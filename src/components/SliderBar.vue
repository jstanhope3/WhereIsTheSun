  <script setup>
    import Slider from '@vueform/slider'
    import { computed, reactive, ref } from "vue";
    import { main_loc } from '@/components/state/state.js'
    const value = ref(20)

    function onChange(event) {
        main_loc.radius = value
        console.log(main_loc.radius)
    }
  </script>
<template>
    <div>
      <Slider v-model="value" v-on:end="onChange" 
      style="
      --slider-connect-bg: #fbb333;
      --slider-bg:#7c4c24;
      --slider-tooltip-bg: #fbb333;
      "/>
    </div>
  </template>
  
  
<style src="@vueform/slider/themes/default.css"  >

</style>