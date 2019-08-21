<template>
  <div class="ion-page">
    <!-- Main content -->
    <div class="splash">
      <div class="bg-image">&nbsp;</div>
      <h1 class="logo" text-center>SMS</h1>
      <h2 class="slogan" text-center>
        Supply Management System
        <br />
        <span color="medium">on the BSV Blockchain</span>
      </h2>
    </div>
    <ion-content no-padding class="main">
      <ion-fab vertical="bottom" horizontal="end" slot="fixed" v-on:click="create()">
        <ion-fab-button class="create_button ion-color-accent" color="accent">
          <ion-icon name="add" class="md hydrated" v-bind:class="{ editing: isCreating }"></ion-icon>
        </ion-fab-button>
      </ion-fab>
      <my-header></my-header>
      <ion-grid>
        <transition name="list">
          <ion-row v-if="isCreating">
            <ion-col>
              <ion-card>
                <img :src="newProject.picture" v-on:click="nextPicture()" />
                <ion-card-header>
                  <ion-card-subtitle text-center>{{ newProject.status }}</ion-card-subtitle>
                  <ion-card-title text-center v-if="isCreating">
                    <input v-model="newProject.name" v-on:keyup.enter="save()" ref="new_project" />
                  </ion-card-title>
                  <ion-card-title text-center v-else>{{ newProject.name }}</ion-card-title>
                </ion-card-header>
              </ion-card>
            </ion-col>
          </ion-row>
        </transition>
        <transition-group name="list">
          <ion-row v-for="(project) in projects" v-bind:key="project.name">
            <ion-col>
              <ion-card v-on:click="openProject(project.id)">
                <img :src="project.picture" />
                <ion-card-header>
                  <ion-card-subtitle text-center>{{ project.status }}</ion-card-subtitle>
                  <ion-card-title text-center>{{ project.name }}</ion-card-title>
                </ion-card-header>
              </ion-card>
            </ion-col>
          </ion-row>
        </transition-group>
      </ion-grid>
    </ion-content>
    <footer-toolbar></footer-toolbar>
  </div>
</template>

<script>
const datapay = require("datapay");
import { Project } from "../models/Project";
import axios from "axios";
import lodash from "lodash";
import { lstat } from "fs";
const defaultPic =
  "https://images.unsplash.com/photo-1483546363825-7ebf25fb7513?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80;";

export default {
  name: "home",
  data: function() {
    return {
      i: 0,
      isCreating: false,
      newProject: new Project(1, "New project", "In creation", this.defaultPic),
      unsplash_pictures: []
    };
  },
  methods: {
    create() {
      this.isCreating = !this.isCreating;
    },
    save() {
      this.newProject.id = this.$store.state.next_project_id;
      this.newProject.status = "Created";
      this.getImage();
      this.$store.commit("addProject", this.newProject);
      this.isCreating = !this.isCreating;
      this.broadcastProject(this.newProject);

      this.$store.commit("increment_project_id");

      this.newProject = new Project(
        this.$store.state.next_project_id,
        "Coffee beans",
        "In creation",
        this.defaultPic
      );
    },
    openProject(project_id) {
      if (!this.isCreating) this.$router.push("/projects/" + project_id);
    },
    broadcastProject(project) {
      const tx = {
        safe: true,
        data: [
          "1H88Ko11eoL3A2ATNCAyJYYukytk69XzH7",
          "" + localStorage.publicKey,
          "PROJECT",
          "" + project.id,
          "" + project.name,
          "" + project.status,
          "" + project.picture
        ],
        pay: { key: localStorage.privateKey }
      };
      new datapay.send(tx, function(err, res) {
        console.log(res);
      });
    },
    loadProjects() {
      this.$store.dispatch("loadProjects");
    },
    getImage() {
      if (this.newProject.name.length >= 3) {
        var url =
          "https://api.unsplash.com/search/photos?query=" +
          this.newProject.name +
          "&client_id=4a1535f360a9b54048af43c59b745451ebb6aad7c889edc56c6a30ae2d87e30f";
        axios.get(url).then(response => {
          this.newProject.picture = response.data.results[this.i].urls.regular;
          this.unsplash_pictures = response.data.results;
          console.log(this.newProject.picture);
        });
      } else {
        this.newProject.picture = this.defaultPic;
      }
    },
    getImageFn: function() {
      this.getImage();
    },
    nextPicture() {
      this.i++;
      this.newProject.picture = this.unsplash_pictures[this.i].urls.regular;
      console.log(this.nextProject.picture);
      console.log(this.unsplash_pictures[this.i]);
    }
  },
  mounted() {
    this.loadProjects();
  },
  watch: {
    "newProject.name": function(oldProject, newerProject) {
      this.debouncedGetImage(newerProject);
    }
  },
  created: function() {
    this.debouncedGetImage = _.debounce(this.getImageFn, 500);
  },
  computed: {
    projects() {
      return this.$store.state.projects;
    }
  }
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

  ion-icon {
    transform: rotate(0deg);
    transition: transform 0.5s;
  }
  ion-icon.editing {
    transform: rotate(-45deg);
  }
}
ion-card {
  //background: linear-gradient(180deg, white, $light) !important;
  background: #ffffff99 !important;

  img {
    max-height: 150px;
    object-fit: cover;
  }

  input {
    background: transparent;
    text-align: center;
    border: none;
  }
}
ion-row {
  transition: all 1s;
}
.slide-list-move {
  transition: transform 1s;
}
.list-enter-active,
.list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateX(30px);
}
ion-footer {
  animation: 5s ease-out 0s 1 slideUp;
}
/* Les animations d'entrée (« enter ») et de sortie (« leave »)  */
/* peuvent utiliser différentes fonctions de durée et de temps.  */
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.3s ease;
}
.slide-fade-enter
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(20px);
  opacity: 0;
}
.slide-fade-leave-to {
  transform: translateY(20px);
  opacity: 0;
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
