<template>
    <div>
        <app-header></app-header>

        <div class="box">
            <p class="title">Make A Reservation</p>
            <form class="form">
                <label for="">PAX: </label>
                <select v-model="pax">
                    <option v-for="num in 5" v-bind:key="num">{{num}}</option>
                </select>
                <label for="date">Date</label>
                <input type="text" v-model="date">
                <label for="time">Timeslot</label>
                <input type="text" v-model="time">

                <button type="submit" v-on:click="submit">Submit</button>
                
            </form>
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
            pax: "",
            date: "",
            time: ""
        }
    },
    components: {
        'app-header': Header
    },
    
    mounted() {
        console.log(this.$route.params.id)
    },

    methods: {
        test: function() {
            console.log(this.$route.params);
        },

        fetchData: function() {
            database.collection('')
        },

        submit: function(e) {

            e.preventDefault()

            var user = firebase.auth().currentUser;

            var data = {
                location: this.$route.params.id,
                userid: user.uid,
                name: user.displayName,
                pax: this.pax,
                date: this.date,
                time: this.time
            }
            
            database.collection('bookings').add(data)
        }


    }
}
</script>

<style scoped>

</style>