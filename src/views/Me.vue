<template>
  <div class="ion-page">
    <!-- Main content -->
    <ion-content no-padding class="main">
      <my-header></my-header>
      <ion-grid no-padding>
        <ion-row>
          <ion-col text-center>
            <div id="avatar">
              <img src="../assets/img/pauldb.jpg" />
            </div>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col text-center class="bg-white">
            <input placeholder="Name" name="name" v-model="user.name" />
            <input placeholder="Location" name="location" v-model="user.location" />
            <br />
            <br />
            <a class="ion-color-accent" @click="update()">Save</a>
            <br />
            {{ count }}
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
    <footer-toolbar></footer-toolbar>
  </div>
</template>

<style lang="scss" scoped>
.ion-page,
.main {
  background: url("../assets/background.jpeg") no-repeat center center / cover;
  --background: url("../assets/background.jpeg") no-repeat center center / cover;
}
#avatar {
  height: 200px;
  width: 200px;
  margin: auto;

  border: double 4px transparent;
  border-radius: 100px;
  background-image: linear-gradient(white, white), $accent;
  background-origin: border-box;
  background-clip: content-box, border-box;
  overflow: hidden;
}
ion-row {
  padding: 8px;
}
input {
  width: 100%;
  background: transparent;
  font-size: 1.8em;
  font-weight: 300;
  color: $dark;
  border: none;
  text-align: center;
  opacity: 0.6;
}
a {
  font-family: "Roboto";
  font-weight: 300;
  font-size: 2em;
  font-variant: small-caps;
  background: $accent;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>

<script>
import { User } from "../models/User";
export default {
  name: "Me",
  data: function() {
    return {
      user: new User()
    };
  },
  methods: {
    update() {
      console.log("" + this.user.name + ":" + this.user.location);
      localStorage.user_name = this.user.name;
      localStorage.user_location = this.user.location;
    }
  },
  created() {
    if (localStorage.user_name && localStorage.user_location) {
      this.user.name = localStorage.user_name;
      this.user.location = localStorage.user_location;
      console.log("User exists");
    } else {
      this.user = new User("", "");
    }
  },
  computed: {
    count() {
      return this.$store.state.count;
    }
  }
};
</script>