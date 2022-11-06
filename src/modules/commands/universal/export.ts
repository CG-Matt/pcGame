import { Session, UserInput, LocalData } from "../../internal/classes/executeTypes.js"
import { writeFileSync } from "fs"

export default
{
    name: "export",
    description: "",
    execute(session:Session, user_input:UserInput, local_data:LocalData)
    {
        const date = new Date()
        const file_prefix = `${date.getFullYear()}${(date.getMonth() + 1)}${date.getDate()}-${date.getHours()}.${date.getMinutes()}.${date.getSeconds()}` 

        function exportData(data_name:string, data:any)
        {
            writeFileSync(`exports/${file_prefix}_${data_name}_export.json`, JSON.stringify(data, undefined, 4))
        }

        const data_type = user_input.first()
        switch(data_type)
        {
            case "session":
                exportData("session", session)
                break;

            case "user_input":
                exportData("user_input", user_input)
                break;

            case "local_data":
                exportData("local_data", local_data)
                break;

            default:
                return `Unable to find data type ${data_type}`
        }

        return 1
    }
}