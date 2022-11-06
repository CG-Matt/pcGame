import { Session, UserInput, LocalData } from "../../internal/classes/executeTypes.js"
import { readFileSync, readdirSync } from "fs"
import { Computer } from "../../internal/classes/devices.js";
import { InvalidArgumentError, InvalidDeviceError } from "../../internal/classes/errors.js";
import { TextFile } from "../../internal/classes/files.js";
import { List } from "../../internal/classes/dataFormats.js";
import { splitName } from "../../internal/utils/file.js";

export default
{
    name: "import",
    description: "Imports files into the game",
    execute(session:Session, user_input:UserInput, local_data:LocalData)
    {
        const { client } = local_data
        const { flag, error } = user_input.getCommandFlag()
        let format:string, file:any;

        if(!(client instanceof Computer)){ return new InvalidDeviceError() }
        if(error){ return error }

        if(!flag)
        {
            const full_file_name = user_input.shift()
            const { file_name, file_extension, error } = splitName(full_file_name)
            if(error){ return error }

            let target_file_name:string, target_file_extension:string;

            const { argument, exist } = user_input.getArgument(["as"])
            if(!exist){ target_file_name = file_name }
            else
            {
                if(!argument){ return `No target file name provided use "import <file_name> as <target_file_name>" to specify a name or use "import <file_name>" to import as current name` }
                
                const { file_name: t_file_name, file_extension: t_file_extension, error } = splitName(argument)
                if(error){ target_file_name = argument }
                else
                {
                    target_file_name = t_file_name
                    target_file_extension = t_file_extension
                }
            }

            if(!readdirSync("imports/").includes(full_file_name)){ return `Unable to find a file with the name "${full_file_name}", use "import -ls" to list all files` }
            
            switch(file_extension)
            {
                case "txt":
                    file = readFileSync(`imports/${full_file_name}`, "utf-8")

                    const text_file = new TextFile(target_file_name)
                    .importContents(file)

                    client.files.replace(text_file)
                    return 1
            }
        }

        switch(flag)
        {
            case "-ls":
            case "--list":
                return new List().importArray(readdirSync("imports/").map(file => `File name: ${file}`))

            default:
                return new InvalidArgumentError(flag)
        }

        return 1
    }
}