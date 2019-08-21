import Vue from 'vue';
import Vuex from 'vuex';
import { Project } from './models/Project';
import axios from 'axios';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 4,
    projects: [],
    next_project_id: 1000
  },
  mutations: {
    setProjects(state, payload) {
      state.projects = payload;
    },
    addProject(state, newProject) {
      state.projects.unshift(newProject);
    },
    increment_project_id(state) {
      state.next_project_id++;
    }
  },
  actions: {
    async loadProjects() {
      var query = {
        v: 3,
        q: {
          find: {
            "out.s2": "1H88Ko11eoL3A2ATNCAyJYYukytk69XzH7",
            "out.s3": "" + localStorage.publicKey
          },
          project: {
            "out.$": 1
          }
        },
        r: {
          f:
            '[.[] | .out[] | select(.s2 and .s2 == "1H88Ko11eoL3A2ATNCAyJYYukytk69XzH7") '
            + '| . | {pubkey: .s3, id: .s5, name: .s6, status: .s7, picture: .s8}]'
        }
      };
      var s = JSON.stringify(query);
      var b64 = Buffer.from(s).toString("base64");
      var urlq =
        "https://neongenesis.bitdb.network/q/1HcBPzWoKDL2FhCMbocQmLuFTYsiD73u1j/" +
        b64;
      var header = { headers: { key: "1KJPjd3p8khnWZTkjhDYnywLB2yE1w5BmU" } };
      //console.log("Generated url = " + urlq);
      axios.get(urlq, header).then(response => {
        var projects = [];
        var newProject;
        var tx;
        for (tx in response.data.c) {
          newProject = new Project(
            response.data.c[tx].id,
            response.data.c[tx].name,
            response.data.c[tx].status,
            response.data.c[tx].picture
          );
          this.next_project_id =
            parseInt(newProject.id) <= this.next_project_id
              ? this.next_project_id
              : parseInt(newProject.id) + 1;
          console.log("updated id: " + this.next_project_id);
          projects.unshift(newProject);
        }
        for (tx in response.data.u) {
          newProject = new Project(
            response.data.u[tx].id,
            response.data.u[tx].name,
            response.data.u[tx].status,
            response.data.u[tx].picture
          );
          this.next_project_id =
            parseInt(newProject.id) <= this.next_project_id
              ? this.next_project_id
              : parseInt(newProject.id) + 1;
          console.log("updated id: " + this.next_project_id);
          projects.unshift(newProject);
        }
        this.commit('setProjects', projects);
        console.log("Loaded id " + projects);
      });
    },
  }
})
