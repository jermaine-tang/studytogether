<template>
  <div>
    <app-header></app-header>

    <div class="pics">
      <vueper-slides
        class="photo-slides"
        :visible-slides="3"
        slide-multiple
        :arrows-outside="true"
        fixed-height="300px"
        autoplay
      >
        <vueper-slide v-for="(photo, index) in listingDetails.photos" :image="photo" :key="index"/>

        <!-- <img class="place" v-bind:src = "listingDetails.photoURL1">
                <img class="place" v-bind:src = "listingDetails.photoURL2">
                <img class="place" v-bind:src = "listingDetails.photoURL3"> -->
      </vueper-slides>
    </div>

    <div class="name">
      <h1>{{ listingDetails.name }}</h1>
    </div>
    <div class="description">
        {{ listingDetails.description }}
    </div>
    <div class="details">
      <div class="float-container">
        <div class="float-left">
          <div class="price">
            <!--    <img src="https://img.icons8.com/metro/26/000000/us-dollar--v1.png" width="35"/> -->
            <b-icon class="detail-icon" icon="cash-stack"></b-icon>
            ${{ listingDetails.price }} / hour
          </div>
          <div class="location">
            <!-- <img
              id="location-pin"
              src="https://img.icons8.com/pastel-glyph/64/000000/place-marker--v1.png"
              width="34px"
            /> -->
            <b-icon class="detail-icon" icon="geo"></b-icon>
            {{ listingDetails.exact_loc }}
          </div>
          <div class="noise" v-show="listingDetails.noise == 1">
            <!-- <img
              id="noise-pic"
              src="https://img.icons8.com/fluent-systems-regular/24/000000/low-volume.png"
              width="34px"
            /> -->
            <b-icon class="detail-icon" icon="volume-up"></b-icon>
            Quiet
            <!-- <span class="noiseVal" v-show="listingDetails.noise == 1">
              Quiet
            </span>
            <span class="noiseVal" v-show="listingDetails.noise == 2">
              Tolerable
            </span>
            <span class="noiseVal" v-show="listingDetails.noise == 3">
              Some Noise
            </span> -->
          </div>
          <div class="noise" v-show="listingDetails.noise == 2">
            <!-- <img
              id="noise-pic"
              src="https://img.icons8.com/fluent-systems-regular/24/000000/low-volume.png"
              width="34px"
            /> -->
            <b-icon class="detail-icon" icon="volume-up"></b-icon>
            Normal
            <!-- <span class="noiseVal" v-show="listingDetails.noise == 1">
              Quiet
            </span>
            <span class="noiseVal" v-show="listingDetails.noise == 2">
              Tolerable
            </span>
            <span class="noiseVal" v-show="listingDetails.noise == 3">
              Some Noise
            </span> -->
          </div>
          <div class="noise" v-show="listingDetails.noise == 3">
            <!-- <img
              id="noise-pic"
              src="https://img.icons8.com/fluent-systems-regular/24/000000/low-volume.png"
              width="34px"
            /> -->
            <b-icon class="detail-icon" icon="volume-up"></b-icon>
            Some Noise
            <!-- <span class="noiseVal" v-show="listingDetails.noise == 1">
              Quiet
            </span>
            <span class="noiseVal" v-show="listingDetails.noise == 2">
              Tolerable
            </span>
            <span class="noiseVal" v-show="listingDetails.noise == 3">
              Some Noise
            </span> -->
          </div>
          <div class="phoneNum">
            <b-icon class="detail-icon" icon="telephone"></b-icon>
            {{ listingDetails.phoneNum }}
          </div>
        </div>
        <div class="float-right">
          <button class="book" v-on:click="bookPage()">Book Now!</button>
        </div>
      </div>
      <div class="second-row">
        <div class="amenities">
          <h3>Amenities:</h3>
          <ul id="amenitiesList">
            <li
              class="amenity-item"
              v-for="i in listingDetails.amenities"
              :key="i.index"
            >
              {{ i }}
            </li>
          </ul>
        </div>
      </div>
      <div class="menu" v-if="listingDetails.menu">
        <h3>Menu:</h3>
        <vueper-slides
          bullets-outside
          class="menu-slides"
          :arrows-outside="true"
          fixed-height="450px"
        >
          <vueper-slide v-for="(menu, index) in listingDetails.menu" :image="menu" :key="index"/>

          <!-- <img class="place" v-bind:src = "listingDetails.photoURL1">
                <img class="place" v-bind:src = "listingDetails.photoURL2">
                <img class="place" v-bind:src = "listingDetails.photoURL3"> -->
        </vueper-slides>
        <!-- <img id="menuPhoto" v-bind:src="listingDetails.menu" /> -->
      </div>
      <div class="reviews">
        <h3>Reviews:</h3>
        <div class="sorting">
          <b-dropdown text="SortBy">
            <b-dropdown-item
              v-for="option in sortOptions"
              :key="option.value"
              :value="option.value"
              @click="sortBy = option.value"
            >
              {{ option.text }}
            </b-dropdown-item>
            <template v-slot:button-content>
              {{ sortBy }}
            </template>
          </b-dropdown>
          <b-button
            squared
            variant="outline-secondary"
            v-on:click="ascending = !ascending"
            class="sort-button"
          >
            <b-icon v-if="ascending" icon="sort-down"></b-icon>
            <b-icon v-else icon="sort-down-alt"></b-icon>
            <!-- <i v-if="ascending" class="fa fa-sort-up"></i>
        <i v-else class="fa fa-sort-down"></i>
        Reverse -->
          </b-button>
        </div>
        <div v-if="reviews.length == 0">
          No reviews yet. Make a booking and be the first to leave a review!
        </div>
        <div v-if="reviews.length != 0">
          <ul class="review-list">
            <li v-for="commentIndex in commentsToShow" :key="commentIndex">
              <div class="indiv-review" v-if="commentIndex <= displayedList.length">
                <div class="review-title">
                  <h5>{{ displayedList[commentIndex - 1].title }}</h5>
                  <div class="review-ratings">
                    <b-icon
                      v-if="displayedList[commentIndex - 1].noise > 2"
                      icon="volume-up"
                      style="
                        margin-top: auto;
                        margin-bottom: auto;
                        margin-right: 10px;
                      "
                    ></b-icon>
                    <b-icon
                      v-else-if="displayedList[commentIndex - 1].noise > 1"
                      icon="volume-down"
                      style="
                        margin-top: auto;
                        margin-bottom: auto;
                        margin-right: 10px;
                      "
                    ></b-icon>
                    <b-icon
                      v-else
                      icon="volume-mute"
                      style="
                        margin-top: auto;
                        margin-bottom: auto;
                        margin-right: 10px;
                      "
                    ></b-icon>
                    <b-icon
                      v-if="displayedList[commentIndex - 1].rating >= 1"
                      icon="star-fill"
                      style="
                        margin-top: auto;
                        margin-bottom: auto;
                        margin-right: 5px;
                        color: gold;
                      "
                    ></b-icon>
                    <b-icon
                      v-else-if="displayedList[commentIndex - 1].rating >= 0.5"
                      icon="star-half"
                      style="
                        margin-top: auto;
                        margin-bottom: auto;
                        margin-right: 5px;
                        color: gold;
                      "
                    ></b-icon>
                    <b-icon
                      v-if="displayedList[commentIndex - 1].rating >= 2"
                      icon="star-fill"
                      style="
                        margin-top: auto;
                        margin-bottom: auto;
                        margin-right: 5px;
                        color: gold;
                      "
                    ></b-icon>
                    <b-icon
                      v-else-if="displayedList[commentIndex - 1].rating >= 1.5"
                      icon="star-half"
                      style="
                        margin-top: auto;
                        margin-bottom: auto;
                        margin-right: 5px;
                        color: gold;
                      "
                    ></b-icon>
                    <b-icon
                      v-if="displayedList[commentIndex - 1].rating >= 3"
                      icon="star-fill"
                      style="
                        margin-top: auto;
                        margin-bottom: auto;
                        margin-right: 5px;
                        color: gold;
                      "
                    ></b-icon>
                    <b-icon
                      v-else-if="displayedList[commentIndex - 1].rating >= 2.5"
                      icon="star-half"
                      style="
                        margin-top: auto;
                        margin-bottom: auto;
                        margin-right: 5px;
                        color: gold;
                      "
                    ></b-icon>
                    <b-icon
                      v-if="displayedList[commentIndex - 1].rating >= 4"
                      icon="star-fill"
                      style="
                        margin-top: auto;
                        margin-bottom: auto;
                        margin-right: 5px;
                        color: gold;
                      "
                    ></b-icon>
                    <b-icon
                      v-else-if="displayedList[commentIndex - 1].rating >= 3.5"
                      icon="star-half"
                      style="
                        margin-top: auto;
                        margin-bottom: auto;
                        margin-right: 5px;
                        color: gold;
                      "
                    ></b-icon>
                    <b-icon
                      v-if="displayedList[commentIndex - 1].rating >= 5"
                      icon="star-fill"
                      style="
                        margin-top: auto;
                        margin-bottom: auto;
                        margin-right: 5px;
                        color: gold;
                      "
                    ></b-icon>
                    <b-icon
                      v-else-if="displayedList[commentIndex - 1].rating >= 4.5"
                      icon="star-half"
                      style="
                        margin-top: auto;
                        margin-bottom: auto;
                        margin-right: 5px;
                        color: gold;
                      "
                    ></b-icon>
                  </div>
                </div>
                <div class="review-comment">
                    <p>
                  {{ displayedList[commentIndex - 1].comments }}
                  </p>
                </div>
                <div class="review-author">
                    - {{ displayedList[commentIndex - 1].user }}
                </div>
                <!-- <div class="noiseLvl">
                  Noise:
                  <img
                    id="noise-pic"
                    src="https://img.icons8.com/fluent-systems-regular/24/000000/low-volume.png"
                    width="35px"
                  />
                  <img
                    v-if="reviews[commentIndex].noise > 1"
                    id="noise-pic"
                    src="https://img.icons8.com/fluent-systems-regular/24/000000/low-volume.png"
                    width="35px"
                  />
                  <img
                    v-if="reviews[commentIndex].noise > 2"
                    id="noise-pic"
                    src="https://img.icons8.com/fluent-systems-regular/24/000000/low-volume.png"
                    width="35px"
                  />
                </div> -->

                <!-- <div class="rating">
                  Rating:
                  <img
                    v-if="reviews[commentIndex].rating > 0"
                    src="https://img.icons8.com/fluent/48/000000/star.png"
                    width="30px"
                  />
                  <img
                    v-if="reviews[commentIndex].rating > 1"
                    src="https://img.icons8.com/fluent/48/000000/star.png"
                    width="30px"
                  />
                  <img
                    v-if="reviews[commentIndex].rating > 2"
                    src="https://img.icons8.com/fluent/48/000000/star.png"
                    width="30px"
                  />
                  <img
                    v-if="reviews[commentIndex].rating > 3"
                    src="https://img.icons8.com/fluent/48/000000/star.png"
                    width="30px"
                  />
                  <img
                    v-if="reviews[commentIndex].rating > 4"
                    src="https://img.icons8.com/fluent/48/000000/star.png"
                    width="30px"
                  />
                </div> -->
              </div>
            </li>
            <div
              v-if="
                commentsToShow < displayedList.length ||
                displayedList.length > commentsToShow
              "
            >
              <button class="showMore" @click="commentsToShow += 3">
                Show more reviews
              </button>
            </div>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template> 

