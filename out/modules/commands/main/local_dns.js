import { List } from "../../internal/classes/dataFormats.js";
import { DNSEntry } from "../../internal/classes/dns.js";
export default {
    name: "local_dns",
    description: "Format: <operation> <name> [ip_address]\nModified the local dns registry",
    execute(session, user_input, local_data) {
        if (user_input.recieved()) {
            switch (user_input.first()) {
                case "-a":
                case "add":
                    if (!user_input.recieved(2)) {
                        return 1;
                    }
                    local_data.dns.insert(new DNSEntry(user_input.array[1], user_input.array[2]));
                    return `Successfully added "${user_input.array[1]}" to local DNS associated with ip "${user_input.array[2]}"`;
                case "-rm":
                case "remove":
                    if (!user_input.recieved(1)) {
                        return 1;
                    }
                    if (!local_data.dns.exists(user_input.array[1])) {
                        return `Unable to find local DNS entry with name "${user_input.array[1]}"`;
                    }
                    const resolve = local_data.dns.resolve(user_input.array[1]);
                    local_data.dns.delete(user_input.array[1]);
                    return `Successfully remove "${user_input.array[1]}" entry from local DNS associated with ip "${resolve}"`;
                case "-ls":
                case "list":
                    const list = new List();
                    local_data.dns.contents.forEach(entry => list.add(entry.display()));
                    return list;
                default:
                    return `Unexpected argument ${user_input.array[0]} recieved`;
            }
        }
        return "No arguments provided";
    }
};
