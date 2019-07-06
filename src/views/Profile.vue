<template>
  <div id="profile" class="user-profile">
    <nav
      class="navbar navbar-expand-lg navbar-light bg-light d-flex justify-content-between"
    >
      <div class="navbar-brand">Profile</div>
      <div
        class="btn btn-outline-danger my-2 my-sm-0"
        @click.prevent="logout()"
      >
        LogOut
      </div>
    </nav>
    <div class="container">
      <h3>User Name : {{ user.username }}</h3>
      <h4>User Email: {{ user.email }}</h4>
    </div>
  </div>
</template>
<script>
import { store } from "@/store";
export default {
  data() {
    return {
      user: {}
    };
  },
  beforeMount() {
    this.$http.get(`/user/get`).then(res => {
      this.user = res.data;
    });
  },
  methods: {
    logout() {
      this.$http.post(`/user/logout`).then(() => {
        store.dispatch("setLoginStatus", false);
        store.dispatch("setJWT", "");
        this.$router.push("/");
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.container {
  max-width: 100%;
  justify-content: flex-start;
}
</style>
