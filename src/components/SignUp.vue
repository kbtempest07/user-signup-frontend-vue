<template>
  <div class="login-page">
    <div class="form">
      <form class="register-form">
        <input
          type="text"
          class="form-control"
          id="name"
          placeholder="Name"
          v-model="userData.name"
          @change="$v.userData.name.$touch()"
          :class="{
            'is-invalid': $v.userData.name.$error && $v.userData.name.$dirty,
            'is-valid': !$v.userData.name.$error && $v.userData.name.$dirty
          }"
        />
        <span
          class="help-block invalid-feedback"
          v-if="!$v.userData.name.required"
          >Name is required</span
        >
        <input
          type="password"
          class="form-control"
          id="password"
          placeholder="Password"
          required=""
          v-model="userData.password"
          @change="$v.userData.password.$touch()"
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
        <input
          type="email"
          class="form-control"
          id="email"
          placeholder="Email"
          v-model="userData.email"
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
        <button @click.prevent="validateForm">create</button>
        <p class="message">
          Already registered?
          <a href="#" @click.prevent="$emit('loadSignIn')">Sign In</a>
        </p>
      </form>
    </div>
  </div>
</template>
<script>
function initialState() {
  return {
    userData: {
      name: "",
      email: "",
      password: ""
    },
    formErrorRespose: ""
  };
}
import { required, minLength, alphaNum, email } from "vuelidate/lib/validators";

export default {
  data() {
    return initialState();
  },
  validations: {
    userData: {
      name: {
        required
      },
      email: {
        required,
        email,
        minLength: minLength(5)
      },
      password: {
        required,
        alphaNum,
        minLength: minLength(8)
      }
    }
  },
  methods: {
    signUp() {
      this.$http.post("/user/signup", this.userData).then(
        () => {
          this.$emit("loadSignIn");
          this.$emit("userRegistrationSuccess");
        },
        error => {
          if (error.status === 401) {
            this.formErrorRespose = error.message;
          }
        }
      );
    },
    validateForm() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        // console.error("Sign Up Form is invalid");
      } else {
        // do your submit logic here
        this.signUp();
      }
    },

    resetDataAndValidation() {
      this.$v.$reset();
      Object.assign(this.$data, initialState());
    },
    clearServerErros() {
      this.formErrorRespose = "";
    }
  },
  beforeDestroy() {
    this.resetDataAndValidation();
  }
};
</script>
