import QRCode from "qrcode";

export class Item {

    id = "1";
    project_id = "1";
    name = "My first item";
    location = "Brussels, BE";
    status = "Created";
    emitter = "Myself;"
    qrcode = "";

    constructor(id, project_id, name, emitter, location, status) {
        this.id = id;
        this.project_id = project_id;
        this.name = name;
        this.location = location;
        this.status = status;
        this.emitter = emitter;
        this.getQRCode();
    }

    getQRCode() {
        QRCode.toDataURL("" + this.id)
            .then(url => {
                this.qrcode = url;
                console.log("qrcode: " + url);
            })
            .catch(err => {
                console.log("Error while generating qrcode for: " + this.id + ", error: " + err);
            });
    }
}