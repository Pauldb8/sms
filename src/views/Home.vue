<template>
  <div class="ion-page">
    <ion-content no-padding>
      <h1 text-center padding>
        Supply Management System
        <br />
        <span color="medium">on the public Blockchain</span>
      </h1>
      <ion-grid>
        <ion-row>
          <ion-col>
            <ion-card>
              <ion-card-header>
                <ion-card-subtitle>Fish arrived at port</ion-card-subtitle>
                <ion-card-title>Fisheries</ion-card-title>
              </ion-card-header>
            </ion-card>
          </ion-col>
          <ion-col>
            <ion-card>
              <ion-card-header>
                <ion-card-subtitle>Just arrived in China</ion-card-subtitle>
                <ion-card-title>Metal material</ion-card-title>
              </ion-card-header>
            </ion-card>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
    <ion-footer>
      <ion-toolbar>
        <ion-grid no-padding>
          <ion-row>
            <ion-col no-padding text-center>
              <router-link to="/">
                <ion-icon name="person" class="home"></ion-icon>
              </router-link>
            </ion-col>
            <ion-col no-padding text-center>
              <router-link to="/about">
                <ion-icon name="albums" class="home"></ion-icon>
              </router-link>
            </ion-col>
            <ion-col no-padding text-center>
              <router-link to="/wallet">
                <ion-icon name="wallet" class="home"></ion-icon>
              </router-link>
            </ion-col>
          </ion-row>
        </ion-grid>
      </ion-toolbar>
    </ion-footer>
  </div>
</template>

<script>
export default {
  name: "home"
};
</script>

<style lang="scss">
ion-content {
  --background: url("../assets/background.jpeg") no-repeat center center / cover;
}
h1 {
  color: $dark;
}
h1 span {
  font-size: 0.7em;
  font-style: italic;
  color: $medium;
}
.home {
  font-size: 2em;
  height: 50px;
  color: $primary;
}
ion-card {
  background: linear-gradient(180deg, white, $light) !important;
}
</style>
