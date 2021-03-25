<template>
    <div>
        <app-header></app-header>
        <div>
            <div> Filter By: </div>
            <div><label for="name">Location:</label><br>
                <input type="radio" id="North" value="North" v-model="location">
                <label for="North">North</label>
                <input type="radio" id="South" value="South" v-model="location">
                <label for="South">South</label>
                <input type="radio" id="East" value="East" v-model="location">
                <label for="East">East</label>
                <input type="radio" id="West" value="West" v-model="location">
                <label for="West">West</label>
                <input type="radio" id="Central" value="Central" v-model="location">
                <label for="Central">Central</label>
            </div>
            <div>
                <label for="name">Price Point:</label><br>
            </div>
            <div>
                <label for="name">Noise Level:</label><br>
            </div>
        </div>
        <button v-on:click="updateListing">Apply Filter</button>
    </div>
</template>

<script>
import Header from "./UI/Header.vue";

export default {
  data() {
    return {
        location: "", //change to array
        price: 0,
        noise: 0
    }
  },
    components: {
    "app-header": Header,
  },

  methods: {
      updateListing: function() {
          this.$router.push({path: "listings"})
      }
  }
}
</script>
