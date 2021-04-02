<template>
<div id="review">
    <app-header></app-header>
    <h1> Write a Review </h1>
    <h3>Thank you !</h3>
    <br><br>
    <img :src="listingDetail['photoURL2']" alt="listing-pic" id="main-pic">
    <span id="name">{{listingDetail['name']}}</span>
    <br><br>
    <form id="feedback">
        <label for="title"> Title: </label> 
        <input type="text" style="background-color:#DCDCDC" v-model="title" required>
        <br><br>
        <label for="reviewText" id="reviewLabel">Review: </label>
        <textarea name="reviewText" id="reviewText" cols="30" rows="10" style="background-color:#DCDCDC" v-model="comment" required>
        </textarea>
    </form>
    <br><br>
    <label for="noise" id="noise">Noise:</label>
    <span></span>
    <select id="noiseOptions" name="noiseOptions" v-model="noise" required>
        <option value=1>1 - Quiet</option>
        <option value=2>2 - Tolerable</option>
        <option value=3>3 - Some Noise</option>
    </select>
    <br><br>
    <label for="rating" id="rating">Rating:</label>
    <select id="rating" name="rating" v-model="rating" required>
        <option value=1>1 - Very Poor</option>
        <option value=2>2 - Poor</option>
        <option value=3>3 - Average</option>
        <option value=4>4 - Good</option>
        <option value=5>5 - Excellent</option>
    </select>
    <!-- <label for="rating">Rating:</label>
    <img src="https://img.icons8.com/fluent/48/000000/star.png"/>
    <img src="https://img.icons8.com/fluent/48/000000/star.png"/>
    <img src="https://img.icons8.com/fluent/48/000000/star.png"/>
    <img src="https://img.icons8.com/fluent/48/000000/star.png"/>
    <img src="https://img.icons8.com/fluent/48/000000/star.png"/> -->
    <br><br><br>
    <input type="submit" value="submit" v-on:click="send()">
    <br><br><br>
</div>

    
</template>

<script>
import Header from './UI/Header.vue';
import database from '../firebase.js';
import firebase from 'firebase';

export default {

    data() {
        return {
            listingDetail: {},
            title: '',
            comment: '',
            noise: 0,
            rating: 0,
        }
    },

    components: {
        'app-header':Header
    },

    methods: {
        fetchItems: function() {
            database.collection('listings').doc(this.$route.params.id).get().then(snapshot => {
                const toAdd = snapshot.data();
                this.listingDetail = toAdd;
                console.log(toAdd);
                console.log(this.listingDetail);
                })     
            },

            send: async function() {
                const locationId = this.$route.params.id
                const userId = firebase.auth().currentUser.uid
                async function retrieveUser(idOfUser) {
                    var username = ''
                        await database.collection('users').doc(idOfUser).get().then(doc => {
                            let data = doc.data()
                            username = data['name']
                        })
                    return username;
                }
                let username = await retrieveUser(userId)


                database.collection('listings').doc(locationId).collection('reviews').add({
                    title: this.title,
                    comments: this.comment,
                    noise: Number(this.noise),
                    rating: Number(this.rating),
                    userid: userId,
                    user: username
                })

                database.collection('listings').doc(this.$route.params.id).get().then(snapshot => {
                    const toUpdate = snapshot.data();
                    var newNumRatings = toUpdate.numRatings + 1;
                    var newRatingTotal = Number(toUpdate.totalRating) + Number(this.rating);
                    var newAvgRating = Math.round(Number(newRatingTotal) / Number(newNumRatings));
                    var newNoiseTotal = Number(toUpdate.totalNoise) + Number(this.noise);
                    var newAvgNoise = Math.round(Number(newNoiseTotal) / Number(newNumRatings));
                    database.collection('listings').doc(this.$route.params.id).update({rating: newAvgRating, totalRating: newRatingTotal, numRatings: newNumRatings, noise: newAvgNoise, totalNoise: newNoiseTotal}).then(
                    this.$router.push({path: "/bookings"}));
                
                })  

                
            }
    },

    created: function() {
        this.fetchItems()
    },
}
</script>

<style scoped>
#main-pic {
    position: relative;
    right: 150px;
    height: 180px;
    width: 180px;
    border-radius: 30px;
}

#name {
    position: relative;
    bottom: 100px;
    font-size: 40px;
}

#reviewLabel {
    position: relative;
    bottom: 150px;
}
/* start of imported css */
</style>
