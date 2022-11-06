import { Computer } from "../../internal/classes/devices.js"
import { InvalidDeviceError } from "../../internal/classes/errors.js"
import { Session, UserInput, LocalData } from "../../internal/classes/executeTypes.js"

export default
{
    name: "rm",
    description: "Remove the file with the specified name",
    execute(session:Session, user_input:UserInput, local_data:LocalData)
    {
        const { client } = local_data

        if(!user_input.recieved()){ return `No file name provided` }
        if(!(client instanceof Computer)){ return new InvalidDeviceError() }

        const file_name = user_input.shift()

        if(!client.files.fetch(file_name)){ return `Unable to find file with name "${file_name}"` }

        client.files.remove(file_name)

        return 1
    }
}