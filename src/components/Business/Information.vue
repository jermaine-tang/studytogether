<template>
  <div id="editInfo">
    <app-header></app-header>
    <h1>Edit Business Information:</h1>
    <!--    <form> -->
    <div class="container">
      <div class="details1">
        <!-- <div class="editName">
        <label class="inputField" for="name">Name of Business: </label>
        <input type="text" id="name" name="name" v-model="name" required />
      </div> -->
        <div class="name">
          <h6>Business Name:</h6>
          <b-form-input
            v-model="name"
            aria-describedby="input-live-help input-live-feedback"
            placeholder="Enter your name"
            trim
            required
          ></b-form-input>
        </div>
        <!-- <hr /> -->
        <div class="editAmenities">
          <div id="changeAmenities">
            <h6>Amenities:</h6>
            <div id="choose">
              <multiselect :data-items="this.options" v-model="amenities">
              </multiselect>
            </div>
          </div>
          <!-- <br /> -->
          <!-- <div id="existingAmenities"> -->
          <!-- Existing Amenities: <b> {{ amenities }} </b> -->
          <!-- <div v-for="v in this.amenities" :key="v.index">{{ v }}</div> -->
          <!-- </div> -->
        </div>
        <!-- <hr /> -->
        <div class="editPrice">
          <h6>Price:</h6>
          <b-input-group size="sm" prepend="$" append="/ hr" placeholder="0">
            <b-form-input v-model="price"></b-form-input>
          </b-input-group>
        </div>

        <!-- <hr /> -->
        <div class="editLocation">
          <h6>Location Address:</h6>
          <b-form-input
            v-model="exact_loc"
            aria-describedby="input-live-help input-live-feedback"
            placeholder="Enter Location of Business"
            trim
            required
          ></b-form-input>
          <!-- <textarea v-model="exact_loc" row="20" cols="50"> </textarea> -->
        </div>
        <!-- <hr /> -->
        <div class="region-neighbourhood">
          <div class="editRegion">
            <h6>Region:</h6>
            <select class="region-dropdown" v-model="region">
              <option>North</option>
              <option>South</option>
              <option>East</option>
              <option>West</option>
            </select>
          </div>
          <div class="editNeighbourhood">
            <h6>Neighbourhood:</h6>
            <b-form-input
              v-model="neighbourhood"
              aria-describedby="input-live-help input-live-feedback"
              placeholder="Enter Location of Business"
              trim
              required
            ></b-form-input>
            <!-- <input
            type="text"
            id="neighbourhood"
            name="neighbourhood"
            v-model="neighbourhood"
            required
          /> -->
          </div>
        </div>
        <div class="submit-button">
          <!-- <button v-if="!published" @click.prevent="save">Publish Listing</button>
        <button v-if="published" @click.prevent="save">Save Changes</button> -->
          <b-button v-if="!published" variant="outline-secondary"
            >Publish Listing</b-button
          >
          <b-button v-if="published" variant="outline-secondary"
            >Save Changes</b-button
          >
        </div>
      </div>

      <div class="details2">
        <div class="editPhotos">
          Current Photos:
          <br /><br />
          <img class="place" v-bind:src="this.photo1" />
          <img class="place" v-bind:src="this.photo2" />
          <img class="place" v-bind:src="this.photo3" />
          <br />
          <br />
          <br />
          <label for="photos">Upload New Photos: </label>
          <br /><br />
          <upload></upload>
        </div>
      </div>

      <div class="details3">
        <multi
          @upload-success="uploadImageSuccess"
          @edit-image="editImage"
          @mark-is-primary="markIsPrimary"
          @limit-exceeded="limitExceeded"
          @before-remove="beforeRemove"
          id-upload="myIdUpload"
          id-edit="myIdEdit"
          :max-image="20"
          primary-text="Default"
          browse-text="Browse picture(s)"
          drag-text="Drag pictures"
          mark-is-primary-text="Set as default"
          popup-text="This image will be displayed as default"
          :multiple="true"
          :show-edit="true"
          :show-delete="true"
          :show-add="true"
        >
        </multi>
        <!-- <div class="editMenu">
          Current Menu:
          <br /><br />
          <img v-bind:src="this.menu" />
          <br /><br />
          <label for="menu">Upload New Menu: </label>
          <br /><br />
          <uploadMenu></uploadMenu>
          <br />
        </div> -->
      </div>
      <!--    </form> -->
      <br />
    </div>
  </div>
</template>

