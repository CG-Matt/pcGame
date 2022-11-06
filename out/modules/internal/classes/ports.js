import { List } from "./dataFormats.js";
function btp(bool) { if (bool) {
    return "Open";
}
else {
    return "Closed";
} }
// export { RouterPortContainer, PortContainer, Port }
export { PortContainer, Port };
// class RouterPortContainer
// {
//     contents:Array<Port> = [];
// }
class PortContainer {
    contents = [];
    createFromTemplate(template_name) {
        switch (template_name) {
            case "all_open":
                this.contents = this.#allOpen();
                break;
            case "all_closed":
                this.contents = this.#allClosed();
                break;
        }
    }
    toList(format_string) {
        if (!format_string) {
            format_string = `Port Name: $name\t\tPort: $id\tStatus: $status`;
        }
        return new List().importArray(this.contents.map(port => {
            return format_string
                .replace("$name", `${port.name}`)
                .replace("$id", `${port.id}`)
                .replace("$status", `${btp(port.status)}`);
        }));
    }
    import(ports) {
        ports.forEach(port => this.add(new Port(port.name, port.id, port.status)));
    }
    add(port) {
        this.contents.push(port);
    }
    getByName(port_name) {
        return this.contents.find(port => port.name === port_name);
    }
    getByID(port_id) {
        return this.contents.find(port => port.id === port_id);
    }
    #allOpen() {
        return [
            new Port("ssh", 22, true),
            new Port("smtp", 25, true),
            new Port("ftp", 21, true),
            new Port("http", 80, true)
        ];
    }
    #allClosed() {
        return [
            new Port("ssh", 22),
            new Port("smtp", 25),
            new Port("ftp", 21),
            new Port("http", 80)
        ];
    }
}
class Port {
    name;
    id;
    status;
    constructor(name, id, status = false) {
        this.name = name;
        this.id = id;
        this.status = status;
    }
    open() { this.status = true; }
    close() { this.status = false; }
    isOpen() { return this.status; }
}
