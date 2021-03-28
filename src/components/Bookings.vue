<template>
<div id="bookings list">
    <app-header></app-header>
    <h1>Bookings</h1>
    <ul class="bookings-list">
        <span class="status">Upcoming</span>
        <li>
            <!-- picture of cafe -->
            <img id="main-pic" src = "https://danielfooddiary.com/wp-content/uploads/2019/07/banchongcafe1.jpg">
            <div id="name"><b> Happy Cafe </b></div>
            <!-- Button to cancel booking -->
            <button class="button"><b>Cancel Booking</b></button>
            <!-- clock icon image and time of visit in a single div-->
            <div id="clockIcon">
            <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <circle cx="12" cy="12" r="9" />
                <polyline points="12 7 12 12 15 15" />
            </svg>
            <span id="time"><b>21 March 2021 / 12:00 - 16:00</b></span>
            </div>
        </li>
        <span class="status">Previous</span>
        <li>
            <img id="main-pic" src = "https://thesmartlocal.com/wp-content/uploads/2019/09/Cafes-North-Singapore-14.jpg">
            <div id="name"><b> Bright Cafe </b></div>
            <button class="button" v-on:click="sendReview()" ><b>Leave Review</b></button>
            <div id="clockIcon">
            <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <circle cx="12" cy="12" r="9" />
                <polyline points="12 7 12 12 15 15" />
            </svg>
            <span id="time"><b>1 Feb 2021 / 13:00 - 17:00</b></span>
            </div>
        </li>
    </ul>
</div>
    
</template>

<script>
import Header from './UI/Header.vue';

export default {
    data() {
        return {
        }
    },
    methods: {
        sendReview: function() {
            this.$router.push({path:'reviews'})
        }
    },
    components: {
        "app-header": Header
    }
}
</script>

<style scoped>
ul {
  display: flex; 
  flex-wrap: wrap;
  list-style-type: none;
  padding: 30%;
  padding-top: 3%; 
  margin: auto;
}

li {
  display: flex;
  flex-wrap: wrap;
  width: 1000px;
  position: relative;
/*  flex-basis: 300px; */
  text-align: center;
  padding: 10px;
  border: 3px solid #ED7A78;
  margin: 10px;
  margin-top: 5px;
  border-radius: 25px;
  font-family: "Ubuntu", sans-serif;
  margin: 0 0 10 0;
}

/* .bookings-list {
    margin-left: 36px;
} */

.status {
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    font-size: 25px;
}

.button {
    position: relative;
    left: 90px;
    height: 50px;
    width: 90px;
}

#clockIcon {
    position: absolute;
    top: 100px;
    left: 235px;    
}

#main-pic {
  position: relative;
  /* left: 1px; */
  border-radius: 15px;
  width: 200px;
  height: 150px;
}

#name {
    position: relative;
    left: 30px;
    top: 15px;
    font-family:Verdana, Geneva, Tahoma, sans-serif;
    font-size: 30px;
    font-weight: 1000;
}

#time {
    position: relative;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    font-size: 16px;
    left: 10px;
    bottom: 15px;
}
</style>