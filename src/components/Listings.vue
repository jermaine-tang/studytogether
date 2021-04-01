<template>
  <div>
    <app-header></app-header>

    <div class="wrap">
      <div class="search">
        <input v-model="searchString" type="text"  placeholder="What are you looking for?" class="searchTerm"/>
            <i class="fa fa-search"></i>

        <button
          type="button"
          class="btn"
          @click="showModal"
        >
          Filter
        </button>
      </div>
    </div>

      <div>
        <select v-model="sortBy">
          <option v-for="(option, index) in options" :key="index" v-bind:value="option.value">
            {{ option.text }}
          </option>
        </select>

        <button v-on:click="ascending = !ascending" class="sort-button">
          <i v-if="ascending" class="fa fa-sort-up"></i>
          <i v-else class="fa fa-sort-down"></i>
          Reverse
        </button>
    </div>


  <div>
    <modal
      v-show="isModalVisible"
      @close="closeModal"
      @apply="closeModal"
    >
      <template v-slot:body>
        <div>
            <div><label for="name">Location:</label><br>
                <input type="checkbox" id="North" value="North" v-model="location">
                <label for="North">North</label>
                <input type="checkbox" id="South" value="South" v-model="location">
                <label for="South">South</label>
                <input type="checkbox" id="East" value="East" v-model="location">
                <label for="East">East</label>
                <input type="checkbox" id="West" value="West" v-model="location">
                <label for="West">West</label>
                <input type="checkbox" id="Central" value="Central" v-model="location">
                <label for="Central">Central</label>
            </div>
            <div>
                <label for="name">Price Point:</label><br>
                <input type="checkbox" id="cheap" value="cheap" v-model="price">
                <label for="cheap"></label>
                <img src="https://img.icons8.com/metro/26/000000/us-dollar--v1.png" width="40px"/>
                <input type="checkbox" id="medium" value="medium" v-model="price">
                <label for="medium"> </label>
                <img src="https://img.icons8.com/metro/26/000000/us-dollar--v1.png" width="40px"/>
                <img src="https://img.icons8.com/metro/26/000000/us-dollar--v1.png" width="40px"/>
                <input type="checkbox" id="expensive" value="expensive" v-model="price">
                <label for="expensive"></label>
                <img src="https://img.icons8.com/metro/26/000000/us-dollar--v1.png" width="40px"/>
                <img src="https://img.icons8.com/metro/26/000000/us-dollar--v1.png" width="40px"/>
                <img src="https://img.icons8.com/metro/26/000000/us-dollar--v1.png" width="40px"/>
            </div>
            <div>
                <label for="name">Noise Level:</label><br>
                <input type="checkbox" id="quiet" value=1 v-model.number="noise">
                <label for="quiet"></label>
                <img id="noise-pic" src="https://img.icons8.com/fluent-systems-regular/24/000000/low-volume.png" width="40px"/>
                <input type="checkbox" id="moderate" value=2 v-model.number="noise">
                <label for="moderate"></label>
                <img id="noise-pic" src="https://img.icons8.com/fluent-systems-regular/24/000000/low-volume.png" width="40px"/>
                <img id="noise-pic" src="https://img.icons8.com/fluent-systems-regular/24/000000/low-volume.png" width="40px"/>
                <input type="checkbox" id="loud" value=3 v-model.number="noise">
                <label for="loud"></label>
                <img id="noise-pic" src="https://img.icons8.com/fluent-systems-regular/24/000000/low-volume.png" width="40px"/>
                <img id="noise-pic" src="https://img.icons8.com/fluent-systems-regular/24/000000/low-volume.png" width="40px"/>
                <img id="noise-pic" src="https://img.icons8.com/fluent-systems-regular/24/000000/low-volume.png" width="40px"/>
            </div>
        </div>
  </template>
    </modal>
  </div>

  <!-- <div v-if="displayedList().length == 0"> No Results Found:(</div>
  <div v-else> {{displayedList().length}} Results Found</div> -->

    <div class="listings-list">
      <ul class="listings-list">
        <li v-for="(listing, index) in displayedList" :key="index" v-bind:id="listing.id" v-on:click="route($event)" >
          <div class="name" v-bind:id="listing.id" v-on:click="route($event)"> {{ listing.name }}</div>
          <br>
          <img id="main-pic" v-bind:src = "listing.photoURL1" height30px>
          <br><br>
          <div class="rating">
            <img v-if="listing.rating > 0" src="https://img.icons8.com/fluent/48/000000/star.png"/>
            <img v-if="listing.rating > 1" src="https://img.icons8.com/fluent/48/000000/star.png"/>
            <img v-if="listing.rating > 2" src="https://img.icons8.com/fluent/48/000000/star.png"/>
            <img v-if="listing.rating > 3" src="https://img.icons8.com/fluent/48/000000/star.png"/>
            <img v-if="listing.rating > 4" src="https://img.icons8.com/fluent/48/000000/star.png"/>
          </div>
          <div class="location">
          <img id="location-pin" src="https://img.icons8.com/pastel-glyph/64/000000/place-marker--v1.png" width="40px"/>
          <span id="locationVal">{{ listing.loc_neighbourhood }}</span>
          </div>
          <br>
          
          
          <div class="price"> 
            <span id="price-pics">
              <img src="https://img.icons8.com/metro/26/000000/us-dollar--v1.png" width="40px"/>
              <img v-if="listing.price > 10 && listing.price <= 20" src="https://img.icons8.com/metro/26/000000/us-dollar--v1.png" width="40px"/>
              <img  v-if="listing.price > 20" src="https://img.icons8.com/metro/26/000000/us-dollar--v1.png" width="40px"/>
            </span>
          </div>
          <br>
          <div class="noise"> 
            <span id="noise-pics">
              <img id="noise-pic" src="https://img.icons8.com/fluent-systems-regular/24/000000/low-volume.png" width="40px"/>
              <img v-if="listing.noise > 1" id="noise-pic" src="https://img.icons8.com/fluent-systems-regular/24/000000/low-volume.png" width="40px"/>
              <img v-if="listing.noise > 2" id="noise-pic" src="https://img.icons8.com/fluent-systems-regular/24/000000/low-volume.png" width="40px"/>
            </span>
          </div>
        </li>
        <div class="divider"></div>
      </ul>
      
    </div>
  </div>
</template>

<script>
  import Header from "./UI/Header.vue";
  import database from '../firebase.js';
  import modal from './Modal.vue';


export default {
  data() {
    return {
      list: [],
      searchString: "",
      showFilter: false,
      isModalVisible: false,
      location: [],
      price: [],
      noise: [],
      options: [
        { value: null, text: "Sort By" },
        { value: "a", text: "Name" },
        { value: "b", text: "Ratings" },
        { value: "c", text: "Price" },
        { value: "d", text: "Noise" },
      ],
      sortBy: null,
      ascending: true
    };
  },

  components: {
    "app-header": Header,
    "modal": modal
  },

  computed: {//computed method to watch over search, filter and sort to update displayed list
      displayedList: function() {
        let tempList = this.list;

        //search method
        if (this.searchString != "" && this.searchString) {
          tempList = tempList.filter(item => (item.name.toLowerCase().includes(this.searchString.toLowerCase())));
        }

        //filter method
        var location = ["North", "South", "East", "West", "Central"];
        var price = ["cheap", "medium", "expensive"];
        var noise = [1, 2, 3];
        if (this.location.length != 0) {
            location = this.location;
        }

        if (this.price.length != 0) {
            price = this.price;
        }

        if (this.noise.length != 0) {
            noise = this.noise;
        }
        tempList = tempList.filter(x => (location.includes(x['loc_filter']) && price.includes(x['price_filter']) && noise.includes(x['noise'])));
      
        //sort method
        if (this.sortBy == "a") {
          tempList = tempList.sort((x, y) => {
            let fx = x.name.toLowerCase(), fy = y.name.toLowerCase();
            return (fx<fy) ? -1 : 1;
          });
      } else if (this.sortBy == "b") {
        tempList = tempList.sort((x, y) => x.rating - y.rating);
      } else if (this.sortBy == "c") {
        tempList = tempList.sort((x, y) => x.orice - y.price);
      } else {
        tempList = tempList.sort((x, y) => x.noise - y.noise);
      }


      // Show sorted array in descending or ascending order
      if (!this.ascending) {
        tempList.reverse();
      }

      return tempList;

      }
    },

  methods: {
    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },

    fetchItems: function() {
      database.collection('listings').get().then((querySnapShot) => {
      let item = {}
        querySnapShot.docs.forEach(doc => {
          item = {...doc.data(), ['id']: doc.id}
          console.log(item)
          if (item['price'] <= 10) {
            item['price_filter'] = "cheap";
          } else if (item['price'] > 20) {
            item['price_filter'] = "expensive";
          } else {
            item['price_filter'] = "medium";
          }
          this.list.push(item)
          })
      })
    },

    route: function(event) {
            let doc_id = event.target.getAttribute("id");
            this.$router.push({path: "indiv", query: {id: doc_id}, params: { id: doc_id}})
        },

  },

  created:function() {
    this.fetchItems();
    this.displayList = this.list;
  },

};
</script>

