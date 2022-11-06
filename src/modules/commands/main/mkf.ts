import { Computer } from "../../internal/classes/devices.js"
import { InvalidDeviceError } from "../../internal/classes/errors.js"
import { Session, UserInput, LocalData } from "../../internal/classes/executeTypes.js"
import { TextFile } from "../../internal/classes/files.js"
import { splitName } from "../../internal/utils/file.js"

export default
{
    name: "mkf",
    description: "Creates a new file with the provided name",
    execute(session:Session, user_input:UserInput, local_data:LocalData)
    {
        const { client } = local_data

        if(!(client instanceof Computer)){ return new InvalidDeviceError() }
        if(!user_input.recieved()){ return `No file name provided` }

        const { file_name, file_extension, error } = splitName(user_input.first(), "No file type specified")
        if(error){ return error }

        switch(file_extension)
        {
            case "txt":
                client.files.insert(new TextFile(file_name))
                return 1 // Created new file
        }
    }
}