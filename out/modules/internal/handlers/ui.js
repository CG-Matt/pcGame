export { UI };
import { CommandContainer } from "../classes/commands.js";
import { Locator, UserInput } from "../classes/local_data.js";
import { DNSContainer } from "../classes/dns.js";
import { List, Reply } from "../classes/dataFormats.js";
import ps from "prompt-sync";
import { Computer } from "../classes/devices.js";
const prompt = ps();
class UI {
    #session;
    #properties;
    #local_data = {
        location: new Locator(),
        commands: new CommandContainer(),
        dns: new DNSContainer(),
        client: undefined // Client stays undefined until main init function
    };
    constructor(session, properties) {
        this.#session = session;
        this.#properties = properties;
        this.#init_local();
    }
    #init_local() {
        const { parent_data, start_point, command_groups, disable_unversal_commands } = this.#properties;
        const local_data = this.#local_data;
        const session = this.#session;
        // Parse Start point
        if (start_point.startsWith("$")) {
            const args = start_point.split(" ");
            if (args[0] === "$start") {
                local_data.client = session.start_point;
                local_data.location.extend(local_data.client.display_name);
            }
            if (args[0] === "$router") {
                if (!parent_data) {
                    return;
                }
                local_data.client = session.web.getNetwork_byID(parent_data.client.network_id);
                local_data.location.extend(local_data.client.display_name);
            }
            if (args[0] === "$pc") {
                if (!args[1] || !args[2]) {
                    return;
                }
                local_data.client = session.web.getNetwork_byID(parseInt(args[1])).get_byIP(args[2]);
                local_data.location.extend(local_data.client.display_name);
            }
        }
        else {
            local_data.location.extend(start_point);
        }
        // Disabling universal commands if needed
        if (!disable_unversal_commands) {
            command_groups.push("universal");
        }
        local_data.commands = new CommandContainer();
        command_groups.forEach(command_group => {
            const command_array = session.commands.fetchGroup(command_group);
            command_array.forEach(command => local_data.commands.insert(command));
        });
    }
    run() {
        const session = this.#session;
        const local_data = this.#local_data;
        // Main UI loop
        while (true) {
            let reply, command;
            const { single: locator } = local_data.location;
            const input = prompt(`${locator}>`).split(/ +/);
            const user_input = new UserInput(input);
            if (user_input.command == "exit") {
                break;
            }
            if ((local_data.client instanceof Computer) && (user_input.command.startsWith("./"))) {
                command = local_data.commands.fetchOne("exec");
                user_input.array.unshift(user_input.command.slice(2));
            }
            else {
                command = local_data.commands.fetchOne(user_input.command);
            }
            if (command) {
                reply = command.execute(session, user_input, local_data);
                if (reply) {
                    switch (typeof reply) {
                        case "string":
                            console.log(`${locator}>${reply}`);
                            break;
                        case "number":
                            if (reply == 0) {
                                console.log(`${locator}>Command "${command.name}" has stopped unexpectedly`);
                            }
                            else if (reply == 1) { }
                            else {
                                console.log(`${locator}>Command "${command.name}" has crashed with an error code of ${reply}`);
                            }
                            break;
                        case "object":
                            if (reply instanceof List) {
                                if (reply.hasData()) {
                                    console.log(reply.extract());
                                }
                            }
                            if (reply instanceof Reply) {
                                switch (reply.id) {
                                    case "MSG":
                                        console.log(`${locator}>${reply.contents}`);
                                        break;
                                    case "WARN":
                                        console.log(`WARNING>${reply.contents}`);
                                        break;
                                    case "ERR":
                                        console.log(`ERROR: ${reply.contents}`);
                                        break;
                                }
                            }
                            if (reply.isClassError) {
                                console.log(`ERROR: ${reply.description}`);
                            }
                            break;
                    }
                }
                else {
                    console.log(`WARNING > Command "${command.name}" didn't return a reply, please make sure to return a "1" if no text is to be displayed`);
                }
            }
            else {
                console.log(`${locator}>Command not recognised, use "help" to show commands`);
            }
        }
        return 1;
    }
}
