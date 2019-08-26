export class Project {

    id = "";
    name = "My new project";
    status = "Created";
    picture = "";

    constructor(id, name, status, picture) {
        this.id = id;
        this.name = name;
        this.status = status;
        this.picture = picture;
    }

    toString = function noname() { return this.id + ":", this.name }
}