<script>
import Header from "../UI/Header.vue";
import database from "../../firebase.js";
import firebase from "firebase";
import { MultiSelect } from "@progress/kendo-vue-dropdowns";
import "@progress/kendo-theme-default/dist/all.css";
import Upload from "./UploadPhoto.vue";
import VueUploadMultipleImage from "vue-upload-multiple-image";
// import UploadMenu from "./UploadMenu.vue";
export default {
  data() {
    return {
      listingDetail: {},
      bizID: "",
      name: "",
      exact_loc: "",
      region: "",
      neighbourhood: "",
      photo1: "",
      photo2: "",
      photo3: "",
      price: 0,
      menu: "",
      amenities: [],
      options: ["Wifi", "Toilet", "Power Plug", "Airconditioning"],
      published: null,
    };
  },

  components: {
    "app-header": Header,
    multiselect: MultiSelect,
    upload: Upload,
    multi: VueUploadMultipleImage,
    // uploadMenu: UploadMenu,
  },

  methods: {
    fetchID: async function () {
      var user = firebase.auth().currentUser;
      console.log(user.uid);
      var userID = user.uid;
      this.bizID = userID;
    },

    fetchItems: async function () {
      await database
        .collection("listings")
        .doc(this.bizID)
        .get()
        .then((snapshot) => {
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
        });
    },

    save: async function () {
      database.collection("listings").doc(this.bizID).update({
        loc_filter: this.region,
        loc_neighbourhood: this.neighbourhood,
        exact_loc: this.exact_loc,
        name: this.name,
        price: this.price,
        amenities: this.amenities,
        published: true,
      });
      console.log(this.name);
      window.location.reload();
    },

    uploadImageSuccess(formData, index, fileList) {
      console.log('data', formData, index, fileList)
      // Upload image api
      // axios.post('http://your-url-upload', formData).then(response => {
      //   console.log(response)
      // })
    },
    beforeRemove(index, removeCallBack) {
      console.log('index', index)
      var r = confirm("remove image")
      if (r == true) {
        removeCallBack()
      }
    },
    editImage(formData, index, fileList) {
      console.log('edit data', formData, index, fileList)
    },
    markIsPrimary(index, fileList){
      console.log('markIsPrimary data', index, fileList)
    },
    limitExceeded(amount){
      console.log('limitExceeded data', amount)
    }
  },

  created: function () {
    this.fetchID();
    this.fetchItems();
  },

  // updated: function() {
  //     this.fetchItems()
  // }
};
</script>

<style scoped >
@import url(https://fonts.googleapis.com/css?family=Lato:700,300);
@import url(https://fonts.googleapis.com/css?family=Dosis:400);

#choose {
  width: 100%;
  margin: auto;
  border-radius: 5px;
}

#changeAmenities #existingAmenities {
  display: inline-block;
}

.details {
  border: 2px solid grey;
  padding: 20px;
  width: 30%;
  margin: auto;
}

.name {
  text-align: left;
}

.editAmenities {
  text-align: left;
}

.editPrice {
  text-align: left;
}

.editLocation {
  text-align: left;
}

.region-neighbourhood {
  display: flex;
}

.editRegion {
  text-align: left;
  width: 48%;
  height: 100%;
  float: left;
}

.region-dropdown {
  width: 90%;
  height: 38px;
  border-radius: 5px;
}

.editNeighbourhood {
  text-align: left;
  width: 52%;
  float: right;
  padding-left: 5px;
  border-left: 2px solid grey;
}

.submit-button {
  text-align: center;
  display: inline-block;
  margin-top: 2px;
  margin: auto;
}

.name,
.editAmenities,
.editPrice,
.editLocation,
.region-neighbourhood {
  padding-bottom: 5px;
  border-bottom: 2px solid grey;
}

.editAmenities,
.editPrice,
.editLocation,
.region-neighbourhood {
  padding-top: 8px;
}

.submit-button {
  padding-top: 8px;
}

.container {
  display: flex;
  margin: auto;
}

.details1 {
  float: left;
  margin-left: auto;
  border: solid 2px grey;
  padding: 15px;
  width: 30%;
  height: 100%;
  overflow: auto;
}

.details2 {
  float: left;
  margin-left: auto;
  border: solid 2px grey;
  padding: 15px;
  width: 30%;
  height: 100%;
  overflow: auto;
}

.details3 {
  float: right;
  margin-left: auto;
  border: solid 2px grey;
  padding: 15px;
  width: 30%;
  height: 100%;
  overflow: auto;
}

h6 {
  padding-left: 2px;
}

/* .editName,
.editAmenities,
.editPrice,
.editLocation,
.editRegion,
.editPhotos,
.editNeighbourhood,
.editMenu {
  padding: 20px;
  width: 50%;
  margin: auto;
} */

/* textArea {
  width: 80%;
} */

/* img {
  width: 90%;
} */
/* 
hr {
  display: block;
  margin-top: 0.5em;
  margin-bottom: 0.5em;
  margin-left: auto;
  margin-right: auto;
  border-style: inset;
  border-width: 1px;
  color: grey;
  border: 1.5px solid grey;
} */
</style>
