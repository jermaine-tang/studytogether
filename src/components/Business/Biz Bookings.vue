<template>
<div id="biz bookings">
    <app-header></app-header>
    <h1 id="title">Bookings</h1>
    <br><br>
    <div id="mybizbookings">
        <ul>
            <li v-for="booking in bookings" :key="booking.index">
                <!-- date of coming -->
                <div id="dateComing">
                    {{booking[1]}}
                </div>
                <hr>
                <!-- iterations of all customers coming on that date -->
                <div>
                    <ul class="customers">
                        <li id="customer" v-for="customer in booking[2]" :key="customer.index">
                            <!-- customer name and pax -->
                            <div id="customerName">{{customer[0]}}  (pax: {{customer[1]}})  </div>
                            <!-- customer[2] refers to duration which is an array -->
                            <!-- E.g ['0700 - 1000', '1100 - 1200', '1300 - 1500'] -->
                            <br>
                            <ul>
                                <li v-for="interval in customer[2]" :key="interval.index">
                                    <!-- E.g '0700 - 1000' -->
                                    {{interval}}
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>

            </li>
        </ul>
    </div>
</div>
</template>

<script>
import Header from '/src/components/UI/Header.vue';
import firebase from 'firebase';
import database from '/src/firebase.js';

export default {

    data() {
        return {
            bookings: [],
            timeslots: []
        }
    },

    methods: {

        getDoc: async function() {
            // hardcode
            var userId = '5iBl58sV6uv7riUzCQzn'

            // CurrentUSer.uid == listing doc ID
            // var userId = firebase.auth().currentUser.uid
            var arr = []
            await database.collection('listings').doc(userId).collection('timeslots').get().then(querySnapShot => {
                let slot = {}
                querySnapShot.docs.forEach(doc => {
                    slot = {['id']: doc.id}
                    arr.push(slot)
                })
            })
            return arr
        },

        fetchItems: async function() {
            this.timeslots = await this.getDoc()
            var listOfBookings = []
           
            function sortByDate(a, b) {
                if (a[0] == b[0]) {
                    return 0;
                } else {
                    return (a[0] < b[0]) ? -1 : 1;
                }
            }

            function sortByTiming(a, b) {
                if (Number(a.slice(0,2)) == Number(b.slice(0,2))) {
                    return 0;
                } else {
                    return (Number(a.slice(0,2)) < Number(b.slice(0,2))) ? -1 : 1;
                }
            }

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

            this.timeslots.forEach(async function(slot) {
                let timeslot = slot['id']
                let day = timeslot.slice(0,2) // 17
                let month = timeslot.slice(2,4) // 04
                let year = timeslot.slice(4,6) // 21
                let dateInput = '20' + year + '-' + month + '-' + day
                
                let dateObj = new Date(dateInput)
                let dateObj_copy = new Date(dateInput)
                dateObj_copy.setHours(dateObj_copy.getHours() - 8);
               
                let dateObjdayForward = new Date(dateObj.getTime())
                dateObjdayForward.setDate(dateObjdayForward.getDate() + 1)
                dateObjdayForward.setHours(dateObjdayForward.getHours() - 8)
                
                let timeObj = firebase.firestore.Timestamp.fromDate(dateObj_copy)
                let timeObjLimit = firebase.firestore.Timestamp.fromDate(dateObjdayForward)
                let outputDate = dateObj.toDateString()
                let outputDay = outputDate.slice(-7,-5)
                let outputYear = outputDate.slice(-4)
                let outputMonth = outputDate.slice(-11,-8)
                let date = outputDay + ' ' + outputMonth + ' ' + outputYear

                async function getNames(startDate, endDate) {

                    var customerinfos = []
                        await database.collection('bookings').where("date", ">=", startDate).where("date", "<", endDate).get().then((querySnapShot) => {
                            console.log(startDate.toDate().toDateString())
                            querySnapShot.docs.forEach(async function(doc) {

                                let data = doc.data()
                                let customerName = data['name']
                                let time = data['time']
                                // let start = time[0].slice(0,4)
                                // let end = time.pop().slice(-4)
                                time = time.sort(sortByTiming)
                                let duration = segmentToIntervals(time)
                                let pax = data['pax']
                                let customer = [customerName, pax, duration]
                                customerinfos.push(customer)
                            })
                        })
                    return customerinfos
                }
                let customersDetails = await getNames(timeObj, timeObjLimit)
               
                if(customersDetails.length != 0) {
                    let booking = [dateObj, date, customersDetails]
                    listOfBookings.push(booking)
                    listOfBookings.sort(sortByDate)
                }
            })
            this.bookings = listOfBookings
        }
    },

    created: function() {
        this.fetchItems()
    },

    components: {
        'app-header': Header
    }
}
</script>

<style scoped>

#title {
    position: relative;
    text-align: center;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    font-size: 40px;
}

#mybizbookings {
    font-size: 20px;
}

#mybizbookings ul {
    list-style-type: none; 
}

#mybizbookings li {
    font-size:25px;
    border: 5px solid #d6d6d6;
    border-radius: 25px;
    height: 100%;
    width: 45%;
    padding: 10px;
    margin: auto;
    margin-bottom: 30px;
    background-color: #ebebeb;
}

#mybizbookings #dateComing {
    font-size: 30px;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
}

#mybizbookings hr {
  display: block;
  margin-top: 0.5em;
  margin-bottom: 0.5em;
  margin-left: auto;
  margin-right: auto;
  border-style: inset;
  border-width: 1px;
  width: 90%;
  height: 12px;
  border: 0;
  box-shadow: inset 0 12px 12px -12px rgba(0, 0, 0, 0.5);
}

#mybizbookings #customer {
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    font-size: 20px;
    border: none;
    height: 100%;
    width: 70%;
    padding: 5px;
    margin: auto;
    margin-bottom: 30px;
    background-color: #ebebeb;
}

#customerName {
    font-size: 22px;
}
</style>
