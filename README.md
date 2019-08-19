# SMS: Supply Management System on the BSV Blockchain
This a demo of a Supply Management System on the BSV Blockchain.
It takes the form of a Cross-platform application (Android/iOS/Browser/Desktop) with wallet included.
It allows to create projects, in which you can track items by their id and location.
Other people, using the same app, with their own key, can then go on and scan the item's QRCode, sign the item with new location, updating its status.
Advancing the item's journey along the way, until it reaches its destination.
Allowing to review the item by the author along it's route:
 - in realtime
 - in the most secure fashion
 - with almost no cost (less than 0.01$ per tx)
 - with gps coordinate
 - immutably and verifiably on the BSV Blockchain
 - provably honest and true tx

This project uses a convention of OP_FALSE OP_RETURN (Bitcom's protocol naming convention).
The protocol works this way:
```
OP_FALSE
OP_RETURN
1H88Ko11eoL3A2ATNCAyJYYukytk69XzH7 (Bitcom)
project_owner_public_key
project_id
item_id
user_name
user_location
json_info (optional)
```

## The stack
This is a Progressive Web Application.
It is a Vue.JS project, encapsulated with Capacitor for cross platform mobile compiling.
It also works in the browser, and can be made to work on the desktop.
It uses Javascript libraries such as ´´´ datapay.js´´´, ´´´bsv.js ´´´, ´´´Ionic components´´´, ´´´Neon Planaria (_unwriter)´´´
Stack:

     - Vue.JS App (frontend)
     - NeonPlanaria by _unwriter (backend - get info from blockchain) 
     - Datapay.js & bsv.js (backend - for broadcasting to the blockchain)
     - the Bitcoin SV Blockchain

Is is very versatile, uses cheap transaction, secure information, inform in realtime about events.
Can still be greatly improved, but serve its purpose as a proof-of-concept.

Please do not hesitate to give feedback at paul@debuck.info.

# How to install
## Clone repository
```
git clone https://github.com/Pauldb8/Supply-Management-System.git
cd Supply-Management-System
``` 

## Project setup
```
npm install
```

### Compiles and hot-reloads for development (view via browser at 127.0.0.1:8080)
```
npm run serve
```

### Compiles and minifies for production (for building Android/iOS)
```
npm run build
```
