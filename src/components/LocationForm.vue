    
<script setup>
const emit = defineEmits(['change-loc']);
import { ref } from "vue";
import { main_loc } from '@/components/state/state.js'
const searchTerm = ref('');

const apiUrl = 'http://api.geonames.org/searchJSON?';



async function onEnter() {
    const getRequest = apiUrl + `formatted=true&q=${searchTerm.value}&username=jstanhope&maxRows=10&lang=en&style=full`;
    console.log(getRequest);
    
    // let city;
    main_loc.setLatLong(34, -84)
    main_loc.zoomAmount = 9;
    // await fetch(getRequest)
    // .then(response => {
    //     if (!response.ok) {
    //     throw new Error('Network response was not ok');
    //     }
    //     console.log("A")
        
    //     return response.json();
    // })
    // .then(data => {
    //     // console.log("B")
    //     // console.log(data);
    //     // console.log(data["geonames"][0]['lat'], data["geonames"][0]['lng'])
    //     main_loc.setLatLong(data["geonames"][0]['lat'], data["geonames"][0]['lng'])
    //     main_loc.isSet = true;
    //     main_loc.zoomAmount = 9;
    //     console.log(main_loc.isSet)
    //     city = data["geonames"][0]
    // })
    // .catch(error => {
    //     console.error('Error:', error);
    // });
    // console.log("City")
    // console.log(city)
    // query nearby cities
    
}
    
</script>
<template>
    <input type="text" placeholder="Search a Location..."
    v-on:keyup.enter="onEnter"
    v-model="searchTerm"/>
    <button @click="onEnter">Submit</button>

</template>