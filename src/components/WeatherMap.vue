<script setup lang="ts">
import hereIcon from "@/assets/location-sign.svg";
import { computed, reactive, ref } from "vue";
import type { View } from "ol";
import type { ObjectEvent } from "ol/Object";
import { main_loc, nearby_locs } from '@/components/state/state.js'

// const center = reactive([main_loc.lat, main_loc.long]);
const projection = ref("EPSG:4326");
const zoom = ref(2);
const view = ref<View>();
const map = ref(null);
const position = ref([]);

const marker = ref([main_loc.lat, main_loc.long])


</script>

<template>
  <ol-map
    :loadTilesWhileAnimating="true"
    :loadTilesWhileInteracting="true"
    :constrainedCenter="true"
    style="height: 400px; width: 800px"
    ref="map"
  >
    <ol-view
      ref="view"
      :center="[main_loc.long, main_loc.lat]"
      :zoom="main_loc.zoomAmount"
      :projection="projection"
    />

    <ol-vector-layer :zIndex="2" v-if="main_loc.isSet">
      <ol-source-vector>
        <ol-feature ref="positionFeature">
          <ol-geom-point :coordinates="[main_loc.long, main_loc.lat]"></ol-geom-point>
          <ol-style>
            <ol-style-icon :src="hereIcon" :scale="0.05"></ol-style-icon>
          </ol-style>
        </ol-feature>
      </ol-source-vector>
    </ol-vector-layer>

    <ol-vector-layer :zIndex="2" v-for="nearby_loc in nearby_locs.locs">
      <ol-source-vector>
        <ol-feature ref="positionFeature">
          <ol-geom-point :coordinates="[nearby_loc.long, nearby_loc.lat]"></ol-geom-point>
          <ol-style>
            <ol-style-icon :src="nearby_loc.weatherDesc.day.image" :scale="0.5"></ol-style-icon>
          </ol-style>
        </ol-feature>
      </ol-source-vector>
    </ol-vector-layer>

    <ol-tile-layer>
      <ol-source-osm />
    </ol-tile-layer>

  </ol-map>
</template>

