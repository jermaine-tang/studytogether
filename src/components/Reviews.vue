<template>
<div id="review">
    <app-header></app-header>
    <h1> Write a Review </h1>
    <br><br>
    <img :src="listingDetail['photoURL2']" alt="listing-pic" id="main-pic">
    <span id="name">{{listingDetail['name']}}</span>
    <br><br>
    <form>
        <label for="title"> Title: </label> 
        <input type="text" style="background-color:#DCDCDC">
        <br><br>
        <label for="reviewText" id="reviewLabel">Review: </label>
        <textarea name="reviewText" id="reviewText" cols="30" rows="10" style="background-color:#DCDCDC"></textarea>
    </form>
    <br><br>
    <label for="noise" id="noise">Noise:</label>
    <span></span>
    <select id="noiseOptions" name="noiseOptions">
        <option value="veryQuiet">Very Quiet</option>
        <option value="quiet">Quiet</option>
        <option value="tolerable">Tolerable</option>
        <option value="whiteNoise">White Noise</option>
    </select>
    <br><br>
    <label for="rating">Rating:</label>
    <img src="https://img.icons8.com/fluent/48/000000/star.png"/>
    <img src="https://img.icons8.com/fluent/48/000000/star.png"/>
    <img src="https://img.icons8.com/fluent/48/000000/star.png"/>
    <img src="https://img.icons8.com/fluent/48/000000/star.png"/>
    <img src="https://img.icons8.com/fluent/48/000000/star.png"/>
</div>

    
</template>

<script>
// import func from 'vue-editor-bridge';
import Header from './UI/Header.vue';
import database from '../firebase.js';

export default {

    data() {
        return {
            listingDetail: {}
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
    },

    created: function() {
        // alert(this.$route.params.id)
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
</style>
