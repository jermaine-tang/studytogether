<template>
  <div>
    <app-header></app-header>
    <div class="box">
      <p class="title">Register</p>
      <form class="form">
        <input class="email" type="email" align="center" placeholder="Email"/>
        <input class="user" type="text" align="center" placeholder="Username" />
        <input
          class="pass"
          type="password"
          align="center"
          placeholder="Password"
        />
        <input class="number" type="text" align="center" placeholder="Phone Number"/>
        <br>
        <a class="submit" align="center"><span>Sign Up</span></a>
      </form>
    </div>
  </div>
</template>

<script>
import Header from "./UI/Header.vue";

export default {
  data() {
    return {
      loginForm: {
        email: "",
        password: "",
      },
    };
  },
  components: {
    "app-header": Header,
  },
};
</script>

<style scoped>
.box {
  background-color: #ffffff;
  width: 400px;
  height: 410px;
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

.user, .pass, .email, .number {
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

.user:focus, .pass:focus, .email:focus, .number:focus {
  outline: none;
  border-color: darkgrey;
}

.user:focus::-webkit-input-placeholder, .pass:focus::-webkit-input-placeholder, .email:focus::-webkit-input-placeholder, .number:focus::-webkit-input-placeholder {
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
  transition: 0.2s;
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