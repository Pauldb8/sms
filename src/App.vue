<template>
  <div id="app">
    <ion-vue-router />
  </div>
</template>

<style lang="scss">
h1 {
  color: $dark;
  font-weight: 300 !important;
}
h1 span {
  font-size: 0.7em;
  font-style: italic;
  color: $medium;
  //text-shadow: 0px 0px 3px black;
}
h1.logo {
  padding-top: 150px;
  margin: 0px;
  animation: 1s ease-out 0s 1 zoomInFromOut;
  text-rendering: optimizeLegibility;
  font-size: 10em;
  font-weight: 200 !important;
  position: relative;
  color: #222222;
  background: $accent;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
ion-list-header {
  padding-left: 8px;
  --height: 20px !important;
  --background: #ffffffaa !important;
}
ion-list {
  min-height: 20px !important;
  padding: 0px 0px !important;
  background: transparent !important;
  border-radius: 3px;
}
ion-item {
  --background: #ffffffaa !important;
}
.bg-white {
  background: #ffffff99;
}
.four-borders {
  border-radius: 4px;
}
</style>