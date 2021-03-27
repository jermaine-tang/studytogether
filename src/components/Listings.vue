<template>
  <div>
    <app-header></app-header>
    <div class="listings-list">
      <ul class="listings-list">
        <li v-for="listing in list" :key="listing.id" v-bind:id="listing.id" v-on:click="route($event)" >
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
              <img v-if="listing.price >= 10 && listing.price <= 20" src="https://img.icons8.com/metro/26/000000/us-dollar--v1.png" width="40px"/>
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
    "app-header": Header,
  },
//  props: ['list'],
  methods: {
    fetchItems: function() {
      database.collection('listings').get().then((querySnapShot) => {
      let item = {}
        querySnapShot.docs.forEach(doc => {
          item= {...doc.data(), ['id']: doc.id}
          console.log(item)
          this.list.push(item)
          })
      })
    },

    route: function(event) {
            let doc_id = event.target.getAttribute("id");
            this.$router.push({path: "indiv", query: {id: doc_id}, params: { id: doc_id}})
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

</style>