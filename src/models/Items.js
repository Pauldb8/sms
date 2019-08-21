export class Item {

    id = 0;
    project_id = "1";
    name = "My first item";
    location = "Brussels, BE";
    status = "Created";
    emitter = "Myself;"

    constructor(id, project_id, name, location, status, emitter) {
        this.id = id;
        this.project_id = project_id;
        this.name = name;
        this.location = location;
        this.status = status;
        this.emitter = emitter;
    }
}