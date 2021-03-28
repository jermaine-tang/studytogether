<template>
    <div>
        <app-header></app-header>
        <div>
            <div> Filter By: </div>
            <div><label for="name">Location:</label><br>
                <input type="checkbox" id="North" value="North" v-model="location">
                <label for="North">North</label>
                <input type="checkbox" id="South" value="South" v-model="location">
                <label for="South">South</label>
                <input type="checkbox" id="East" value="East" v-model="location">
                <label for="East">East</label>
                <input type="checkbox" id="West" value="West" v-model="location">
                <label for="West">West</label>
                <input type="checkbox" id="Central" value="Central" v-model="location">
                <label for="Central">Central</label>
            </div>
            <div>
                <label for="name">Price Point:</label><br>
                <input type="checkbox" id="cheap" value="cheap" v-model="price">
                <label for="cheap"></label>
                <img src="https://img.icons8.com/metro/26/000000/us-dollar--v1.png" width="40px"/>
                <input type="checkbox" id="medium" value="medium" v-model="price">
                <label for="medium"> </label>
                <img src="https://img.icons8.com/metro/26/000000/us-dollar--v1.png" width="40px"/>
                <img src="https://img.icons8.com/metro/26/000000/us-dollar--v1.png" width="40px"/>
                <input type="checkbox" id="expensive" value="expensive" v-model="price">
                <label for="expensive"></label>
                <img src="https://img.icons8.com/metro/26/000000/us-dollar--v1.png" width="40px"/>
                <img src="https://img.icons8.com/metro/26/000000/us-dollar--v1.png" width="40px"/>
                <img src="https://img.icons8.com/metro/26/000000/us-dollar--v1.png" width="40px"/>
            </div>
            <div>
                <label for="name">Noise Level:</label><br>
                <input type="checkbox" id="quiet" value=1 v-model.number="noise">
                <label for="quiet"></label>
                <img id="noise-pic" src="https://img.icons8.com/fluent-systems-regular/24/000000/low-volume.png" width="40px"/>
                <input type="checkbox" id="moderate" value=2 v-model.number="noise">
                <label for="moderate"></label>
                <img id="noise-pic" src="https://img.icons8.com/fluent-systems-regular/24/000000/low-volume.png" width="40px"/>
                <img id="noise-pic" src="https://img.icons8.com/fluent-systems-regular/24/000000/low-volume.png" width="40px"/>
                <input type="checkbox" id="loud" value=3 v-model.number="noise">
                <label for="loud"></label>
                <img id="noise-pic" src="https://img.icons8.com/fluent-systems-regular/24/000000/low-volume.png" width="40px"/>
                <img id="noise-pic" src="https://img.icons8.com/fluent-systems-regular/24/000000/low-volume.png" width="40px"/>
                <img id="noise-pic" src="https://img.icons8.com/fluent-systems-regular/24/000000/low-volume.png" width="40px"/>
            </div>
        </div>
        <button v-on:click="goListing(); applyFilter()">Apply Filter</button>
    </div>
</template>

<script>
import Header from "./UI/Header.vue";

export default {
  data() {
    return {
        location: [],
        price: [],
        noise: []
    }
  },

  props:{
      applyFilter: {
          type: Function
      }
  },
    components: {
    "app-header": Header,
  },

  methods: {
      goListing: function() {
          this.$router.push({name: 'listings', params: {location: this.location, price: this.price, noise: this.noise}})
      }
  }
}
</script>

<style scoped>

</style>