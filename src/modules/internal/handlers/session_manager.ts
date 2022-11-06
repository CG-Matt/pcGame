export { Session }

import { readdirSync } from "fs"

import {} from "./gamesave_handler.js"
import { Router, Computer, Device, Web } from "../classes/devices.js"
import { Command, CommandContainer } from "../classes/commands.js"
import { Website, WebsiteContainer } from "../classes/websites.js"
import { DNSEntry, DNSContainer } from "../classes/dns.js"

import new_save from "../constants/new_save.json" assert {type:"json"}
import dns_list from "../constants/dns.json" assert {type:"json"}
import { ExecutableFile, GenericFile } from "../classes/files.js"

class Session
{
    start_point:Computer|Device;
    commands:CommandContainer;
    websites:WebsiteContainer;
    dns:DNSContainer;
    web:Web;

    async init()
    {
        this.#make_web()
        await this.#load_commands()
        await this.#load_websites()
        this.#load_dns()

        return this
    }

    #make_web()
    {
        this.web = new Web()

        if(new_save.type === "Web")
        {
            new_save.children.forEach((router, network_id) =>
            {
                if(router.type === "Router")
                {
                    this.web.extend(new Router(router, network_id))
                    for(const device of router.children)
                    {
                        if(device.type === "Computer")
                        {
                            this.web.getNetwork_byID(network_id).extend(new Computer(device, network_id))
                            if(device.is_start_point)
                            {
                                this.start_point = this.web.getNetwork_byID(network_id).get_byIP(device.private_ip)
                            }
                        }
                    }
                }
            })
        }
    }

    async #load_commands()
    {
        this.commands = new CommandContainer()

        const command_groups = readdirSync("./out/modules/commands/").filter(cg => !cg.includes("."))
        for(const command_group of command_groups)
        {
            const files = readdirSync(`./out/modules/commands/${command_group}`).filter(f => f.endsWith(".js"))
            for await (const file of files)
            {
                const { default: command } = await import(`../../commands/${command_group}/${file}`)
                if(command)
                {
                    this.commands.insert(new Command(command.name, command.description, command_group, command.execute))
                }
            }
        }
    }

    async #load_websites()
    {
        this.websites = new WebsiteContainer()

        const websites = readdirSync("./out/modules/websites/").filter(website => !website.includes("."))
        for(const website of websites)
        {
            const { default: main } = await import(`../../websites/${website}/main.js`)
            if(main)
            {
                this.websites.insert(new Website(main.name, main.allowGuestFileAccess, main.execute))

                if(readdirSync(`./out/modules/websites/${website}/`).includes("files"))
                {
                    const files = readdirSync(`./out/modules/websites/${website}/files/`).filter(file => file.endsWith(".js"))
                    for await (const file_name of files)
                    {
                        const {default: file} = await import(`../../websites/${website}/files/${file_name}`)
                        if(file)
                        {
                            if(file.type == "executable"){ this.websites.fetch(main.name).files.insert(new ExecutableFile(file.name, file.execute))}
                            else{ this.websites.fetch(main.name).files.insert(new GenericFile(file.name, "text")) }
                        }
                    }
                }   
            }
        }
    }

    #load_dns()
    {
        this.dns = new DNSContainer()

        if(dns_list.type == "dns")
        {
            dns_list.entries.forEach(entry =>
            {
                this.dns.insert(new DNSEntry(entry.name, entry.address))
            })
        }
    }
}