<template>
  <!-- footer -->
  <ion-footer>
    <ion-toolbar>
      <ion-grid no-padding>
        <ion-row>
          <ion-col no-padding text-center>
            <router-link to="/me">
              <ion-icon name="person" class="home"></ion-icon>
            </router-link>
          </ion-col>
          <ion-col no-padding text-center>
            <router-link to="/">
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
</template>

<style lang="scss" scoped>
.home {
  font-size: 2em;
  height: 50px;
  color: $primary;
}
.active {
  color: $accent;
  fill: $accent;
  background-image: linear-gradient(to right top, #124e78, #357494);
  font-size: 2.2em;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
    
<script>
export default {
  name: "FooterToolbar",
  data: function() {
    return {
      tab: "me"
    };
  }
};
</script>
    