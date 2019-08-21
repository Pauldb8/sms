<template>
  <div class="ion-page">
    <!-- Main content -->
    <ion-content no-padding class="main">
      <ion-fab vertical="bottom" horizontal="end" slot="fixed">
        <ion-fab-button class="create_button ion-color-accent" color="accent">
          <ion-icon name="add"></ion-icon>
        </ion-fab-button>
      </ion-fab>
      <my-header></my-header>
      <h3>{{ project.name }}</h3>
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
</style>

<script>
import { Project } from "../models/Project";
export default {
  name: "projectspage",
  data: function() {
    return {
      project_id: null
    };
  },
  methods: {},
  mounted() {
    const { project_id } = this.$route.params.project_id;
    this.project_id = project_id;
  },
  created: function() {
    /* First let's check if projects have been loaded */
    if (this.$store.state.projects.length <= 0) this.$router.push("/");
    console.log(this.$store.state.projects.length);
  },
  computed: {
    project() {
      return this.$store.state.projects.find(p => p.id === this.project_id);
    }
  }
};
</script>