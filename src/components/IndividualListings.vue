<template>
    <div>
        <app-header></app-header>
        <div class="details">
            <div id="pics">
                <img class="place" v-bind:src = "listingDetails.photoURL1">
                <img class="place" v-bind:src = "listingDetails.photoURL2">
                <img class="place" v-bind:src = "listingDetails.photoURL3">
            </div>
            <div id="name">{{ listingDetails.name }}</div>
            <hr>
            <br>
            <div class="float-container">
            <div class="float-left">
            <div id="price">
            <!--    <img src="https://img.icons8.com/metro/26/000000/us-dollar--v1.png" width="35"/> -->
                <span id="priceVal">$ {{ listingDetails.price }} / hour</span>
            </div>
            <br>
            <div id="location">
                <img id="location-pin" src="https://img.icons8.com/pastel-glyph/64/000000/place-marker--v1.png" width=34px/>
                <span id="locationVal">  {{ listingDetails.exact_loc }} </span>
            </div>
            <br>
            <div id="noise">
                <img id="noise-pic" src="https://img.icons8.com/fluent-systems-regular/24/000000/low-volume.png" width=34px/>
                <span class="noiseVal" v-show="listingDetails.noise == 1"> Quiet </span>
                <span class="noiseVal" v-show="listingDetails.noise == 2"> Moderate </span>
                <span class="noiseVal" v-show="listingDetails.noise == 3"> Loud </span>
            </div>
            </div>
            <div class="float-right">
            <button class="book" v-on:click="bookPage()"><span>Book Now!</span></button>
            </div>
            </div>
            <br><br>
            <div id="amenities">
                <span>Amenities:</span>
                <ul id="amenitiesList">
                    <li v-for="i in listingDetails.amenities" :key="i.index">
                        {{ i }}
                    </li>
                </ul>
            </div>
            <br>
            <div id="menu" v-if="listingDetails.menu">
                Menu:
                <br><br>
                <img v-bind:src = "listingDetails.menu">
            </div>
            <br><br>
            <div id="reviews">
                Reviews:
                <br><br>
                <div v-if="reviews.length == 0">No reviews yet. Make a booking and be the first to leave a review!</div>
                <div v-if="reviews.length != 0">
                    <ul>
                        <li v-for="review in reviews" :key="review.id">
                            <div id="title"> {{ review.title }} </div>
                            <hr>
                            <div id="comment"> {{ review.comments }} </div>
                            <div id="noiseLvl"> Noise: {{ review.noise }} </div>
                            <div id="rating"> Rating: {{ review.rating }} </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template> 

<script>
import Header from "./UI/Header.vue";
import database from '../firebase.js';

export default {
    components: {
        "app-header": Header
    },
    data() {
        return {
            listingDetails: {},
            reviews: []
        }
    },
    methods: {
        fetchItems: function() {
            database.collection('listings').doc(this.$route.params.id).get().then(snapshot => {
                const toAdd = snapshot.data();
                
                this.listingDetails = toAdd;
                console.log(toAdd);
                console.log(this.listingDetails);
                });
            database.collection('listings').doc(this.$route.query.id).collection('reviews').get().then(snapshot => {
                snapshot.docs.forEach(doc => {
                    const add = doc.data();
                    this.reviews.push(add);
                    console.log(this.reviews);
                })  
            })  
            },

        bookPage: function() {
            this.$router.push({ name: "reservation" })
        }
        
        /*
        updateOrder: function() {
            for (var copyKey in this.datapacket) {
                var x=document.getElementById(copyKey).value;
                this.copy[copyKey] = x;
            }
            
            database.collection('orders').doc(this.$route.query.id).set(this.copy).then(
                this.$router.push({path: "/orders"})
            ) 
        }*/
    },

    created: function() {
        this.fetchItems()
    },
    watch: {
        "$route": "fetchItems"
    }
}
</script>

<style scoped>
ul {
 /* list-style-type: none; 
  padding: 0; */
}

.float-container {
    display: flex;
    align-items: center;
    width: 75%;
    margin: auto;
}

.float-left, .float-right {
    flex: 1;
}

.float-left {
    float: left;
}

.float-right {
    float: right;
    vertical-align: middle;
}

#name {
    font-size: 40px;
}

hr { 
  display: block;
  margin-top: 0.5em;
  margin-bottom: 0.5em;
  margin-left: auto;
  margin-right: auto;
  border-style: inset;
  border-width: 1px;
  width: 85%;
  
} 
#reviews ul {
    list-style-type: none; 
}

#reviews li {
    border: 5px solid #d6d6d6;
    border-radius: 25px;
    height: 100%;
    width: 95%;
    padding: 10px;
    margin: 0 0 0 0;
    background-color: #ebebeb;
}

#reviews #title {
    font-size: 25px;
}

#reviews hr {
  display: block;
  margin-top: 0.5em;
  margin-bottom: 0.5em;
  margin-left: auto;
  margin-right: auto;
  border-style: inset;
  border-width: 1px;
  width: 100%;
  height: 12px;
  border: 0;
  box-shadow: inset 0 12px 12px -12px rgba(0, 0, 0, 0.5);
}

#name {
    font-size: 40px;
}



.place {
    height: 250px;
    padding: 20px;

}

#amenities, #menu {
    width: 75%;
    text-align: left;
    font-size: 20px;
    margin: auto;
}

 #price, #location, #noise {
     text-align: left;
     margin: auto;
     font-size: 20px;
 }

#amenitiesList {
    background-color: lightgrey;
    border-radius: 15px;
    padding-top: 20px;
    padding-bottom: 20px;
}

/*
#price {
    display: flex;  
    flex-flow: row wrap;
}
*/
#priceVal {
    margin-top: 3px;
    font-size: 25px;
}

/* #location, #noise {
    display: flex;  
    flex-flow: row wrap;
    margin-left: 190px;
} */

#locationVal, .noiseVal {
    margin-top: 5px;
    margin-left: 3px;
}

.book {
    margin-top: 10px;
    margin-bottom: 10px;
  display: inline-block;
  cursor: pointer;
  border-radius: 10px;
  color: whitesmoke;
  background: #e040fb;
  border: 2px solid transparent;
  height: 60px;
  width: 200px;
  padding-left: 10px;
  padding-right: 10px;
  padding-bottom: 15px;
  padding-top: 15px;
  font-family: "Ubuntu", sans-serif;
  font-weight: bold;
  font-size: 25px;
  transition: 0.2s;
  float: right;
}

.book:hover {
  border-color: white;
  background-color:#d829f7;
}

.book:focus {
  outline: none;
}
</style>