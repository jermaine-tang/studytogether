<template>
<div id="bookings list">
    <app-header></app-header>
    <h1>Bookings</h1>
    <ul class="upcoming-bookings-list" v-if="newBookings.length > 0">
        <h3><b>Upcoming</b></h3>
        <li v-for="booking in newBookings" :key="booking.index">
            <img :src="booking[5]" alt="picture" id="main-pic">
            <div id="name"><b>{{booking[6]}}</b></div>
            <a href="#" class="btn-gradient yellow small" v-bind:id="booking[7]" v-on:click="cancel(booking.index); del($event)">
                Cancel Booking
            </a>
            <div id="pax"><b>Total Coming: {{booking[1]}}</b></div>
            <div id="clockIcon">
                <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <circle cx="12" cy="12" r="9" />
                    <polyline points="12 7 12 12 15 15" />
                </svg>
                <span id="time"><b>{{booking[3]}} / {{booking[4]}}</b></span>
            </div>
        </li>
    </ul>

    <ul class="past-booking-list">
        <h3><b>Previous</b></h3>
        <li v-for="booking in pastBookings" :key="booking.index">
            <img :src="booking[5]" alt="picture" id="main-pic">
            <div id="name"><b>{{booking[6]}}</b></div>
            <a href="#" class="btn-gradient yellow small" v-bind:id ="booking[2]" v-on:click="route($event)">
                <!-- <b>Leave Review</b> -->
                Leave Review
            </a>
            <div id="pax"><b>Total Coming: {{booking[1]}}</b></div>
            <div id="clockIcon">
                <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <circle cx="12" cy="12" r="9" />
                    <polyline points="12 7 12 12 15 15" />
                </svg>
                <span id="time"><b>{{booking[3]}} / {{booking[4]}}</b></span>
            </div>
        </li>
    </ul>
</div>
</template>

<script>
import Header from './UI/Header.vue';
import database from '../firebase.js';
import firebase from 'firebase';

export default {
    data() {
        return {
            pastBookings: [],
            newBookings: [],
            newBookingsNoDup: [],
            docArr: []
        }
    },
    methods: {
        sendReview: function() {
            this.$router.push({path:'reviews'})
        },

        route: function(event) {
            console.log(event)
            let doc_id = event.target.getAttribute("id");

            console.log(doc_id)
            console.log(this.pastBookings)
            this.$router.push({path: `reviews/${doc_id}`, query: {id: doc_id}})
        },

        del: function(event) {
            let id = event.target.getAttribute("id")
            alert(id)
            database.collection('bookings').doc(id).delete().then(() => console.log('delete success'))
        },

        cancel: function(idx) {
            this.newBookings.splice(idx,1)
        },
        
        getDoc: async function() {
            var arr = []
            await database.collection('bookings').get().then(querySnapShot => {
                let item = {}
                querySnapShot.docs.forEach(doc => {
                    item = {...doc.data(), ['id']: doc.id}
                    // console.log(item)
                    arr.push(item)
                })
            })
            return arr
        },

        fetchItems: async function() {
            this.docArr = await this.getDoc()
            var currentUser = firebase.auth().currentUser.uid 
            console.log(currentUser)
            let upcoming = []
            let past = []

            function sortByDate(a, b) {
                if (new Date(a[3]) == new Date(b[3])) {
                    return 0;
                } else {
                    return (new Date(a[3]) < new Date(b[3])) ? -1 : 1;
                }
            }

            this.docArr.forEach(async function(doc) {
                let id = [doc['id']]
                let userid = doc['userid']
                let location = doc['location']
                let pax = doc['pax']
                async function retrieve(locationId) {     
                    var locationData = []
                        await database.collection('listings').doc(locationId).get().then(doc => {
                            let listingData = doc.data()
                            locationData.push(listingData['photoURL1'])
                            locationData.push(listingData['name'])
                        })
                    return locationData
                }
                let locationAndName = await retrieve(location)                
                let date = doc['date'].toDate().toString()
                let dateOfVisit = date.slice(4,15)
                let time = doc['time']
                let start = time[0].slice(0,4)
                let end = time.pop().slice(-4)
                let duration = start + ' - ' + end
                let booking = [userid, pax, location, dateOfVisit, duration]
                let combined = [...booking, ...locationAndName,...id]
    
                if(new Date() < new Date(combined[3]) && combined[0] == currentUser) {
                    upcoming.push(combined)
                    upcoming.sort(sortByDate)
                } else if(combined[0] == currentUser) {
                    past.push(combined)
                    // edit 
                    past.sort(sortByDate)
                }
            })
            this.newBookings = upcoming
            this.pastBookings = past
        },
    },

    components: {
        "app-header": Header
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

/* button {
    position: relative;
    left: 150px;
    height: 50px;
    width: 90px;
    font-size: 15px;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
} */

#pax {
    position: absolute;
    left: 245px;
    bottom: 70px;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    font-size: 15px;
}

#clockIcon {
    position: absolute;
    top: 120px;
    left: 235px;    
}

#main-pic {
  position: relative;
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

/* imported css for buttons */

.btn-gradient {
	text-decoration: none;
	color: white;
	padding: 5px 10px;
	display: inline-block;
	position: relative;
    left: 150px;
    height: 50px;
    width: 90px;
    font-size: 15px;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
	border: 1px solid rgba(0,0,0,0.21);
	border-bottom: 4px solid rgba(0,0,0,0.21);
	border-radius: 4px;
	text-shadow: 0 1px 0 rgba(0,0,0,0.15);
}

.btn-gradient.yellow {
	background: rgba(240,210,100,1);
	background: -webkit-gradient(linear, 0 0, 0 100%, from(rgba(240,210,100,1)), to(rgba(229,201,96,1)));
	background: -webkit-linear-gradient(rgba(240,210,100,1) 0%, rgba(229,201,96,1) 100%);
	background: -moz-linear-gradient(rgba(240,210,100,1) 0%, rgba(229,201,96,1) 100%);
	background: -o-linear-gradient(rgba(240,210,100,1) 0%, rgba(229,201,96,1) 100%);
	background: linear-gradient(rgba(240,210,100,1) 0%, rgba(229,201,96,1) 100%);
	filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#f0d264', endColorstr='#e5c960', GradientType=0 );
}

.btn-gradient.red:active 	  {background: #E35252;}
.btn-gradient.orange:active {background: #E8601B;}
.btn-gradient.cyan:active 	{background: #169499;}
.btn-gradient.blue:active 	{background: #608FBF;}
.btn-gradient.purple:active {background: #BD8EB7;}
.btn-gradient.yellow:active {background: #DBC05B;}
.btn-gradient.green:active  {background: #72B08E;}
</style>