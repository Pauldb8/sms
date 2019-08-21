<template>
  <div class="ion-page">
    <!-- Main content -->
    <ion-content no-padding class="main">
      <my-header></my-header>
      <ion-grid no-padding>
        <ion-row>
          <ion-col>
            <h1 id="funds" class="funds" text-center>{{ this.balance }}Ƀ</h1>
            <p class="small" text-center>
              <a @click="showQRCode = !showQRCode" class="ion-color-accent">Top up</a>
            </p>
          </ion-col>
        </ion-row>
        <ion-row id="qrcode">
          <ion-col text-center>
            <a :href="'bitcoin:' + address">
              <img v-bind:src="qrcode" alt="QRCode" v-bind:class="{ active: showQRCode }" />
            </a>
            <br />
            <span :class="{ active: showQRCode }">{{ address }}</span>
          </ion-col>
        </ion-row>
        <ion-row class="bg-white txs">
          <ion-col>Most recent transactions</ion-col>
        </ion-row>
        <ion-row class="bg-white txs">
          <ion-col>14 Aout</ion-col>
          <ion-col>
            Item
            <strong>F2*****H5</strong>
          </ion-col>
          <ion-col>
            Signed in
            <strong>Brussels, BE</strong>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
    <footer-toolbar></footer-toolbar>
  </div>
</template>

<style lang="scss" scoped>
/* Main screen */
.ion-page,
.main {
  background: url("../assets/background.jpeg") no-repeat center center / cover;
  --background: url("../assets/background.jpeg") no-repeat center center / cover;
}
ion-card {
  background: linear-gradient(180deg, white, $light) !important;
}
ion-footer {
  animation: none !important;
}
.funds {
  font-size: 2.5em;
  font-weight: 100;
  font-style: thin;
}
p.small a {
  background: $accent;
  font-weight: bold;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
#qrcode ion-col img {
  height: 0px;
  transition: height 0.5s;
}
#qrcode ion-col img.active {
  height: 150px;
}
#qrcode ion-col span {
  font-size: 0em;
  transition: font-size 0.5s;
  color: $light;
  text-shadow: 2px 2px 3px black;
}
#qrcode ion-col span.active {
  font-size: 1em;
}
ion-item {
  font-size: 0.85em;
}
ion-item strong {
  font-size: 1em;
}
.txs {
  margin-left: 8px;
  margin-right: 8px;
  justify-content: space-between;
}

/* Keyframes */
@keyframes slideUp {
  0% {
    transform: translateY(100px);
  }
  100% {
    transform: translateY(0px);
  }
}
</style>

<script>
const datapay = require("datapay");
import axios from "axios";
import { Plugins } from "@capacitor/core";
import QRCode from "qrcode";
import countUp, { CountUp } from "countup.js";

export default {
  name: "Wallet",
  data: function() {
    return {
      privateKey: null,
      publicKey: null,
      showQRCode: false,
      address: "",
      qrcode: "",
      balance: 0,
      balanceBlock: null
    };
  },
  methods: {
    async showDialogAlert() {
      await Plugins.Modals.alert({
        title: "Alert",
        message: "This is an example alert box"
      });
    },
    getPrivateKey() {
      if (localStorage.privateKey) {
        this.privateKey = localStorage.privateKey;
        this.publicKey = new datapay.bsv.PublicKey.fromPrivateKey(
          new datapay.bsv.PrivateKey.fromWIF(this.privateKey)
        );
        localStorage.publicKey = this.publicKey.toHex();
        //console.log("My private key is: " + this.privateKey);
      } else {
        console.log("false");
        const newPrivateKey = new datapay.bsv.PrivateKey.fromRandom();
        localStorage.privateKey = newPrivateKey;
        this.privateKey = localStorage.privateKey;
        this.publicKey = new datapay.bsv.PublicKey.fromPrivateKey(
          new datapay.bsv.PrivateKey.fromWIF(this.privateKey)
        );
        localStorage.publicKey = this.publicKey.toHex();
      }
    },
    getAddress() {
      this.address = new datapay.bsv.Address.fromPrivateKey(
        new datapay.bsv.PrivateKey.fromWIF(this.privateKey)
      );
      console.log("Addresse generated: " + this.address);
      QRCode.toDataURL("bitcoin:" + this.address)
        .then(url => {
          this.qrcode = url;
        })
        .catch(err => {
          console.log("Error while generating qrcode from: " + this.address);
          console.log("" + err);
        });
    },
    addCountUp() {
      const options = {
        decimalPlaces: 8,
        suffix: "Ƀ"
      };
      this.balanceBlock = new CountUp("funds", this.balance, options);
      if (!this.balanceBlock.error) {
        this.balanceBlock.start();
      } else {
        console.error(this.balanceBlock.error);
      }
    },
    setBalance() {
      var query = {
        v: 3,
        q: {
          find: {
            "out.e.a": "" + this.address
          },
          limit: 100
        },
        r: {
          f:
            '[.[] | .out[] | .e  | select(.a and .a == "' +
            this.address +
            '") | . | {addr: .a, value: .v}]'
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
        this.balance = 0;
        for (var tx in response.data.c) {
          this.balance += response.data.c[tx].value;
          //console.log("" + response.data.c[tx].value);
        }
        for (var tx in response.data.u) {
          this.balance += response.data.u[tx].value;
        }
        this.balance = (this.balance / 100000000).toFixed(8);
        this.balanceBlock.update(this.balance);
      });
    },
    getBalance() {
      var query = {
        v: 3,
        q: {
          find: {
            "out.e.a": "" + this.address
          },
          limit: 100
        }
      };
      var s = JSON.stringify(query);
      var b64 = Buffer.from(s).toString("base64");
      var urls =
        "https://neongenesis.bitdb.network/s/1HcBPzWoKDL2FhCMbocQmLuFTYsiD73u1j/" +
        b64;
      //console.log("Generated url = " + urls);
      var ref = this;
      var bitsocket = new EventSource(urls);
      bitsocket.onmessage = function(e) {
        console.log(e.data);
        ref.setBalance();
      };
    }
  },
  created() {
    this.getPrivateKey();
    this.getAddress();
    this.getBalance();
  },
  mounted() {
    this.addCountUp();
  }
};
</script>
