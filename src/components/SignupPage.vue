<template>
  <div>
    <app-header></app-header>
    <div class="box">
      <p class="title">Sign Up</p>
      <form class="form">
        <input class="user" type="text" align="center" placeholder="Username" />
        <input class="email" type="email" align="center" placeholder="Email"/>
        <input
          class="pass"
          type="password"
          align="center"
          placeholder="Password"
        />
        <br>
        <a class="submit" align="center">Sign Up</a>
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

.user, .pass, .email {
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
  margin-bottom: 15px;
  font-family: "Ubuntu", sans-serif;
}

.user:focus, .pass:focus, .email:focus {
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
  border: 10;
  padding-left: 40px;
  padding-right: 40px;
  padding-bottom: 10px;
  padding-top: 10px;
  font-family: "Ubuntu", sans-serif;
  font-size: 13px;
  font-weight: bold;
  box-shadow: 0 0 20px 1px rgba(0, 0, 0, 0.04);
}

a {
  text-shadow: 0px 0px 3px rgba(117, 117, 117, 0.12);
  color: #e1bee7;
}

a.submit:hover {
    border-color: grey;
}
</style>