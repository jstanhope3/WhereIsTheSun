
import { reactive, ref } from "vue";

export const main_loc = reactive({
    isSet: false,
    long: 8.4737,
    lat: 47.3863,
    zoomAmount: 4,
    radius: 20,
    setLatLong(lat, long) {
        this.lat = lat;
        this.long = long;
    }
})