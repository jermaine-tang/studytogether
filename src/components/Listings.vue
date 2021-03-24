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
          <div class="location">
          <img id="location-pin" src="https://img.icons8.com/pastel-glyph/64/000000/place-marker--v1.png"/>
          {{ listing.loc_neighbourhood }}
          </div>
          <div class="noise">  Noise: {{ listing.noise }}  
            <span id="noise-pics">
              <img id="noise-pic" src="https://img.icons8.com/fluent-systems-regular/24/000000/low-volume.png"/>
              <img v-if="listing.noise > 1" id="noise-pic" src="https://img.icons8.com/fluent-systems-regular/24/000000/low-volume.png"/>
              <img v-if="listing.noise > 2" id="noise-pic" src="https://img.icons8.com/fluent-systems-regular/24/000000/low-volume.png"/>
            </span>
          </div>
          <div class="rating">
            <img v-if="listing.rating > 0" src="https://img.icons8.com/fluent/48/000000/star.png"/>
            <img v-if="listing.rating > 1" src="https://img.icons8.com/fluent/48/000000/star.png"/>
            <img v-if="listing.rating > 2" src="https://img.icons8.com/fluent/48/000000/star.png"/>
            <img v-if="listing.rating > 3" src="https://img.icons8.com/fluent/48/000000/star.png"/>
            <img v-if="listing.rating > 4" src="https://img.icons8.com/fluent/48/000000/star.png"/>
          </div>
          
          <div class="price" v-bind:price="listing.price"> Price: {{ listing.price}}
            <span id="price-pics">
              <img src="https://img.icons8.com/metro/26/000000/us-dollar--v1.png"/>
              <img v-if="listing.price >= 10 && listing.price <= 20" src="https://img.icons8.com/metro/26/000000/us-dollar--v1.png"/>
              <img  v-if="listing.price > 20" src="https://img.icons8.com/metro/26/000000/us-dollar--v1.png"/>
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


.location, .noise, .price {
  float: left;
  
  font-size: 20px;
  display: inline-block;
}

#location-pin, # {
  
  margin-left: 30px;
}
.details {
  float: left;


}



/*
.box {
  background-color: #ffffff;
  width: 400px;
  height: 350px;
  margin: 7em auto;
  border-radius: 40px;
  box-shadow: 0px 0px 10px 10px lightgrey;
}

.title {
  padding-top: 40px;
  color: #8c55aa;
  font-family: "Ubuntu", sans-serif;
  font-weight: bold;
  font-size: 23px;
}

.user, .pass {
  width: 75%;
  color: darkgrey;
  font-weight: bold;
  font-size: 14px;
  letter-spacing: 1px;
  background: whitesmoke;
  padding: 10px;
  border-radius: 20px;
  box-sizing: border-box;
  border: 2px solid white;
  text-align: center;
  margin-bottom: 25px;
  font-family: "Ubuntu", sans-serif;
}

.user:focus, .pass:focus {
  outline: none;
  border-color: darkgrey;
}

.user:focus::-webkit-input-placeholder, .pass:focus::-webkit-input-placeholder {
  opacity: 0;
}

.submit {
  cursor: pointer;
  border-radius: 5em;
  color: #fff;
  background: linear-gradient(to right, #9c27b0, #e040fb);
  border: 0;
  padding-left: 40px;
  padding-right: 40px;
  padding-bottom: 10px;
  padding-top: 10px;
  font-family: "Ubuntu", sans-serif;
  font-size: 13px;
  box-shadow: 0 0 20px 1px rgba(0, 0, 0, 0.04);
}

.forgot {
  text-shadow: 0px 0px 3px rgba(117, 117, 117, 0.12);
  color: #e1bee7;
  padding-top: 15px;
}

a {
  text-shadow: 0px 0px 3px rgba(117, 117, 117, 0.12);
  color: #e1bee7;
  text-decoration: none;
}

*/
</style>