<script>
import Header from "./UI/Header.vue";
import database from "../firebase.js";
import firebase from "firebase";

import { VueperSlides, VueperSlide } from "vueperslides";
import "vueperslides/dist/vueperslides.css";

export default {
  components: {
    "app-header": Header,
    "vueper-slides": VueperSlides,
    "vueper-slide": VueperSlide,
  },
  data() {
    return {
      listingDetails: {},
      reviews: [],
      commentsToShow: 3,
      totalComments: 0,
      sortBy: "Sort By",
      sortOptions: [
        // { value: null, text: "Sort By" },
        { value: "Date", text: "Date" },
        { value: "Ratings", text: "Ratings" },
      ],
      ascending: true,
    };
  },
 computed: {
    displayedList: function () {
      let tempList = this.reviews;
      console.log(tempList)

      console.log("computed");

      //sort method
      if (this.sortBy == "Date") {
        tempList = tempList.sort((x, y) => x.date - y.date);
      } else if (this.sortBy == "Ratings") {
        tempList = tempList.sort((x, y) => x.rating - y.rating);
      }

      // Show sorted array in descending or ascending order
      if (!this.ascending) {
        tempList.reverse();
      }
      console.log(tempList)
      return tempList;
    }
 },
 methods: {
    fetchItems: async function () {
      await database
        .collection("listings")
        .doc(this.$route.params.id)
        .get()
        .then((snapshot) => {
          const toAdd = snapshot.data();
          this.listingDetails = toAdd;
        });

      
      console.log(this.$route.params.id)

      await database
        .collection("listings")
        .doc(this.$route.params.id)
        .collection("reviews")
        .get()
        .then((snapshot) => {
          snapshot.docs.forEach((doc) => {
            const add = doc.data();
            this.reviews.push(add);
            console.log(this.reviews[0]);
          });
        });

        console.log(this.listingDetails.photos)
        this.displayedList = this.reviews

        console.log(this.reviews)
    },

    bookPage: function () {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.$router.push({ name: "reservation" });
        } else {
          alert("You have to be logged in to make a booking");
        }
      });
    },

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

  created: function () {
    this.fetchItems();
  },

  mounted() {
    this.totalComments = this.reviews.length;
  },

  watch: {
    $route: "fetchItems",
    sortBy: function() {
      console.log(this.sortBy)
    }
  },
};
</script>

