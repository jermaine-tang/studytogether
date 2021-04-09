<template>
  <v-container>
    <v-layout row>
      <v-flex class="text-center font-weight-black">
        <h1>Upload a photo</h1>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex  md6 offset-sm3>
        <div>

            <div>
                <button @click="click1">choose a photo</button>
                <input type="file" ref="input1"
                style="display: none"
                @change="previewImage" accept="image/*">                  
            </div>
 
            <div v-if="imageData!=null">                     
                <img class="preview" height="268" width="356" :src="img1">
                 <br>
            </div>   

            <div>
                <button @click="click1">choose a photo</button>
                <input type="file" ref="input1"
                style="display: none"
                @change="previewImage" accept="image/*">                  
            </div>
 
            <div v-if="imageData!=null">                     
                <img class="preview" height="268" width="356" :src="img1">
                 <br>
            </div>  

            <div>
                <button @click="click1">choose a photo</button>
                <input type="file" ref="input1"
                style="display: none"
                @change="previewImage" accept="image/*">                  
            </div>
 
            <div v-if="imageData!=null">                     
                <img class="preview" height="268" width="356" :src="img1">
                 <br>
            </div>  
       </div>
       </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex class="text-center">
        <button color="pink" @click="create">upload</button>
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
        bizID: '5iBl58sV6uv7riUzCQzn ',
        img1:'',
        img2:'',
        img3:'',
        imageData1:'',
        imageData2:'',
        imageData3:'',
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

      database.collections('listings').doc(this.bizID).update({
          photoURL1: this.img1,
          photoURL2: this.img2,
          photoURL3: this.img3
      })
      .then((response) => {
        console.log(response)
      })
      .catch(err => {
        console.log(err)
      })
    },

    click1() {
        this.$refs.input1.click()   
    },

    previewImage1(event) {
    this.uploadValue=0;
    this.img1=null;
    this.imageData1 = event.target.files[0];
    this.onUpload()
    },

    previewImage2(event) {
    this.uploadValue=0;
    this.img2=null;
    this.imageData2 = event.target.files[0];
    this.onUpload()
    },

    previewImage3(event) {
    this.uploadValue=0;
    this.img3=null;
    this.imageData3 = event.target.files[0];
    this.onUpload()
    },

    onUpload(){
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

        this.img2=null;
        const storageRef2=firebase.storage().ref(`${this.imageData2.name}`).put(this.imageData2);
        storageRef2.on(`state_changed`,snapshot=>{
        this.uploadValue = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
        }, error=>{console.log(error.message)},
        ()=>{this.uploadValue=100;
            storageRef2.snapshot.ref.getDownloadURL().then((url)=>{
                this.img2 =url;
                console.log(this.img2)
                });
            }      
        );

        this.img3=null;
        const storageRef3=firebase.storage().ref(`${this.imageData3.name}`).put(this.imageData3);
        storageRef3.on(`state_changed`,snapshot=>{
        this.uploadValue = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
        }, error=>{console.log(error.message)},
        ()=>{this.uploadValue=100;
            storageRef3.snapshot.ref.getDownloadURL().then((url)=>{
                this.img3 =url;
                console.log(this.img3)
                });
            }      
        );
    },
  }
}
</script>

<style scoped>

</style>