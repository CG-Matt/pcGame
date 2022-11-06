import { List } from "../../internal/classes/dataFormats.js"
import { Computer } from "../../internal/classes/devices.js"
import { InvalidDeviceError } from "../../internal/classes/errors.js"
import { Session, UserInput, LocalData, Reply } from "../../internal/classes/executeTypes.js"
import { Port } from "../../internal/classes/ports.js"

function btp(bool:boolean){ if(bool){ return "Open" }else{ return "Closed" } }

export default
{
    name: "firewall",
    description: "Allows the opening and closing of ports",
    execute(session:Session, user_input:UserInput, local_data:LocalData)
    {
        const { client } = local_data

        if(!(client instanceof Computer)){ return new InvalidDeviceError() }
        if(user_input.recieved())
        {
            switch(user_input.first())
            {
                case "--list":
                case "-ls":
                    return client.ports.toList()

                case "add":
                case "-a":
                    if(!user_input.recieved(2))
                    client.ports.add(new Port(user_input.array[1], parseInt(user_input.array[2])))
                    return `Successfully added port ${user_input.array[1]}:${user_input.array[2]} to firewall`

                case "--open":
                case "-o":
                    if(!user_input.recieved(1)){ return new Reply("Please provide a port name", "ERR") }
                    var port = client.ports.getByName(user_input.array[1])
                    if(!port){ return new Reply(`No port with name ${user_input.array[1]} found`, "ERR") }

                    port.open()

                    return `Successfully opened port ${port.name}`

                case "--close":
                case "-c":
                    if(!user_input.recieved(1)){ return new Reply("Please provide a port name", "ERR") }
                    var port = client.ports.getByName(user_input.array[1])
                    if(!port){ return new Reply(`No port with name ${user_input.array[1]} found`, "ERR") }

                    port.close()

                    return `Successfully closed port ${port.name}`
            }
        }
        else
        {
            return new Reply("Please provide an action argument", "ERR")
        }
    }
}