<style scoped>
/* ul {
 list-style-type: none; 
  padding: 0;
} */

.pics {
  border-top: 1px solid grey;
  border-bottom: 1px solid grey;
  padding-bottom: 55px;
}
.photo-slides {
  width: 80%;
  margin: auto;
}

.name {
  padding-top: 15px;
  padding-bottom: 15px;
  border-bottom: 2px solid grey;
  border-top: 2px solid grey;
}

li {
  list-style-type: none;
}

.details {
  width: 70%;
  margin: auto;
}

.float-container {
  padding-top: 30px;
  display: flex;
  align-items: center;
  padding-bottom: 25px;
  border-bottom: 2px dashed grey;
  /* width: 75%;
  margin: auto; */
  /* padding: 10px;
  border: solid 2px grey; */
}

.float-left,
.float-right {
  flex: 1;
}

.float-left {
  float: left;
  text-align: left;
}

.float-right {
  float: right;
  display: flex;
  vertical-align: middle;
}


.description {
  border-bottom: 2px solid grey;
  padding-top: 5px;
  padding-bottom: 5px;
}

.description,
.price,
.location,
.noise,
.phoneNum {
  font-size: 25px;
}

.location,
.noise,
.phoneNum {
  padding-top: 8px;
}

.detail-icon {
  margin-left: 3px;
  margin-right: 10px;
}

