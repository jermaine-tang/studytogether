<template>
    <div>
        <app-header></app-header>
        <div class="info">
            Information
            <br><br>
            <button v-on:click="route()">Edit General Information</button>
        </div>
        <br><br>
        <div class="booking-timings">
        Edit Booking Timings
        <!-- Xie Ran's part -->
        <button v-on:click="edit()">Edit Timeslots</button>
        <br><br>
        </div>
    </div>
</template>

<script>
    import Header from "../UI/Header.vue";
    import firebase from 'firebase';

    export default {
        data() {
            return {
                bizID: '',
            }
        },
        components: {
            "app-header": Header
        },

        methods: {

            fetchID: function () {

                
                var user = firebase.auth().currentUser;
                console.log(user.uid);
                var userID = user.uid;
                this.bizID = userID;
                
                
                
                //update how to get listing ID after biz login is done

            },
            
            route: function() {
                this.$router.push({name:"info", params: {id:this.bizID}});
            },

            edit: function() {
                this.$router.push({name:"edit", params: {id:this.bizID}});
            }
        }
        }



</script>

<style scoped>

.info,.booking-timings, button {
    font-size: 30px;
}

.info button {
  margin-left: auto;
  display: inline-block;
  cursor: pointer;
  border-radius: 10px;
  color: whitesmoke;
  background: #ED7A78;
  border: 2px solid transparent;
  height: 80px;
  width: 200px;
  font-family: "Ubuntu", sans-serif;
  font-weight: bold;
  font-size: 20px;
  transition: 0.2s;
}

.info button:hover {
  border-color: white;
  background-color: #e33c39;
}

</style>

