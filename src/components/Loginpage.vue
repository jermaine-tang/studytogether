<template>
  <div>
    <app-header></app-header>
    <div class="box">
      <p class="title">Sign in</p>
      <form class="form">
        <input class="email" type="email" align="center" placeholder="Email" v-model="loginform.email" required/>
        <input
          class="pass"
          type="password"
          align="center"
          placeholder="Password"
          v-model="loginform.password"
          required
        />
        <br>
        <a class="submit" align="center" v-on:click="submit"><span>Sign in</span></a>
      </form>
      <p class="forgot" align="center"><a href="#">Forgot Password?</a></p>
      <p class="signup" align="center">Not yet Registered? <a href="/signup">Sign Up here!</a></p>
    </div>
  </div>
</template>

<script>
import Header from "./UI/Header.vue";
import firebase from "firebase";

export default {
  data() {
    return {
      loginform: {
        email: "",
        password: "",
      },
    };
  },
  components: {
    "app-header": Header,
  },

  methods: {
    submit: function() {
      firebase.auth().signInWithEmailAndPassword(this.loginform.email, this.loginform.password)
      .then(userCredential => {
        var user = userCredential.user;
        console.log(user)
      })
      .catch(err => {
        console.log(err);
      })

    }
  }
};
</script>

<style scoped>
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

.email, .pass {
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
  margin-bottom: 20px;
  font-family: "Ubuntu", sans-serif;
}

.email:focus, .pass:focus {
  outline: none;
  border-color: darkgrey;
}

.email:focus::-webkit-input-placeholder, .pass:focus::-webkit-input-placeholder {
  opacity: 0;
}

.submit {
  display: inline-block;
  margin-top: 5px;
  cursor: pointer;
  border-radius: 20px;
  color: whitesmoke;
  background: linear-gradient(to right, #9c27b0, #e040fb);
  padding-left: 40px;
  padding-right: 40px;
  padding-bottom: 10px;
  padding-top: 10px;
  font-family: "Ubuntu", sans-serif;
  font-weight: bold;
  font-size: 13px;
}

.forgot {
  color: plum;
  padding-top: 10px;
  font-weight: bold;
}

.signup {
  font-weight: bold;
}

a {
  color: plum;
  text-decoration: none;
}

.submit span {
  cursor: pointer;
  display: inline-block;
  position: relative;
  transition: 0.5s;
}

.submit span:after {
  content: '\00bb';
  position: absolute;
  opacity: 0;
  right: -40px;
  transition: 0.5s;
}

.submit:hover span {
  padding-right: 15px;
}

.submit:hover span:after {
  opacity: 1;
  right: -10px;
}
</style>