.second-row {
  padding-top: 25px;
  padding-bottom: 25px;
  border-bottom: 2px dashed grey;
}

.amenities {
  width: 50%;
  margin: auto;
}

.amenities h3 {
  padding-bottom: 5px;
  border-bottom: 2px solid grey;
}

#amenitiesList {
  text-align: left;
  padding-left: 0;
  padding: 10px;
  border-radius: 5px;
  background-color: rgb(230, 230, 230);
}

.amenity-item {
  padding-top: 10px;
  padding-left: 10px;
  padding-bottom: 5px;
  font-size: 20px;
  border-bottom: 2px dotted grey;
}

.menu {
  padding-top: 25px;
  padding-bottom: 80px;
  border-bottom: 2px dashed grey;
}

.menu h3 {
  padding-bottom: 5px;
  border-bottom: 2px solid grey;
  width: 60%;
  margin: auto;
}

.menu-slides {
  padding-top: 10px;
  width: 60%;
  margin: auto;
}

.reviews {
  padding-top: 25px;
  width: 60%;
  margin: auto;
}

.reviews h3 {
  padding-bottom: 5px;
  border-bottom: 2px solid grey;
  width: 60%;
  margin: auto;
}

.indiv-review {
  margin-top: 10px;
  padding: 15px;
  border: 2px solid grey;
  border-radius: 10px;
  margin-bottom: 10px;
  background-color: whitesmoke
}

