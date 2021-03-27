<template>
  <div>
    <app-header></app-header>

    <div class="wrap">
      <div class="search">
          <input type="text" class="searchTerm" placeholder="What are you looking for?">
          <button type="submit" class="searchButton">
            <i class="fa fa-search"></i>
        </button>
      </div>
    </div>

    <div class="filter">
      <button v-on:click="filter()">Filter</button>
    </div>

    <div class="listings-list">
      <p v-if="filterList().length == 0 && this.$route.params.location != null"> No results found:( Please try another filter!</p>
      <ul class="listings-list">
        <li v-for="listing in filterList()" :key="listing.id" v-bind:id="listing.id" v-on:click="route($event)" >
          <div class="name" v-bind:id="listing.id" v-on:click="route($event)"> {{ listing.name }}</div>
          <br>
          <img id="main-pic" v-bind:src = "listing.photoURL1">
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


export default {
  data() {
    return {
      list: []
    };
  },
  components: {
    "app-header": Header
  },
//  props: ['list'],
  methods: {
    fetchItems: function() {
      database.collection('listings').get().then((querySnapShot) => {
      let item = {}
        querySnapShot.docs.forEach(doc => {
          item= {...doc.data(), ['id']: doc.id}
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

    filterList: function() {
      var result = [];
      var location = ["North", "South", "East", "West", "Central"];
      var price = ["cheap", "medium", "expensive"];
      var noise = [1, 2, 3];
      if (this.$route.params.location != null) {
        if (this.$route.params.location.length != 0) {
          location = this.$route.params.location;
        }
      }
      if (this.$route.params.price != null) {
        if (this.$route.params.price.length != 0) {
          price = this.$route.params.price;
        }
      }
      if (this.$route.params.noise != null) {
        if (this.$route.params.noise.length != 0) {
          noise = this.$route.params.noise;
        }
      }  
      result = this.list.filter(x => (location.includes(x['loc_filter']) && price.includes(x['price_filter']) && noise.includes(x['noise'])));
      return result;
    },

    route: function(event) {
            let doc_id = event.target.getAttribute("id");
            this.$router.push({path: "indiv", query: {id: doc_id}, params: { id: doc_id}})
        },

    filter: function() {
        this.$router.push({name: 'filter'})
    }

  },
  created:function() {
    this.fetchItems()
  }
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
  border: 3px solid #ED7A78;
  margin: 10px;
  margin-top: 5px;
  border-radius: 25px;
  font-family: "Ubuntu", sans-serif;
  margin: 0 0 10  0;
}

.listings-list {
  margin-left: 3%;
  
}


#main-pic {
  border-radius: 15px;
  width: 500px;
  height: 300px;
}


.name {
  font-size: 35px;
  
}

/*
.location, .noise, .price {
  float: left;
  
  font-size: 20px;
  display: inline-block;
}


#location-pin {
  
  margin-left: 30px;
} */
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
  border: 3px solid #c897cc;
  border-right: none;
  padding: 5px;
  height: 20px;
  border-radius: 5px 0 0 5px;
  outline: none;
  color: #c897cc;
}

.searchTerm:focus{
  color: #c897cc;
}

.searchButton {
  width: 40px;
  height: 36px;
  border: 1px solid #c897cc;
  background: #c897cc;
  text-align: center;
  color: #fff;
  border-radius: 0 5px 5px 0;
  cursor: pointer;
  font-size: 20px;
}

/*Resize the wrap to see the search bar change!*/
.wrap{
  width: 30%;
  position: relative;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%);
}

</style>