<style scoped>
ul {
  display: flex; 
  flex-wrap: wrap;
  list-style-type: none;
  padding: 10%;
  padding-top: 3%; 
  margin: auto;
}
li {
/*  flex-grow: 1;  */
  width: 600px;
/*  flex-basis: 300px; */
  text-align: center;
  padding: 10px;
  border: 5px solid #ED7A78;
  margin: 10px;
  margin-top: 5px;
  border-radius: 25px;
  font-family: "Ubuntu", sans-serif;
  margin: auto;
}
.listings-list {
  margin-left: 3%;
  
}
#main-pic {
  border-radius: 15px;
  width: 80%;
  height: 300px;
}


.name {
  font-size: 35px;
  
}

.details {
  float: left;


}

.rating {
  float: right;
  margin-right: 50px;
}

.location, .noise, .price {
    display: flex;  
    flex-flow: row wrap;
    margin-left: 50px;
    font-size: 20px;
}

#locationVal, .noiseVal {
    margin-top: 10px;
    margin-left: 3px;
}

@import url(https://fonts.googleapis.com/css?family=Open+Sans);

body{
  background: #f2f2f2;
  font-family: 'Open Sans', sans-serif;
}

.search {
  width: 100%;
  position: relative;
  display: flex;
}

.searchTerm {
  width: 100%;
  border: 3px solid #ED7A78;
  border-right: none;
  padding: 5px;
  height: 20px;
  border-radius: 5px 0 0 5px;
  outline: none;
  color: #ED7A78;
}

.searchTerm:focus{
  color: #ED7A78;
}



/*Resize the wrap to see the search bar change!*/
.wrap{
  width: 30%;
  position: relative;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%);
}



@media (min-width: 740px) and (max-width: 1412px) {
  .listings-list {
    margin-left: 3%;]
    width: 100%
  }
  ul {
    width: 100%;
  }
  li {
/*  flex-grow: 1;  */

/*  flex-basis: 300px; */
    text-align: center;
    padding: 10px;
    border: 5px solid #ED7A78;
    margin: 10px;
    margin-top: 5px;
    border-radius: 25px;
    font-family: "Ubuntu", sans-serif;
    margin: auto;

  }
}

</style>