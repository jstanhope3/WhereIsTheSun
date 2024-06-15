    
<script setup>
const emit = defineEmits(['change-loc']);
import { ref } from "vue";
import { main_loc, nearby_locs } from '@/components/state/state.js'
import wmo_codes from '../../public/wmocodes.json'
const searchTerm = ref('');

const apiUrl = 'https://secure.geonames.org/searchJSON?';
const nearbyApiURL = 'https://secure.geonames.org/findNearbyPlaceNameJSON?'
const weatherApiUrl = "https://api.open-meteo.com/v1/forecast?forecast_days=1&daily=weather_code&"

async function getWeather(lat, long) {
    const weatherRequest = weatherApiUrl + `latitude=${lat}&longitude=${long}`
    var weatherDesc = {}
    console.log(weatherRequest)
    await fetch(weatherRequest)
    .then(response => {
        if (!response.ok) {
        throw new Error('Network response was not ok');
        }        
        return response.json();
    })
    .then(data => {
        const wmocode = data["daily"]["weather_code"]
        console.log(wmocode)
        weatherDesc = wmo_codes[wmocode[0]];
    })
    .catch(error => {
        console.error('Error:', error);
    });
    return weatherDesc;
}

async function onEnter() {

    if (searchTerm.value == "") {
        return;
    }

    const getRequest = apiUrl + `formatted=true&q=${searchTerm.value}&username=jstanhope&maxRows=10&lang=en&style=full`;
    console.log(getRequest);
    
    let city;
    await fetch(getRequest)
    .then(response => {
        if (!response.ok) {
        throw new Error('Network response was not ok');
        }
        console.log("A")
        
        return response.json();
    })
    .then(data => {
        // console.log("B")
        // console.log(data);
        // console.log(data["geonames"][0]['lat'], data["geonames"][0]['lng'])
        main_loc.setLatLong(data["geonames"][0]['lat'], data["geonames"][0]['lng'])
        main_loc.isSet = true;
        main_loc.zoomAmount = 9;
        console.log(main_loc.isSet)
        city = data["geonames"][0]
    })
    .catch(error => {
        console.error('Error:', error);
    });
    console.log("City")
    console.log(city)

    // query nearby cities
    const nearbyRequest = nearbyApiURL + `formatted=true&lat=${main_loc.lat}&lng=${main_loc.long}&radius=${main_loc.radius}&username=jstanhope&maxRows=100&cities=cities1000`
    let nearby_cities = []
    console.log(nearbyRequest);
    await fetch(nearbyRequest)
    .then(response => {
        if (!response.ok) {
        throw new Error('Network response was not ok');
        }        
        return response.json();
    })
    .then(data => {
        console.log("C")
        console.log(data);
        nearby_cities = data["geonames"];
    })
    .catch(error => {
        console.error('Error:', error);
    });

    nearby_locs.locs.length = 0;
    for (var j = 0; j < nearby_cities.length; j++) {
        let obj = {
            city_name: nearby_cities[j]["name"],
            population: nearby_cities[j]["population"],
            lat: nearby_cities[j]["lat"],
            long: nearby_cities[j]["lng"],
            weatherDesc: await getWeather(nearby_cities[j]["lat"], nearby_cities[j]["lng"]),
        }
        nearby_locs.locs.push(obj)
    }
    console.log("nearby locs")
    console.log(nearby_locs)

    // populate weather data
}
    
</script>
<template>
    <input type="text" placeholder="Search a Location..."
    v-on:keyup.enter="onEnter"
    v-model="searchTerm"/>
    <button @click="onEnter">Submit</button>

</template>