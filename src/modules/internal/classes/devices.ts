import { PC_Config, PC_Specs, Port_Config, Router_Config } from "./configs/device_configs.js";
import { List } from "./dataFormats.js";
import { FileContainer } from "./files.js";
import { Port, PortContainer } from "./ports.js";

export { Device, Computer, Router, Web }

class Web
{
    name:string = "web";
    children:Array<Router> = [];

    extend(child_class:Router)
    {
        this.children.push(child_class)
    }

    getNetwork_byIP(network_pubic_ip:string)
    {
        return this.children.find(child => child.public_ip === network_pubic_ip)
    }

    getNetwork_byID(network_id:number)
    {
        return this.children.find(child => child.network_id === network_id)
    }
}

class Device
{
    display_name:string;
    device_type:string;
    physical_access:boolean;
    private_ip:string;
    network_id:number;

    constructor(display_name:string, device_type:string, private_ip:string, network_id:number, physical_access = false)
    {
        this.display_name = display_name,
        this.device_type = device_type,
        this.physical_access = physical_access,
        this.private_ip = private_ip
        this.network_id = network_id
    }
}

class Computer extends Device
{
    ports = new PortContainer();
    specs:PC_Specs;
    money:number;
    root_access:boolean;
    files = new FileContainer();
    memory;

    constructor(config:PC_Config, network_id:number)
    {
        super(config.display_name, "PC", config.private_ip, network_id, config.physical_access)
        this.specs = config.specs
        this.money = config.money
        this.root_access = config.root_access
        if(typeof config.ports == "object"){ this.ports.import(config.ports) }
        if(typeof config.ports == "string"){ this.ports.createFromTemplate(config.ports) }
    }

    listFiles()
    {
        return new List().importArray(this.files.contents.map(file => `File name: ${file.name}\t\tFile type: ${file.type}`))
    }
}

class Router extends Device
{
    portforwards = new PortContainer();
    children:Array<Computer|Device> = [];
    public_ip:string;
    login = false;
    password:string;

    constructor(config:Router_Config, network_id:number)
    {
        super(config.display_name, "Router", config.private_ip, network_id, config.physical_access)
        this.public_ip = config.public_ip
        this.password = config.password
    }

    extend(child_class:Computer|Device)
    {
        this.children.push(child_class)
    }

    get_byIP(child_private_ip:string)
    {
        return this.children.find(child => child.private_ip === child_private_ip)
    }

    getByName(device_name:string)
    {
        return this.children.find(child => child.display_name === device_name)
    }

    getMatch(child_private_ip_array:Array<string>)
    {
        return this.children.filter(child => child_private_ip_array.includes(child.private_ip))
    }

    getAll(){ return this.children }

    remove(child_private_ip:string)
    {
        this.children = this.children.filter(child => child.private_ip !== child_private_ip)
    }
}