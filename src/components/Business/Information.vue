<template>
	<div id="editInfo">
		<app-header></app-header>
        <h1>Edit Information:</h1>
		<div id="details">
            <form>
                <div class="editName">
                    <label class="inputField" for="name">Name:  </label>
                    <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        v-model="name" 
                        required/>
                </div>
                <br>
                <div class="editAmenities">
                    <div id="changeAmenities">
                        <label class="inputField">Amenities:</label>
                        <div id="choose">
                            <multiselect :data-items="this.options">
                            </multiselect>
                        </div>
                    </div>
                    <br>
                    <div id="existingAmenities">
                        Exiting Amenities: 
                        <div v-for="v in this.amenities" :key="v.index">{{ v }}</div>
                    </div>
                </div>
                <br>
                <div class="editPrice">
                    <label for="price">Price:  </label>
                    <input 
                        type="number" 
                        id="price" 
                        name="price" 
                        v-model="price" 
                        required/> / hour
                </div>
                <br>
                <div class="editLocation">
                    <label for="location">Location: </label>
                    <br>
                    <textarea 
                        v-model="exact_loc"
                        row=20
                        cols=50>
                    </textArea>
                </div>
                <br>
                <div class="editRegion">
                </div>
                <br>
                <div class="editPhotos">
                </div>
            </form>
        </div>
	</div>
</template>

<script>
import Header from "../UI/Header.vue";
import database from "../../firebase.js";
import firebase from "firebase";
import { MultiSelect } from '@progress/kendo-vue-dropdowns';
import '@progress/kendo-theme-default/dist/all.css';


export default {

    data() {
        return {
            listingDetail: {},
            bizID: '',
            name: '',
            exact_loc: '',
            region: '',
            photos: [],
            price: 0,
            amenities: ['Wifi', 'Toilet'],
            options: ['Wifi','Toilet','Power Plug','Airconditioning']
        }
    },

    components: {
        'app-header': Header,
        'multiselect': MultiSelect
    },

    methods: {

        fetchID: function () {
            var user = firebase.auth().currentUser;
            console.log(user);
            var userID = user.uid;
            this.bizID = userID;
        },

        fetchItems: function() {
            database.collection('listings').doc(this.bizID).get().then(snapshot => {
                const toAdd = snapshot.data();
                this.listingDetail = toAdd;
                this.region = toAdd.loc_neighbourhood;
                this.exact_loc = toAdd.exact_loc;
                this.name = toAdd.name;
                this.price = toAdd.price;
                this.amenities = toAdd.amenities;
                // check again
                this.photos = toAdd.photos;
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
        this.fetchItems(),
        this.fetchID()
    },
}
</script>

<style scoped >
@import url(https://fonts.googleapis.com/css?family=Lato:700,300);
@import url(https://fonts.googleapis.com/css?family=Dosis:400);

#choose {
    width: 80%;
    margin: auto;
}

#changeAmenities #existingAmenities{
    display: inline-block;
}

.editName, .editAmenities, .editPrice, .editLocation, .editRegion, .editPhotos {
    border: 2px solid grey;
    padding: 20px;
    width: 50%;
    margin: auto;
}

</style>