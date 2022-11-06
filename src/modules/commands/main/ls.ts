import { Footer, Header } from "../../internal/classes/dataFormats.js"
import { Computer } from "../../internal/classes/devices.js"
import { InvalidDeviceError } from "../../internal/classes/errors.js"
import { Session, UserInput, LocalData } from "../../internal/classes/executeTypes.js"

export default
{
    name: "ls",
    description: "List the files on the current device",
    execute(session:Session, user_input:UserInput, local_data:LocalData)
    {
        const { client } = local_data

        if(!(client instanceof Computer)){ return new InvalidDeviceError() }

        const list = client.listFiles()

        if(!list.hasData()){ return 1 } // The current device does not have any files

        return list
        .addFirst(Header("<Files>", 60))
        .add(Footer(60))        
    }
}