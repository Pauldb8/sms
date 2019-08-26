import Vue from 'vue';
import Vuex from 'vuex';
import { Project } from './models/Project';
import { Item } from './models/Item';
import axios from 'axios';

Vue.use(Vuex)
if (!Array.prototype.last) {
  Array.prototype.last = function () {
    return this[this.length - 1];
  };
};
export default new Vuex.Store({
  state: {
    count: 4,
    projects: [],
    items: [],
    balance: 0,
    hasSplashed: false
  },
  mutations: {
    setProjects(state, payload) {
      state.projects = payload;
    },
    addProject(state, newProject) {
      state.projects.unshift(newProject);
    },
    setItems(state, payload) {
      state.items = payload;
    },
    addItem(state, newItem) {
      state.items.unshift(newItem);
    },
    setBalance(state, balance) {
      state.balance = balance;
    },
    hasSplashed(state, hasSplashed) {
      state.hasSplashed = hasSplashed;
      console.log(state.hasSplashed);
    }
  },
  actions: {
    async loadProjects() {
      var query = {
        v: 3,
        q: {
          find: {
            "out.s2": "1H88Ko11eoL3A2ATNCAyJYYukytk69XzH7",
            "out.s3": "" + localStorage.publicKey,
            "out.s4": "PROJECT"
          },
          project: {
            "out.$": 1,
            "tx.h": 1
          }
        },
        r: {
          f:
            '[.[] | .tx.h as $txid | .out[] | select(.s2 and .s2 == "1H88Ko11eoL3A2ATNCAyJYYukytk69XzH7") '
            + '| . | {pubkey: .s3, id: $txid, name: .s6, status: .s7, picture: .s8}]'
        }
      };
      var s = JSON.stringify(query);
      var b64 = Buffer.from(s).toString("base64");
      var urlq =
        "https://neongenesis.bitdb.network/q/1HcBPzWoKDL2FhCMbocQmLuFTYsiD73u1j/" +
        b64;
      var header = { headers: { key: "1KJPjd3p8khnWZTkjhDYnywLB2yE1w5BmU" } };
      console.log("Generated url = " + urlq);
      axios.get(urlq, header).then(response => {
        var projects = [];
        var newProject;
        var tx;
        for (tx of response.data.c) {
          if (tx.pubkey != undefined) {
            newProject = new Project(
              tx.id,
              tx.name,
              tx.status,
              tx.picture
            );

            projects.push(newProject);
          }
        }
        for (tx of response.data.u) {
          if (tx != undefined) {
            newProject = new Project(
              tx.id,
              tx.name,
              tx.status,
              tx.picture
            );

            projects.push(newProject);
          }
        }
        this.commit('setProjects', projects);
        console.log("Loaded id " + projects[0].id);
      });
    },
    async loadItems({ state }, project_id) {
      this.commit('setItems', []);
      var query = {
        v: 3,
        q: {
          find: {
            "out.s2": "1H88Ko11eoL3A2ATNCAyJYYukytk69XzH7",
            "out.s3": "" + localStorage.publicKey,
            "out.s5": project_id
          },
          project: {
            "out.$": 1,
            "tx.h": 1
          }
        },
        r: {
          f:
            '[.[] | .tx.h as $txid | .out[] '
            + '| {id: $txid, project_id: .s5, name: .s6, emitter: .s7, location: .s8, status: .s9}]'
        }
      };
      var s = JSON.stringify(query);
      var b64 = Buffer.from(s).toString("base64");
      var urlq =
        "https://neongenesis.bitdb.network/q/1HcBPzWoKDL2FhCMbocQmLuFTYsiD73u1j/" +
        b64;
      var header = { headers: { key: "1KJPjd3p8khnWZTkjhDYnywLB2yE1w5BmU" } };
      console.log("Generated url = " + urlq);
      axios.get(urlq, header).then(response => {
        var items = [];
        var newItem;
        var tx;
        for (tx of response.data.c) {
          newItem = new Item(
            tx.id,
            tx.project_id,
            tx.name,
            tx.emitter,
            tx.location,
            tx.status
          );

          items.push(newItem);
        }
        for (tx of response.data.u) {
          newItem = new Item(
            tx.id,
            tx.project_id,
            tx.name,
            tx.emitter,
            tx.location,
            tx.status
          );

          items.push(newItem);
        }
        this.commit('setItems', items);
        console.log("Loaded item id " + items[0].id);
      });
    }
  }
})