.review-list {
  padding-left: 0px;
}

.review-title h5 {
  text-align: left;
  font-size: 25px;
  width: 70%;
  margin-bottom: 0px;
}

.review-title {
  padding-top: 3px;
  padding-bottom: 3px;
  padding-left: 3px;
  border-bottom: 2px solid lightgrey;
  display: flex;
  font-size: 20px;
}

.review-ratings {
  float: right;
  margin-right: 0;
  width: 30%;
  text-align: right;
}

.review-comment {
    text-align: left;
    padding-top: 5px;
    padding-bottom: 5px;
    padding-left: 3px;
    border-bottom: 2px dotted lightgrey;
    word-break:break-all;
}

.review-author {
    text-align: right;
    padding-right: 3px;
    padding-top: 5px;
    padding-bottom: 5px;
}
/* #name {
  font-size: 40px;
} */

/* hr {
  display: block;
  margin-top: 0.5em;
  margin-bottom: 0.5em;
  margin-left: auto;
  margin-right: auto;
  border-style: inset;
  border-width: 1px;
  width: 85%;
} */

/* #reviews {
  font-size: 20px;
} */

/* #reviews ul {
  list-style-type: none;
} */

/* #reviews li {
  border: 5px solid #d6d6d6;
  border-radius: 25px;
  height: 100%;
  width: 95%;
  padding: 10px;
  margin: auto;
  margin-bottom: 30px;
  background-color: #ebebeb;
} */

/* #reviews #title {
  font-size: 25px;
} */

/* #reviews hr {
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
} */

/* #name {
  font-size: 40px;
} */

/* .place {
  height: 250px;
  padding: 20px;
} */

/* #amenities,
#menu {
  width: 75%;
  text-align: left;
  font-size: 20px;
  margin: auto;
} */

/* #price,
#location,
#noise {
  text-align: left;
  margin: auto;
  font-size: 20px;
} */

/* #amenitiesList {
  background-color: lightgrey;
  border-radius: 15px;
  padding-top: 20px;
  padding-bottom: 20px;
} */

/*
#price {
    display: flex;  
    flex-flow: row wrap;
}
*/
/* #priceVal {
  margin-top: 3px;
  font-size: 25px;
} */

/* #location, #noise {
    display: flex;  
    flex-flow: row wrap;
    margin-left: 190px;
} */

/* #locationVal,
.noiseVal {
  margin-top: 5px;
  margin-left: 3px;
} */

.book {
  flex-grow: 1;
  margin-top: 10px;
  margin-bottom: 10px;
  /* display: inline-block; */
  cursor: pointer;
  border-radius: 10px;
  color: whitesmoke;
  background: #ed7a78;
  border: 2px solid transparent;
  height: 60px;
  width: 200px;
  /* padding-left: 10px;
  padding-right: 10px;
  padding-bottom: 15px;
  padding-top: 15px; */
  font-family: "Ubuntu", sans-serif;
  font-weight: bold;
  font-size: 25px;
  transition: 0.2s;
}

.book:hover {
  border-color: white;
  background-color: #e33c39;
}

.book:focus {
  outline: none;
}

.showMore {
  margin-top: 10px;
  margin-bottom: 10px;
  display: inline-block;
  cursor: pointer;
  border-radius: 10px;
  color: whitesmoke;
  background: #ed7a78;
  border: 2px solid transparent;
  height: 60px;
  width: 300px;
  font-family: "Ubuntu", sans-serif;
  font-weight: bold;
  font-size: 25px;
  transition: 0.2s;
}

.showMore:hover {
  border-color: white;
  background-color: #e33c39;
}

/* #menuPhoto {
  width: 80%;
} */
</style>