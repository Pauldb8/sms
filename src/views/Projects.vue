<template>
  <div class="ion-page">
    <!-- Main content -->
    <ion-content no-padding class="main">
      <ion-fab vertical="bottom" horizontal="end" slot="fixed" v-on:click="starts()">
        <ion-fab-button class="create_button ion-color-accent" color="accent">
          <ion-icon name="add" class="md hydrated" v-bind:class="{ starting: isStarting }"></ion-icon>
        </ion-fab-button>
      </ion-fab>
      <h1 text-center padding>{{ project.name }}</h1>
      <p text-center v-if="items.length <= 0 && !isStarting">No items in this list yet.</p>
      <ion-grid>
        <ion-row>
          <transition name="list">
            <ion-col v-if="isStarting" size="6">
              <ion-card>
                <img :src="project.picture" />
                <ion-card-header class="bg-white">
                  <ion-card-subtitle text-center>Starting</ion-card-subtitle>
                  <ion-card-title text-center>
                    <textarea
                      v-model="newItem.name"
                      placeholder="New item"
                      v-on:keyup.enter="save()"
                      no-padding
                    ></textarea>
                  </ion-card-title>
                </ion-card-header>
              </ion-card>
            </ion-col>
          </transition>
          <ion-col v-for="(item) in items" v-bind:key="item.id" size="6" class="flip-card">
            <div class="flip-card-inner">
              <ion-card class="flip-card-front">
                <img :src="project.picture" />
                <ion-card-header class="bg-white">
                  <ion-card-subtitle text-center>{{ item.status }}</ion-card-subtitle>
                  <ion-card-title text-center>{{ item.name }}</ion-card-title>
                </ion-card-header>
              </ion-card>
              <ion-card class="flip-card-back" :id="doPrint == item.id ? 'print':''">
                <img :src="item.qrcode" />
                <ion-card-header class="bg-white">
                  <ion-card-subtitle text-center class="print_id">{{ item.id }}</ion-card-subtitle>
                  <ion-card-title text-center no-margin class="icons">
                    <ion-icon name="copy" v-clipboard="item.id"></ion-icon>&nbsp;&nbsp;&nbsp;&nbsp;
                    <ion-icon name="print" @click="print(item.id)"></ion-icon>
                  </ion-card-title>
                </ion-card-header>
              </ion-card>
            </div>
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
h1 {
  font-size: 2em;
}
h3 {
  color: $dark;
}
p {
  color: $dark;
}
.bigger {
  font-size: 1.5em;
  margin: 0px;
}
ion-fab-button {
  --ion-background-color: $accent !important;

  ion-icon {
    transform: rotate(0deg);
    transition: transform 0.5s;
  }
  ion-icon.starting {
    transform: rotate(-45deg);
  }
}
ion-card {
  background-color: rgba(255, 255, 255, 0.6) !important img {
    max-height: 150px;
    object-fit: cover;
  }

  textarea {
    background: transparent;
    text-align: center;
    border: none;
    width: 90%;
    margin-bottom: -2px;
  }
}
.flip-card {
  perspective: 1000px;
}

.flip-card-inner {
  transition: transform 0.6s;
  transform-style: preserve-3d;
}

.flip-card:hover .flip-card-inner {
  transform: rotateY(180deg);
}

.flip-card:hover .flip-card-front {
  visibility: hidden;
}

.flip-card-front,
.flip-card-back {
  backface-visibility: hidden !important;
}

.flip-card-front {
  color: black;
  transition-delay: 0.2s;
}

.flip-card-back {
  /*height: 100%;*/
  top: -9px;
  position: absolute;
  color: white;
  transform: rotateY(180deg);
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
  transform: translateX(-30px);
}
.print_id {
  display: none;
}
@media print {
  body * {
    visibility: hidden;
  }
  #print,
  #print * {
    visibility: visible;
  }
  #print {
    width: 175px;
    position: absolute;
    left: 0;
    top: 0;
  }
  .icons {
    display: none;
  }
  .print_id {
    font-size: 0.5em;
    display: block;
    overflow-wrap: break-word;
    word-wrap: break-word;
  }
}
</style>

<script>
import { Item } from "../models/Item";
const datapay = require("datapay");
export default {
  name: "projectspage",
  data: function() {
    return {
      project_id: null,
      newItem: [],
      isStarting: false,
      decodedContent: "",
      errorMessage: "",
      qrcode: [],
      doPrint: ""
    };
  },
  methods: {
    starts() {
      this.isStarting = !this.isStarting;
    },
    loadItems() {
      this.$store.dispatch("loadItems", this.project_id).then(() => {
        this.setQRCodes();
      });
      console.log("loading items from :" + this.project_id);
    },
    save() {
      if (this.$store.state.balance > 0) {
        this.newItem.status = "Started";
        this.$store.commit("addItem", this.newItem);
        this.isStarting = !this.isStarting;
        this.broadcastItem(this.newItem);

        this.newItem = new Item(
          "0xaa",
          "0x12",
          "",
          "Brussels, BE",
          "Starting",
          "Myself;"
        );
      } else {
        window.alert("No funds, please charge your wallet.");
      }
    },
    broadcastItem(item) {
      const tx = {
        safe: true,
        data: [
          "1H88Ko11eoL3A2ATNCAyJYYukytk69XzH7",
          "" + localStorage.publicKey,
          "ITEM",
          "" + this.project_id,
          "" + item.name,
          "" + localStorage.user_name,
          "" + localStorage.user_location,
          "" + item.status
        ],
        pay: { key: localStorage.privateKey }
      };
      var ref = this;
      new datapay.send(tx, function(err, res) {
        console.log(res);
        if (res) ref.broadcastSuccess(res);
        if (err) window.alert("Error while broadcasting transaction. " + err);
      });
    },
    broadcastSuccess(txid) {
      this.$store.state.items.last().id = txid;
    },
    print(item_id) {
      this.doPrint = item_id;
      this.$nextTick(() => {
        window.print();
      });
    }
  },
  mounted() {
    const { project_id } = this.$route.params;
    this.project_id = project_id;
    this.loadItems();
  },
  created: function() {},
  watch: {},
  computed: {
    items() {
      return this.$store.state.items;
    },
    project() {
      return this.$store.state.projects.find(p => p.id === this.project_id);
    }
  }
};
</script>