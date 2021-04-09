<template>
  <v-container>
    <v-layout row>
      <v-flex  md6 offset-sm3>
        <div>

            <div>
                <button @click.prevent="click1">Choose Menu Photo</button>
                <input type="file" ref="input1"
                style="display: none"
                @change="previewImage1" accept="image/*">                  
            </div>
            <br>
            <div v-if="imageData1!=null">                     
                <img class="preview" height="80%" width="80%" :src="img1">
                 <br>
            </div>   
       </div>
       </v-flex>
    </v-layout>
    <br>
    <v-layout row>
      <v-flex class="text-center">
        <button color="pink" @click="create">Upload Menu Photo</button>
      </v-flex>
    </v-layout>
  </v-container>
</template>


<script>

import firebase from "firebase";
import database from "../../firebase.js";

export default {
  data () {
    return {
        bizID: '',
        img1:'',
        imageData1:''
    }
  },
  methods: {
    fetchID: async function () {
        var user = firebase.auth().currentUser;
        console.log(user);
        var userID = user.uid;
        this.bizID = userID;
    },
    create () {
    /**
      const post = {
        photo1: this.img1,
        photo2: this.img2,
        photo3: this.img3
      }
    **/

      database.collection('listings').doc(this.bizID).update({
          menu: this.img1,
      });

      /**
      .then((response) => {
        console.log(response)
      })
      .catch(err => {
        console.log(err)
      })
    **/
      
    },

    click1() {
        this.$refs.input1.click()   
    },

    previewImage1(event) {
    this.uploadValue=0;
    this.img1=null;
    this.imageData1 = event.target.files[0];
    this.onUpload1()
    },

    onUpload1(){
        this.img1=null;
        const storageRef=firebase.storage().ref(`${this.imageData1.name}`).put(this.imageData1);
        storageRef.on(`state_changed`,snapshot=>{
        this.uploadValue = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
        }, error=>{console.log(error.message)},
        ()=>{this.uploadValue=100;
            storageRef.snapshot.ref.getDownloadURL().then((url)=>{
                this.img1 =url;
                console.log(this.img1)
                });
            }      
        );
    }
  }
}
</script>

<style scoped>

</style>