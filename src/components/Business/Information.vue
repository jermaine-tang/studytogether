<template>
    <div id="editInfo">
		<app-header></app-header>
        <h1>Edit Information:</h1>
        <!--    <form> -->
                <div class="details">
                    <div class="editName">
                        <label class="inputField" for="name">Name:  </label>
                        <input 
                            type="text" 
                            id="name" 
                            name="name" 
                            v-model="name" 
                            required/>
                    </div>
                    <hr>
                    <div class="editAmenities">
                        <div id="changeAmenities">
                            <label class="inputField">Amenities:</label>
                            <div id="choose">
                                <multiselect :data-items="this.options" v-model="amenities">
                                </multiselect>
                            </div>
                        </div>
                        <br>
                        <div id="existingAmenities">
                            Existing Amenities: 
                            <div v-for="v in this.amenities" :key="v.index">{{ v }}</div>
                        </div>
                    </div>
                    <hr>
                    <div class="editPrice">
                        <label for="price">Price:  </label>
                        <input 
                            type="number" 
                            id="price" 
                            name="price" 
                            v-model="price" 
                            required/> / hour
                    </div>
                    <hr>
                    <div class="editLocation">
                        <label for="location">Location: </label>
                        <br>
                        <textarea 
                            v-model="exact_loc"
                            row=20
                            cols=50>
                        </textArea>
                    </div>
                    <hr>
                    <div class="editRegion">
                        <label for="region">Region: </label>
                        <select v-model="region">
                            <option>North</option>
                            <option>South</option>
                            <option>East</option>
                            <option>West</option>
                        </select>
                    </div>
                    <hr>
                    <div class="editNeighbourhood">
                        <label class="inputField" for="neighbourhood">Name:  </label>
                        <input 
                            type="text" 
                            id="neighbourhood" 
                            name="neighbourhood" 
                            v-model="neighbourhood" 
                            required/>
                    </div>
                    <button v-if="!published" @click.prevent="save">Publish Listing</button>
                    <button v-if="published" @click.prevent="save">Save Changes</button>
                </div>
                <br><br>
                <div class="details">
                    <div class="editPhotos">
                        Current Photos:
                        <br><br>
                        <img class="place" v-bind:src = "this.photo1">
                        <img class="place" v-bind:src = "this.photo2">
                        <img class="place" v-bind:src = "this.photo3">
                        <br>
                        <br> 
                        <br>
                        <label for="photos">Upload New Photos: </label>
                        <br><br>
                        <upload></upload>
                        
                    </div>
                    <hr>
                    <div class="editMenu">
                        Current Menu:
                        <br><br>
                        <img v-bind:src = "this.menu">
                        <br><br>
                        <label for="menu">Upload New Menu: </label>
                        <br><br>
                        <uploadMenu></uploadMenu>
                        <br>
                    </div>
                    <br><br>
                </div>
        <!--    </form> -->
            <br>  
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
            bizID: '',
            name: '',
            exact_loc: '',
            region: '',
            neighbourhood: '',
            photo1: '',
            photo2: '',
            photo3: '',
            price: 0,
            menu: '',
            amenities: [],
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

        fetchItems: async function() {
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
                loc_filter: this.region,
                loc_neighbourhood: this.neighbourhood,
                exact_loc: this.exact_loc,
                name: this.name,
                price: this.price,
                amenities: this.amenities,
                published: true,
            });
            console.log(this.name)
        }
    },

    created: function() {
        this.fetchItems(),
        this.fetchID()
    },

    updated: function() {
        this.fetchItems()
    }
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

.details{
    border: 2px solid grey;
    padding: 20px;
    width: 50%;
    margin: auto;
}

.editName, .editAmenities, .editPrice, .editLocation, .editRegion, .editPhotos, .editNeighbourhood, .editMenu {
    padding: 20px;
    width: 50%;
    margin: auto;
}

textArea {
    width: 80%;
}

img {
    width: 90%;
}

hr { 
  display: block;
  margin-top: 0.5em;
  margin-bottom: 0.5em;
  margin-left: auto;
  margin-right: auto;
  border-style: inset;
  border-width: 1px;
  color: lightgrey;
} 
</style>
