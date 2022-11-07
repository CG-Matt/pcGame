import { Router } from "../../internal/classes/devices.js";
import { InvalidArgumentError, InvalidDeviceError } from "../../internal/classes/errors.js";
import { Session, UserInput, LocalData } from "../../internal/classes/executeTypes.js"

export default
{
    name: "ports",
    description: "Clears the screen",
    execute(session:Session, user_input:UserInput, local_data:LocalData)
    {
        const { client } = local_data
        const { command_flag } = user_input

        if(!(client instanceof Router)){ return new InvalidDeviceError() }
        if(command_flag)
        {
            switch(command_flag)
            {
                case "-ls":
                case "--list":
                    return client.portforwards.toList()

                default:
                    return new InvalidArgumentError(user_input.first())
            }
        }
        else
        {
            return client.portforwards.toList()
        }
    }
}