<template>
  <div class="modal-mask">
    <ion-row>
      <ion-col size="8" offset="2">
        <ion-card>
          <img />
          <ion-card-header class="bg-white" v-if="item">
            <ion-card-subtitle text-center>
              <input no-padding placeholder="New status" v-on:keyup.enter="save()" v-model="status" />
            </ion-card-subtitle>
            <ion-card-title text-center>{{ item.name }}</ion-card-title>
          </ion-card-header>
          <ion-card-header class="bg-white" v-else>
            <ion-card-title>Loading item...{{ item_id }}</ion-card-title>
          </ion-card-header>
        </ion-card>
      </ion-col>
    </ion-row>
  </div>
</template>

<script>
import { Item } from "../models/Item";
import axios from "axios";
const datapay = require("datapay");
export default {
  name: "ScanModal",
  props: ["item_id"],
  data() {
    return {
      i: 0,
      content: "Content",
      isLoading: true,
      item: null,
      status: ""
    };
  },
  methods: {
    loadItem(item_id) {
      var query = {
        v: 3,
        q: {
          find: {
            "out.s2": "1H88Ko11eoL3A2ATNCAyJYYukytk69XzH7",
            "out.s3": "" + localStorage.publicKey,
            "tx.h": item_id
          },
          project: {
            "out.$": 1,
            "tx.h": 1
          }
        },
        r: {
          f:
            "[.[] | .tx.h as $txid | .out[] " +
            "| {id: $txid, project_id: .s5, name: .s6, emitter: .s7, location: .s8, status: .s9}]"
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
        }
        this.item = newItem;
      });
    },
    save() {
      if (this.status) {
        const tx = {
          safe: true,
          data: [
            "1H88Ko11eoL3A2ATNCAyJYYukytk69XzH7",
            "" + localStorage.publicKey,
            "UPDATE",
            "" + this.item.project_id,
            "" + this.item.name,
            "" + localStorage.user_name,
            "" + localStorage.user_location,
            "" + this.status
          ],
          pay: { key: localStorage.privateKey }
        };
        var ref = this;
        new datapay.send(tx, function(err, res) {
          console.log(res);
          if (res) ref.broadcastSuccess(res);
          if (err) window.alert("Error while broadcasting transaction. " + err);
        });
      }
    },
    broadcastSuccess(txid) {
      this.$store.state.items.last().id = txid;
    }
  },
  mounted() {
    this.loadItem(this.item_id);
  }
};
</script>

<style scoped lang="scss">
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  transition: opacity 0.3s ease;

  ion-card {
    top: 250px;
  }
}

input {
  background-color: transparent;
  border: none;
}

/* Les animations d'entrée (« enter ») et de sortie (« leave »)  */
/* peuvent utiliser différentes fonctions de durée et de temps.  */
.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>