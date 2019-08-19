<template>
  <div class="ion-page">
    <!-- Main content -->
    <div class="splash">
      <!-- Splash screen -->
      <div class="bg-image">&nbsp;</div>
      <h1 class="logo" text-center>SMS</h1>
      <h2 class="slogan" text-center>
        Supply Management System
        <br />
        <span color="medium">on the public Blockchain</span>
      </h2>
    </div>
    <ion-content no-padding class="main">
      <ion-fab vertical="bottom" horizontal="end" slot="fixed">
        <ion-fab-button class="create_button ion-color-accent" color="accent">
          <ion-icon name="add"></ion-icon>
        </ion-fab-button>
      </ion-fab>
      <my-header></my-header>
      <ion-grid>
        <ion-row>
          <ion-col>
            <ion-card>
              <img
                src="https://images.unsplash.com/photo-1562587062-e2f449387ed7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
              />
              <ion-card-header class="bg-white">
                <ion-card-subtitle text-center>Fish arrived at port</ion-card-subtitle>
                <ion-card-title text-center>Fisheries</ion-card-title>
              </ion-card-header>
            </ion-card>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <ion-card>
              <img
                src="https://images.unsplash.com/photo-1520697517317-6767553cc51a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
              />
              <ion-card-header>
                <ion-card-subtitle text-center>Just arrived in China</ion-card-subtitle>
                <ion-card-title text-center>Metal material</ion-card-title>
              </ion-card-header>
            </ion-card>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <ion-card>
              <img
                src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1256&q=80"
              />
              <ion-card-header>
                <ion-card-subtitle text-center>Departed from Ecuador</ion-card-subtitle>
                <ion-card-title text-center>Coffee beans</ion-card-title>
              </ion-card-header>
            </ion-card>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
    <footer-toolbar></footer-toolbar>
  </div>
</template>

<script>
export default {
  name: "home"
};
</script>

<style lang="scss" scoped>
/* Splash screen */
.splash {
  height: 0;
  width: 100%;
  padding: 0px;
  margin: 0px;
  overflow: hidden;
  animation: 5s ease-in 0s 1 goTransparent;
  position: absolute;
  z-index: 20;
}
h1.logo {
  padding-top: 150px;
  margin: 0px;
  animation: 1s ease-out 0s 1 zoomInFromOut;
  text-rendering: optimizeLegibility;
  font-size: 10em;
  font-weight: 200;
  position: relative;
  color: #222222;
  background: $accent;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
h2.slogan {
  font-weight: 300;
  animation: 2s ease-out 0s 1 blurIn;
  z-index: 1;
  position: relative;
  color: $dark;
}
h2.slogan span {
  font-size: 0.7em;
  font-style: italic;
  color: $medium;
}
.bg-image {
  height: 100%;
  width: 100%;
  background: url("../assets/background.jpeg") no-repeat center center / cover;
  filter: blur(4px);
  background-size: cover;
  position: absolute;
  z-index: 0;
}
.bg-image:before {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.65);
  z-index: 0;
}
/* Main screen */
.ion-page,
.main {
  background: url("../assets/background.jpeg") no-repeat center center / cover;
  --background: url("../assets/background.jpeg") no-repeat center center / cover;
}
.home {
  font-size: 2em;
  height: 50px;
  color: $primary;
}
ion-fab-button {
  --ion-background-color: $accent !important;
  animation: 5s ease-out 0s 1 slideLeft;
}
ion-card {
  //background: linear-gradient(180deg, white, $light) !important;
  background: #ffffff99 !important;

  img {
    max-height: 150px;
    object-fit: cover;
  }
}
ion-footer {
  animation: 5s ease-out 0s 1 slideUp;
}
/* KeyFrames */
@keyframes zoomInFromOut {
  0% {
    /* font-size: 125em; */
    transform: scale(20);
  }
  80% {
    transform: scale(0.95);
  }
  100% {
    /* font-size: 25em; */
    transform: scale(1);
  }
}
@keyframes blurIn {
  0% {
    filter: blur(10px);
    opacity: 0;
  }
  30% {
    opacity: 0;
    filter: blur(10px);
  }
  66% {
    opacity: 0;
    filter: blur(10px);
  }
  100% {
    opacity: 1;
    filter: blur(0px);
  }
}
@keyframes goTransparent {
  0% {
    height: 100%;
    opacity: 1;
  }
  20% {
    opacity: 1;
  }
  40% {
    opacity: 1;
  }
  60% {
    opacity: 1;
  }
  80% {
    opacity: 0;
  }
  100% {
    opacity: 0;
    height: 100%;
    overflow: hidden;
    z-index: -1;
  }
}
@keyframes goOpaque {
  0% {
  }
  25% {
  }
  50% {
  }
  75% {
  }
  100% {
  }
}
@keyframes slideUp {
  0% {
    display: none;
    opacity: 0;
  }
  20% {
  }
  40% {
  }
  60% {
  }
  80% {
    display: block;
    transform: translateY(150px);
    opacity: 0;
  }
  97% {
    transform: translateY(-3px);
  }
  100% {
    transform: translateY(0px);
    opacity: 1;
  }
}
@keyframes slideLeft {
  0% {
    display: none;
    opacity: 0;
  }
  20% {
  }
  40% {
  }
  60% {
  }
  80% {
    display: block;
    transform: translateX(150px);
    opacity: 0;
  }
  97% {
    transform: translateX(-3px);
  }
  100% {
    transform: translateX(0px);
    opacity: 1;
  }
}
</style>
