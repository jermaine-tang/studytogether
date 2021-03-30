<template>
<div id="bookings list">
    <app-header></app-header>
    <h1>Bookings</h1>
    <ul class="bookings-list">
        <li v-for="booking in bookings" :key="booking.index">
            <!-- userid -->
            <div>{{booking[0]}}</div>
            <hr>
            <!-- photo url -->
            <div>{{booking[1]}}</div>
            <hr>
            <!-- cafe name -->
            <div>{{booking[2]}}</div>
            <hr>
            <!-- date of visit -->
            <div>{{booking[3]}}</div>
            <hr>
            <!-- duration -->
            <div>{{booking[4]}}</div>

            <!-- <img :src="booking[1]" alt="picture"> -->
            <!-- <div>{{booking[0]}}</div> -->
            <!-- <div id="name"><b>{{booking[2]}}</b></div>
            <div id="clockIcon">
                <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <circle cx="12" cy="12" r="9" />
                    <polyline points="12 7 12 12 15 15" />
                </svg>
                <span id="time"><b>{{booking[3]}}</b></span>
            </div> -->
        </li>
        <!-- <span class="status">Upcoming</span>
        <li>
            
            <img id="main-pic" src = "https://danielfooddiary.com/wp-content/uploads/2019/07/banchongcafe1.jpg">
            <div id="name"><b> Happy Cafe </b></div>
            
            <button class="button"><b>Cancel Booking</b></button>
            
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
        </li> -->
    </ul>
</div>
    
</template>

<script>
import Header from './UI/Header.vue';
import database from '../firebase.js';

export default {
    data() {
        return {
            // list of all bookings
            bookings: []
        }
    },
    methods: {
        sendReview: function() {
            this.$router.push({path:'reviews'})
        },

        fetchItems: function() {
            var booking = []
            database.collection('bookings').get().then(querySnapShot =>{
                querySnapShot.docs.forEach(doc => {
                    let data = doc.data()
                    let userId = data['userid']
                    booking[0] = userId
                    let locationId = data['location']
                    var document = database.collection('listings').doc(locationId).get().then(doc =>{
                        var dd = doc.data()
                        // phot url of cafe
                        var photo = dd['photoURL2']
                        // name of cafe
                        var name = dd['name']
                        return [photo, name]
                    })
                    booking.concat(document)
                    let time = data['time']
                    let duration = `${time[0].slice(0,4)}` + " - " + `${time.pop().slice(-4)}`
                    let dateOfVisit = data['date'].toDate().toString().slice(4,15)
                    booking[3] = dateOfVisit
                    booking[4] = duration
                })
            })

            this.bookings.push(booking)
        },
    },

    components: {
        "app-header": Header
    },

    watch: {

    },

    created: function() {
        this.fetchItems()
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