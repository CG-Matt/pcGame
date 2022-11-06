import { Session, UserInput, LocalData } from "../../internal/classes/executeTypes.js"
import { Computer } from "../../internal/classes/devices.js"
import { GenericError, InvalidArgumentError, InvalidDeviceError } from "../../internal/classes/errors.js"
import { TextFile } from "../../internal/classes/files.js"
import { splitName } from "../../internal/utils/file.js"

export default
{
    name: "fs",
    description: "Allows for working with the file system",
    execute(session:Session, user_input:UserInput, local_data:LocalData)
    {
        const { client, commands } = local_data
        const { flag, error: flag_error } = user_input.getCommandFlag()
        const { file_name, file_extension, full_file_name, error: file_error } = splitName(user_input.shift(), "No file type specified")

        if(flag_error){ return flag_error }
        if(!(client instanceof Computer)){ return new InvalidDeviceError() }

        if(!flag)
        {
            const command = commands.fetchOne("ls")
            if(!command){ return `Unexpected error` }

            command.execute(session, user_input, local_data)
        }

        switch(flag)
        {
            case "-n":
            case "--new":
                if(file_error){ return file_error }
                if(!file_name){ return "Not enough arguments provided" }

                switch(file_extension)
                {
                    case "txt":
                        client.files.insert(new TextFile(file_name))
                        return 1 // Created new file

                    default:
                        return `Unrecognised file extension "${file_extension}"`
                }

            case "-r":
            case "--remove":
                let target_file_name:string;

                if(file_error){ target_file_name = full_file_name } else { target_file_name = file_name }
                if(!target_file_name){ return "Not enough arguments provided" }
                if(!client.files.fetch(target_file_name)){ return new GenericError(`Unable to find file with name "${file_name}"`) }

                client.files.remove(target_file_name)
                return 1
            
            default:
                return new InvalidArgumentError(flag)
        }
    }
}