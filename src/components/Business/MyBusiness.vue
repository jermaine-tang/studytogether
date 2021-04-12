<template>
    <div>
        <app-header></app-header>
        <div class="info">
            Information
            <br><br>
            <button v-on:click="route()">Edit General Information</button>
        <br><br>
        <!-- Xie Ran's part -->
        <button v-on:click="edit()">Edit Timeslots</button>
        <br><br>
        </div>
                    
    </div>
</template>

<script>
    import Header from "../UI/Header.vue";
    //import firebase from 'firebase';

    export default {
        data() {
            return {
                bizID: '5iBl58sV6uv7riUzCQzn',
            }
        },
        components: {
            "app-header": Header
        },

        methods: {

            fetchID: function () {

                /*
                var user = firebase.auth().currentUser;
                console.log(user);
                var userID = user.uid;
                this.bizID = userID;
                */
                
                
                //update how to get listing ID after biz login is done

            },
            
            route: function() {
                this.$router.push({name:"info", params: {id:this.bizID}});
            },

            edit: function() {
                this.$router.push({name:"edit", params: {id:this.bizID}});
            }

        },

        created: function () {
            this.fetchID();
        }
    }

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

.booking-timings{
    border: 3px solid #fff;
    padding: 20px;
}

.float-left {
    width: 50%;
    float: left;
    padding: 20px;
    border: 2px ;
}

.float-right {
    width: 50%;
    float: right;
    padding: 20px;
    border: 2px ;
}

</style>

