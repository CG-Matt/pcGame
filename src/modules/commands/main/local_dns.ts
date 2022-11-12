import { List } from "../../internal/classes/dataFormats.js"
import { DNSEntry } from "../../internal/classes/dns.js"
import { InvalidArgumentError } from "../../internal/classes/errors.js"
import { Session, UserInput, LocalData } from "../../internal/classes/executeTypes.js"

export default
{
    name: "local_dns",
    description: "Format: <operation> <name> [ip_address]\nModified the local dns registry",
    execute(session:Session, user_input:UserInput, local_data:LocalData)
    {
        const { dns } = local_data
        const { command_flag } = user_input
        let name:string, ip_address:string;

        if(command_flag)
        {
            switch(command_flag)
            {
                case "-a":
                case "add":
                    if(!user_input.recieved(1)){ return 1 }

                    [name, ip_address] = user_input.shiftToArray(2)
                    dns.insert(new DNSEntry(name, ip_address))
                    return `Successfully added "${name}" to local DNS associated with ip "${ip_address}"`

                case "-rm":
                case "remove":
                    if(!user_input.recieved()){ return 1 }

                    [name, ip_address] = user_input.shiftToArray(2)
                    if(!dns.exists(name)){ return `Unable to find local DNS entry with name "${ip_address}"` }

                    const resolve = dns.resolve(name)
                    dns.delete(name)
                    return `Successfully remove "${name}" entry from local DNS associated with ip "${resolve}"`

                case "-ls":
                case "list":
                    return new List().importArray(dns.contents.map(entry => entry.display()))

                default:
                    return new InvalidArgumentError(command_flag)
            }
        }

        return "No arguments provided"
    }
}