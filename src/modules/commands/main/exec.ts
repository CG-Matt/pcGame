import { Computer } from "../../internal/classes/devices.js"
import { InvalidDeviceError, InvalidFileTypeError } from "../../internal/classes/errors.js"
import { Session, UserInput, LocalData } from "../../internal/classes/executeTypes.js"
import { ExecutableFile } from "../../internal/classes/files.js"

export default
{
    name: "exec",
    description: "Executes an executable file from the current device memory",
    execute(session:Session, user_input:UserInput, local_data:LocalData)
    {
        const { client } = local_data
        const { command_flag } = user_input
        
        if(!user_input.recieved()){ return `No file specified to execute` }
        if(!(client instanceof Computer)){ return new InvalidDeviceError() }

        const file = client.files.fetch(user_input.first())

        if(!file){ return `Unable to find file with name "${user_input.first()}"`}
        if(!( file instanceof ExecutableFile)){ return new InvalidFileTypeError(file.name, "executable") }

        user_input.shift()

        if(command_flag)
        {
            switch(command_flag)
            {
                case "-a":
                case "--args":
                    user_input.shift()
                    break;
            }
        }
        else
        {
            user_input.empty()
        }
        
        return file.execute(session, user_input, local_data)
    }
}