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
                    <label for="region">Region: </label>
                    <select v-model="region">
                        <option>North</option>
                        <option>South</option>
                        <option>East</option>
                        <option>West</option>
                    </select>
                </div>
                <br>
                <div class="editNeighbourhood">
                    <label class="inputField" for="neighbourhood">Name:  </label>
                    <input 
                        type="text" 
                        id="neighbourhood" 
                        name="neighbourhood" 
                        v-model="neighbourhood" 
                        required/>
                </div>
                <br>
                <div class="editPhotos">
                    <label for="photos">Photos: </label>
                    <br><br>
                    <upload></upload>
                    <br>
                    <br> 
                    <br>
                    Current Photos:
                    <br><br>
                    <img class="place" v-bind:src = "this.photo1">
                    <img class="place" v-bind:src = "this.photo2">
                    <img class="place" v-bind:src = "this.photo3">
                </div>
                <br>
                <div class="editMenu">
                    <label for="menu">Menu: </label>
                    <uploadMenu></uploadMenu>
                    <br><br>
                    Current Menu:
                    <br><br>
                    <img v-bind:src = "this.menu">
                    <br>
                </div>
                <br><br>
                <button v-if="!published" @click="save">Publish Listing</button>
                <button v-if="published" @click="save">Save Changes</button>
            </form>
            <br>
        </div>
	</div>
</template>

<script>
import Header from "../UI/Header.vue";
import database from "../../firebase.js";
import firebase from "firebase";
import { MultiSelect } from '@progress/kendo-vue-dropdowns';
import '@progress/kendo-theme-default/dist/all.css';
import Upload from "./UploadPhoto.vue";
import UploadMenu from "./UploadMenu.vue";
export default {

    data() {
        return {
            listingDetail: {},
            bizID: '5iBl58sV6uv7riUzCQzn',
            name: '',
            exact_loc: '',
            region: '',
            neighbourhood: '',
            photo1: '',
            photo2: '',
            photo3: '',
            price: 0,
            menu: '',
            amenities: ['Wifi', 'Toilet'],
            options: ['Wifi','Toilet','Power Plug','Airconditioning'],
            published: null,
        }
    },

    components: {
        'app-header': Header,
        'multiselect': MultiSelect,
        'upload': Upload,
        'uploadMenu': UploadMenu,
    },

    methods: {

        fetchID: async function () {
            var user = firebase.auth().currentUser;
            console.log(user);
            var userID = user.uid;
            this.bizID = userID;
        },

        fetchItems: function() {
            database.collection('listings').doc(this.bizID).get().then(snapshot => {
                const toAdd = snapshot.data();
                this.listingDetail = toAdd;
                this.region = toAdd.loc_filter;
                this.neighbourhood = toAdd.loc_neighbourhood;
                this.exact_loc = toAdd.exact_loc;
                this.name = toAdd.name;
                this.price = toAdd.price;
                this.amenities = toAdd.amenities;
                // check again
                this.photo1 = toAdd.photoURL1;
                this.photo2 = toAdd.photoURL2;
                this.photo3 = toAdd.photoURL3;
                this.menu = toAdd.menu;
                this.published = toAdd.published;
                console.log(toAdd);
                console.log(this.listingDetail);
                })     
            },

        save: function() {
            database.collection('listings').doc(this.bizID).update({
                
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

.editName, .editAmenities, .editPrice, .editLocation, .editRegion, .editPhotos, .editNeighbourhood, .editMenu {
    border: 2px solid grey;
    padding: 20px;
    width: 50%;
    margin: auto;
}

textArea {
    width: 80%;
}

img {
    width: 60%;
}
</style>
