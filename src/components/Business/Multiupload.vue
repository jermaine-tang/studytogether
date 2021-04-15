<template>
  <div>
    <b-form-file
      v-model="imgData"
      @change="uploadImage"
      ref="file-input"
      class="mb-2"
      multiple
    ></b-form-file>

    <b-button @click="img = []">Reset</b-button>

    <p class="mt-2">
      Selected file: <b>{{ imgData }}</b>
    </p>

    <vueper-slides
      bullets-outside
      class="menu-slides"
      :arrows-outside="false"
      :disableArrowsOnEdges="true"
      :infinite="false"
      fixed-height="200px;"
      @next="index += 1"
      @previous="index -= 1"
    >
      <vueper-slide v-for="(url,index) in img" :image="url" :key="index"/>
    </vueper-slides>
  </div>
</template>


<script>
import firebase from "firebase";
import database from "../../firebase.js";
import { VueperSlides, VueperSlide } from "vueperslides";
import "vueperslides/dist/vueperslides.css";

export default {
  components: {
    "vueper-slides": VueperSlides,
    "vueper-slide": VueperSlide,
  },
  data() {
    return {
      bizID: "",
      index: 0,
      img: new Array(),
      imgData: new Array(),
    };
  },

  watch: {
    index: function() {
      console.log(this.index)
    }
  },
  methods: {
    fetchID: async function () {
      var user = firebase.auth().currentUser;
      var userID = user.uid;
      this.bizID = userID;
    },

    fetchImg: function() {
      database.collection('listings').doc(this.bizID).get().then(snapshot => {
        
      })
    },

    uploadImage: function (e) {
      console.log(e.target.files);
      this.imgData = e.target.files;

      if (this.imgData.length > 0) {
        for (var i = 0; i < this.imgData.length; i++) {
          var imageData = this.imgData[i];
          const storageRef = firebase
            .storage()
            .ref(`${imageData.name}`)
            .put(imageData);
          storageRef.on(
            `state_changed`,
            (snapshot) => {
              this.uploadValue =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            },
            (error) => {
              console.log(error.message);
            },
            () => {
              this.uploadValue = 100;
              storageRef.snapshot.ref.getDownloadURL().then((url) => {
                this.img.push(url);
                // this.img1 = url;
                // console.log(this.img1);
              });
            }
          );
        }
      }
      console.log(this.img);
    },
    // create: async function () {
    //   /**
    //   const post = {
    //     photo1: this.img1,
    //     photo2: this.img2,
    //     photo3: this.img3
    //   }
    // **/

    //   await database.collection("listings").doc(this.bizID).update({
    //     photoURL1: this.img1,
    //     photoURL2: this.img2,
    //     photoURL3: this.img3,
    //   });

    //   window.location.reload();

    //   /**
    //   .then((response) => {
    //     console.log(response)
    //   })
    //   .catch(err => {
    //     console.log(err)
    //   })
    // **/
    // },

    // click1() {
    //   this.$refs.input1.click();
    // },

    // click2() {
    //   this.$refs.input2.click();
    // },

    // click3() {
    //   this.$refs.input3.click();
    // },

    // preview() {
    //   console.log(this.imgData[0])
    // },

    // previewImage1(event) {
    //   this.uploadValue = 0;
    //   this.img1 = null;
    //   this.imageData1 = event.target.files[0];
    //   console.log(event.target.files);
    //   this.onUpload1();
    // },

    // previewImage2(event) {
    //   this.uploadValue = 0;
    //   this.img2 = null;
    //   this.imageData2 = event.target.files[0];
    //   this.onUpload2();
    // },

    // previewImage3(event) {
    //   this.uploadValue = 0;
    //   this.img3 = null;
    //   this.imageData3 = event.target.files[0];
    //   this.onUpload3();
    // },

    // onUpload1() {
    //   this.img1 = null;
    //   const storageRef = firebase
    //     .storage()
    //     .ref(`${this.imageData1.name}`)
    //     .put(this.imageData1);
    //   storageRef.on(
    //     `state_changed`,
    //     (snapshot) => {
    //       this.uploadValue =
    //         (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    //     },
    //     (error) => {
    //       console.log(error.message);
    //     },
    //     () => {
    //       this.uploadValue = 100;
    //       storageRef.snapshot.ref.getDownloadURL().then((url) => {
    //         this.img1 = url;
    //         console.log(this.img1);
    //       });
    //     }
    //   );
    // },

    // onUpload2() {
    //   this.img2 = null;
    //   const storageRef2 = firebase
    //     .storage()
    //     .ref(`${this.imageData2.name}`)
    //     .put(this.imageData2);
    //   storageRef2.on(
    //     `state_changed`,
    //     (snapshot) => {
    //       this.uploadValue =
    //         (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    //     },
    //     (error) => {
    //       console.log(error.message);
    //     },
    //     () => {
    //       this.uploadValue = 100;
    //       storageRef2.snapshot.ref.getDownloadURL().then((url) => {
    //         this.img2 = url;
    //         console.log(this.img2);
    //       });
    //     }
    //   );
    // },

    // onUpload3() {
    //   this.img3 = null;
    //   const storageRef3 = firebase
    //     .storage()
    //     .ref(`${this.imageData3.name}`)
    //     .put(this.imageData3);
    //   storageRef3.on(
    //     `state_changed`,
    //     (snapshot) => {
    //       this.uploadValue =
    //         (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    //     },
    //     (error) => {
    //       console.log(error.message);
    //     },
    //     () => {
    //       this.uploadValue = 100;
    //       storageRef3.snapshot.ref.getDownloadURL().then((url) => {
    //         this.img3 = url;
    //         console.log(this.img3);
    //       });
    //     }
    //   );
    // },
  },

  created() {
    this.fetchID();
  },
};
</script>

<style scoped>
</style>