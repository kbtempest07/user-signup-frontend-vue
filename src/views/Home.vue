<template>
  <div class="home">
    <component
      :is="componentId"
      @loadSignUp="loadSignUp"
      @loadSignIn="loadSignIn"
      @userRegistrationSuccess="showSignUpSuccess()"
    />
    <div class="container" v-if="singUpSuccess">
      <p>
        User signup Successful , Please Login to continue.
      </p>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Login from "@/components/Login";
import SignUp from "@/components/SignUp";
import { setTimeout } from "timers";

export default {
  name: "home",
  components: {
    Login,
    SignUp
  },
  data() {
    return {
      componentId: "Login"
    };
  },
  methods: {
    loadSignUp() {
      this.componentId = "SignUp";
    },
    loadSignIn() {
      this.componentId = "Login";
    },
    showSignUpSuccess() {
      this.singUpSuccess = true;
      setTimeout(() => {
        this.singUpSuccess = false;
      }, 3000);
    }
  }
};
</script>
