<template>
<div id="bookings list">
    <app-header></app-header>
    <h1>Bookings</h1>
    <div class="table" v-if="newBookings.length > 0">
        <ul>
            <h3><b>Upcoming</b></h3>
            <li v-for="(booking,key) in newBookings" :key="booking.index">
                <div id="name"><b>{{booking[6]}}</b></div>
                <br>
                <!-- picture -->
                <img :src="booking[5]" alt="picture" id="main-pic">
                <!-- button -->
                <button href="#" class="btn" v-bind:val="booking[7]" v-on:click="cancel(key); del($event)">
                    Cancel Booking
                </button>
                <!-- pax -->
                <div id="pax"><b>Total Coming: {{booking[1]}}</b></div>
                <!-- timing -->
                <div id="clockIcon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <circle cx="12" cy="12" r="9" />
                        <polyline points="12 7 12 12 15 15" />
                    </svg>
                    <span id="date"><b>{{booking[3]}}</b></span>
                    <ul id="time">
                         <li id="timings" v-for="timing in booking[4]" :key="timing.index">
                             {{timing}}
                        </li>
                    </ul>                   
                </div>
            </li>
        </ul>
    </div>

    <div class="past-booking-list" v-if="pastBookings.length > 0">
        <ul>
            <h3><b>Previous</b></h3>
            <li v-for="booking in pastBookings" :key="booking.index">
                <div id="name"><b>{{booking[6]}}</b></div>
                <br>
                <!-- picture -->
                <img :src="booking[5]" alt="picture" id="main-pic">
                <!-- button -->
                <button href="#" class="btn" v-bind:id ="booking[2]" v-on:click="route($event)">
                    <!-- <b>Leave Review</b> -->
                    Leave Review
                </button>
                <!-- pax -->
                <div id="pax"><b>Total Coming: {{booking[1]}}</b></div>
                <!-- timing -->
                <div id="clockIcon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <circle cx="12" cy="12" r="9" />
                        <polyline points="12 7 12 12 15 15" />
                    </svg>
                    <span id="date"><b>{{booking[3]}}</b></span>
                    <ul id="time">
                         <li id="timings" v-for="timing in booking[4]" :key="timing.index">
                             {{timing}}
                        </li>
                    </ul> 
                </div>
            </li>
        </ul>
    </div>
    
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
            let doc_id = event.target.getAttribute("id");
            this.$router.push({path: `reviews/${doc_id}`, query: {id: doc_id}})
        },

        visitDateToString: function(dateOfVisit) {
            // dateOfVisit == Apr 17 2021
            // month == Apr
            let month = dateOfVisit.slice(0,3)
            // day == 17
            let day = dateOfVisit.slice(4,6)
            // year == 21
            let year = dateOfVisit.slice(-2)

            let monthString = ''
            let dayString = day
            let yearString = year

            if (month == 'Jan') {
                monthString = '01'
            } else if (month == 'Feb') {
                monthString = '02'
            } else if (month == 'Mar') {
                monthString = '03'
            } else if (month == 'Apr') {
                monthString = '04'
            } else if (month == 'May') {
                monthString = '05'
            } else if  (month == 'Jun') {
                monthString = '06'
            } else if (month == 'Jul') {
                monthString = '07'
            } else if (month == 'Aug') {
                monthString = '08'
            } else if (month == 'Sep') {
                monthString = '09'
            } else if (month == 'Oct') {
                monthString = '10'
            } else if (month == 'Nov') {
                monthString = '11'
            } else if (month == 'Dec') {
                monthString = '12'
            }
            return dayString + monthString + yearString
        },

        del: async function(event) {
            let values = event.target.getAttribute("val")
            let id = values.split(',')[0]
            let loc = values.split(',')[1]
            let pax = values.split(',')[2]
            let dateOfVisit = values.split(',')[3]
            let stringOfVisitDate = this.visitDateToString(dateOfVisit)

            async function getTime() {                
                let time = []
                await database.collection('bookings').doc(id).get().then(doc => {
                    let data = doc.data()
                    let timeArr = data['time']
                    time = timeArr
                })
                return time
            }

            let arrOfBookings = await getTime()

            const increasePax = firebase.firestore.FieldValue.increment(pax)
            const timeslots = database.collection('listings').doc(loc).collection('timeslots').doc(stringOfVisitDate)
        
            for(var booking of arrOfBookings) {
                console.log(booking)
                timeslots.update({
                    [booking] :increasePax
                })
            }
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
                    arr.push(item)
                })
            })
            return arr
        },

        fetchItems: async function() {
            this.docArr = await this.getDoc()
            var currentUser = firebase.auth().currentUser.uid 
            // console.log(currentUser)
            let upcoming = []
            let past = []

            function sortByDateUpcoming(a, b) {
                if (new Date(a[3]) == new Date(b[3])) {
                    return 0;
                } else {
                    return (new Date(a[3]) < new Date(b[3])) ? -1 : 1;
                }
            }

            function sortByDatePast(a, b) {
                if (new Date(a[3]) == new Date(b[3])) {
                    return 0;
                } else {
                    return (new Date(a[3]) > new Date(b[3])) ? -1 : 1;
                }
            }
            // sorts the timings in the 'time' array in firestore. 
            // if the array is ['0900 - 1000', '0800 - 0900', '1400 - 1500','1300 - 1400'],
            // it returns ['0800 - 0900', '0900 - 1000', '1300 - 1400','1400 - 1500']
            function sortByTiming(a, b) {
                if (Number(a.slice(0,2)) == Number(b.slice(0,2))) {
                    return 0;
                } else {
                    return (Number(a.slice(0,2)) < Number(b.slice(0,2))) ? -1 : 1;
                }
            }
            // segements the timings into intervals. 
            // E.g if the sorted array is ['0800 - 0900', '0900 - 1000', '1000 - 1100', '1300 - 1400','1400 -1500']
            // it returns ['0800 - 1100', '1300 - 1500']
            function segmentToIntervals(arr) {
                var intervals = []
                var currTime = arr[0].slice(0,4)

                for (var i = 0; i < arr.length; i++) {
                    if (i == arr.length - 1) {
                        currTime = currTime + ' - ' + arr[i].slice(-4)
                        intervals.push(currTime)
                    } else if (arr[i].slice(-4) != arr[i + 1].slice(0,4)) {
                        currTime = currTime + ' - ' + arr[i].slice(-4)
                        intervals.push(currTime)
                        currTime = arr[i + 1].slice(0,4)
                    } else {
                        continue
                    }
                }
                return intervals
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
                // get the array of timings booked
                let time = doc['time']
                // sort the array
                let sortedTimings = time.sort(sortByTiming)
                // get all the intervals booked by the user and store into an array called 'duration'
                let duration = segmentToIntervals(sortedTimings)
                // v-bind values
                let vbindValues = [...id, location, pax, dateOfVisit]

                let booking = [userid, pax, location, dateOfVisit, duration]
                let combined = [...booking, ...locationAndName, vbindValues]
    
                if(new Date() < new Date(combined[3]) && combined[0] == currentUser) {
                    upcoming.push(combined)
                    upcoming.sort(sortByDateUpcoming)
                } else if(combined[0] == currentUser) {
                    past.push(combined)
                    past.sort(sortByDatePast)
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
  /* display: flex; 
  flex-wrap: wrap;
  list-style-type: none;
  padding: 30%;
  padding-top: 3%; 
  margin: auto;
  height:30%; */
  display: inline-block;
  overflow-y: scroll;
  list-style-type: none;
  height: 100%;
  width: 100%;
  vertical-align:top;
  padding-left: 0px;
}

li {
  display: inline-block;
  width: 50%;
  /* height: 80%; */
  position: relative;
  text-align: center;
  padding: 10px;
  border: 3px solid #ED7A78;
  margin: 10px;
  margin-top: 5px;
  margin-bottom: 0px;
  padding-bottom: 1px;
  border-radius: 25px;
  font-family: "Ubuntu", sans-serif;
  margin: 0 0 10 0;
}

h1 {
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    font-size: 40px;
}

h3 {
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    font-size: 20px;
}
/* .bookings-list {
    margin-left: 36px;
} */

.table {
	display: table;   
	margin: 0 auto;
    height: 100%;
    width: 100%;
}

.status {
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    font-size: 25px;
}

.btn {
    position: relative;
    /* float: left; */
    left: 20%;
    /* top: 20%; */
    bottom:150px;
    /* margin-top: 10px;
    margin-bottom: 10px; */
    display: inline-block;
    cursor: pointer;
    border-radius: 10px;
    color: whitesmoke;
    background: #ED7A78;
    border: 2px solid transparent;
    height: 50px;
    width: 90px;
    padding-left: 10px;
    padding-right: 10px;
    padding-bottom: 50px;
    padding-top: 10px;
    font-family: "Ubuntu", sans-serif;
    /* font-weight: bold; */
    font-size: 15px;
    transition: 0.2s;
}

#time {
    display: inline-block;
    list-style-type: none;
    padding-left: 0px;
}

#timings {
    display: inline-block;
    border: none;
}


#pax {
    position: relative;
    left: 10%;
    bottom: 220px;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    font-size: 15px;
}

#clockIcon {
    position: relative;
    left: 10%;
    bottom: 200px;
}

#main-pic {
  position: relative;
  right:20%;
  border-radius: 15px;
  width: 40%;
  height: 40%;
  
}

#name {
    position: relative;
    width:100%;
    right: 1px;
    font-family:Verdana, Geneva, Tahoma, sans-serif;
    font-size: 25px;
    font-weight: 1000;
}

#date {
    position: relative;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    font-size: 16px;
    left: 10px;
    bottom: 15px;
}

#button {
    position:relative;

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