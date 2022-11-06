import { Computer } from "../../internal/classes/devices.js"
import { InvalidDeviceError } from "../../internal/classes/errors.js"
import { Session, UserInput, LocalData } from "../../internal/classes/executeTypes.js"
import { UI } from "../../internal/handlers/ui.js"

export default
{
    name: "ssh",
    description: "",
    execute(session:Session, user_input:UserInput, local_data:LocalData)
    {
        if(!user_input.recieved()){ return 1 }

        const destination = user_input.array[0].split("@")
        if(typeof destination[1] !== "string"){ return 1 }

        let target_address = destination[1].split(":")
        if(target_address.length < 2){ target_address[1] = "22" }

        const target_name = destination[0]
        const target_ip = target_address[0]
        const target_port = parseInt(target_address[1])
        const target = session.web.getNetwork_byIP(target_ip).getByName(target_name)

        if(!target){ return `ERROR: No machine exists with that name and IP address` }
        if(!(target instanceof Computer)){ return new InvalidDeviceError() }
        if(target.ports.getByID(target_port).isOpen()){ return `ERROR: Machine has no SSH listener or its ssh port is closed` }
        if(target.ports.getByID(target_port).name !== "ssh"){ return 1 }
        
        new UI(session,
        {
            start_point: `$pc ${target.network_id} ${target.private_ip}`,
            command_groups: ["main", "ssh"],
            parent_data: local_data
        }).run()

        return 1
    }
}