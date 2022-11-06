import { List } from "./dataFormats.js";
import { FileContainer } from "./files.js";
import { PortContainer } from "./ports.js";
export { Device, Computer, Router, Web };
class Web {
    name = "web";
    children = [];
    extend(child_class) {
        this.children.push(child_class);
    }
    getNetwork_byIP(network_pubic_ip) {
        return this.children.find(child => child.public_ip === network_pubic_ip);
    }
    getNetwork_byID(network_id) {
        return this.children.find(child => child.network_id === network_id);
    }
}
class Device {
    display_name;
    device_type;
    physical_access;
    private_ip;
    network_id;
    constructor(display_name, device_type, private_ip, network_id, physical_access = false) {
        this.display_name = display_name,
            this.device_type = device_type,
            this.physical_access = physical_access,
            this.private_ip = private_ip;
        this.network_id = network_id;
    }
}
class Computer extends Device {
    ports = new PortContainer();
    specs;
    money;
    root_access;
    files = new FileContainer();
    memory;
    constructor(config, network_id) {
        super(config.display_name, "PC", config.private_ip, network_id, config.physical_access);
        this.specs = config.specs;
        this.money = config.money;
        this.root_access = config.root_access;
        if (typeof config.ports == "object") {
            this.ports.import(config.ports);
        }
        if (typeof config.ports == "string") {
            this.ports.createFromTemplate(config.ports);
        }
    }
    listFiles() {
        return new List().importArray(this.files.contents.map(file => `File name: ${file.name}\t\tFile type: ${file.type}`));
    }
}
class Router extends Device {
    portforwards = new PortContainer();
    children = [];
    public_ip;
    login = false;
    password;
    constructor(config, network_id) {
        super(config.display_name, "Router", config.private_ip, network_id, config.physical_access);
        this.public_ip = config.public_ip;
        this.password = config.password;
    }
    extend(child_class) {
        this.children.push(child_class);
    }
    get_byIP(child_private_ip) {
        return this.children.find(child => child.private_ip === child_private_ip);
    }
    getByName(device_name) {
        return this.children.find(child => child.display_name === device_name);
    }
    getMatch(child_private_ip_array) {
        return this.children.filter(child => child_private_ip_array.includes(child.private_ip));
    }
    getAll() { return this.children; }
    remove(child_private_ip) {
        this.children = this.children.filter(child => child.private_ip !== child_private_ip);
    }
}
