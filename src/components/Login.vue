<template>
  <div class="login-page">
    <div class="form">
      <form class="login-form">
        <input
          type="email"
          required
          class="form-control"
          id="email"
          placeholder="Email"
          v-model.trim="userData.email"
          @change="$v.userData.email.$touch()"
          @focus="clearServerErros()"
          :class="{
            'is-invalid': $v.userData.email.$error && $v.userData.email.$dirty,
            'is-valid': !$v.userData.email.$error && $v.userData.email.$dirty
          }"
        />
        <span
          class="help-block invalid-feedback"
          v-if="!$v.userData.email.required"
          >Email Field is required</span
        >
        <span
          class="help-block invalid-feedback"
          v-if="!$v.userData.email.email"
          >Please enter valid email format</span
        >
        <input
          type="password"
          class="form-control"
          id="password"
          placeholder="Password"
          required
          v-model="userData.password"
          @change="$v.userData.password.$touch()"
          @focus="clearServerErros()"
          :class="{
            'is-invalid':
              $v.userData.password.$error && $v.userData.password.$dirty,
            'is-valid':
              !$v.userData.password.$error && $v.userData.password.$dirty
          }"
        />
        <span
          class="help-block invalid-feedback"
          v-if="!$v.userData.password.required"
          >Password Field is required</span
        >
        <span
          class="help-block invalid-feedback"
          v-if="!$v.userData.password.alphaNum"
          >Password must strictly be alpha-numeric</span
        >
        <span
          class="help-block invalid-feedback"
          v-if="!$v.userData.password.minLength"
          >Password must of atleast
          {{ $v.userData.password.$params.minLength.min }} letters</span
        >
        <button @click.prevent="validateForm()">login</button>
        <p class="message">
          Not registered?
          <a href="#" @click.prevent="$emit('loadSignUp')">Create an account</a>
        </p>
      </form>
    </div>
  </div>
</template>

<script>
function initialState() {
  return {
    userData: {
      email: "",
      password: ""
    },
    formErrorRespose: ""
  };
}
import { required, minLength, email, alphaNum } from "vuelidate/lib/validators";
import store from "@/store";

export default {
  data() {
    return initialState();
  },
  validations: {
    userData: {
      email: {
        required,
        email,
        minLength: minLength(5)
      },
      password: {
        required,
        alphaNum,
        minLength: minLength(6)
      }
    }
  },
  methods: {
    login() {
      this.$http.post(`/user/login`, this.userData).then(
        response => {
          store.dispatch("customer/setLoginStatus", true);
          store.dispatch("customer/setJWT", response.data.token);
          this.$router.push({
            path: "/profile"
          });
        },
        error => {
          if (error.status === 401) {
            store.dispatch("customer/setLoginStatus", false);
          }
        }
      );
    },
    validateForm() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        // console.error("Login Form is invalid");
      } else {
        // do your submit logic here
        this.login();
      }
    },
    resetDataAndValidation() {
      this.$v.$reset();
      Object.assign(this.$data, initialState());
    }
  }
};
</script>
