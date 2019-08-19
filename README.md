# supply_management_system
This a demo of a Supply Management System on the BSV Blockchain.
It takes the form of a Cross-platform application (Android/iOS/Browser/Desktop) with wallet included.
It allows to create projects, in which you can track items by their id and location.
Other people, using the same app, with their own key, can then go on and sign the item, updating its status.
Advancing the item's journey along the way, until it reaches its destination.
Allowing to review the item by the author along it's route:
 - in realtime
 - in the most secure fashion
 - with almost no cost (less than 0.01$ per tx)
 - with gps coordinate
 - immutably and verifiably on the BSV Blockchain
This project uses a convention of OP_FALSE OP_RETURN (Bitcom's protocol naming convention).
The protocol works this way:

Please do not hesitate to give feedback at paul@debuck.info .

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
