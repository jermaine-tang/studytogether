<template>
  <div class="favourites list">
    <app-header></app-header>
    <h1>Favourites</h1>
    <ul class="favourites-list">
      <li v-for="(listing, index) in list" :key="index">
        <!-- picture of cafe -->
        <img id="main-pic" v-bind:src="listing.photoURL1" />
        <div id="name">
          <b> {{ listing.name }} </b>
        </div>
        <!-- Button to cancel bookmark -->
        <button
          class="button"
          v-bind:id="listing.id"
          v-on:click="remove($event)"
        >
          Remove
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
import firebase from "firebase";
import database from "../firebase.js";
import Header from "./UI/Header.vue";

export default {
  data() {
    return {
      list: [],
      idList: [],
      listUpdated: false,
    };
  },

  components: {
    "app-header": Header,
  },

  created() {
    this.fetchItems();
  },

  methods: {
    fetchItems: async function () {
    // await setTimeout(() => {}, 1000)
        var user = firebase.auth().currentUser;

            console.log(user)

      await database
        .collection("users")
        .doc(user.uid)
        .get()
        .then((snapshot) => {
          //   this.idList = snapshot.data().favourites;
          var fav = snapshot.data().favourites;
          if (!fav.empty) {
            for (var i = 0; i < fav.length; i++) {
              var id = fav[i];
              database
                .collection("listings")
                .doc(id)
                .get()
                .then((querySnapshot) => {
                  this.list.push(querySnapshot.data());
                });
            }
          }
        });

      console.log(this.list);

      //   if (!this.idList.empty) {
      //     await database
      //       .collection("listings")
      //       .get()
      //       .then((snapshot) => {
      //         let item = {};
      //         snapshot.docs.forEach((doc) => {
      //           if (this.idList.includes(doc.id)) {
      //             item = { ...doc.data(), ["id"]: doc.id };
      //             this.list.push(item); //push the list of favourites into list
      //           }
      //         });
      //       });
      //   }
    },

    remove: function (event) {
      let doc_id = event.target.getAttribute("id");
      console.log(event.target);
      console.log(doc_id);
      let user = firebase.auth().currentUser;
      // var fav = [];
      // var newFav = [];
      database
        .collection("users")
        .doc(user.uid)
        .get()
        .then((snapshot) => {
          const data = snapshot.data();

          var fav = data.favourites;

          const indexOf = fav.indexOf(doc_id);

          fav.splice(indexOf, 1);

          database
            .collection("users")
            .doc(user.uid)
            .update({ favourites: fav });

          // snapshot.docs.forEach(doc => {
          // if (doc.id == user.uid) {//get the user
          //     fav = doc.data().favourites;
          //     console.log(fav);
          //     for (let i = 0; i < fav.length; i++) {
          //         if (fav[i] != doc_id) {
          //             newFav.push(fav[i]);
          //             console.log(newFav[i] + "added");
          //         }
          //     }
          //     database.collection('users').doc(user.uid).update({"favourites": newFav});
          //     console.log(newFav);
          //     console.log("remove");
          // }
          // })
        });
        this.listUpdated = false;
    },
  },

  watch: {
      listUpdated: async function() {
          this.listUpdated = true;
          await this.fetchItems;
      }
  }

};
</script>

<style scoped>
ul {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 30%;
  padding-top: 3%;
  margin: auto;
}

li {
  display: flex;
  flex-wrap: wrap;
  width: 1000px;
  position: relative;
  /*  flex-basis: 300px; */
  text-align: center;
  padding: 10px;
  border: 3px solid #ed7a78;
  margin: 10px;
  margin-top: 5px;
  border-radius: 25px;
  font-family: "Ubuntu", sans-serif;
  margin: 0 0 10 0;
}

.button {
  position: relative;
  left: 90px;
  height: 50px;
  width: 90px;
}

#main-pic {
  position: relative;
  /* left: 1px; */
  border-radius: 15px;
  width: 200px;
  height: 150px;
}

#name {
  position: relative;
  left: 30px;
  top: 15px;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-size: 30px;
  font-weight: 1000;
}
</style>
