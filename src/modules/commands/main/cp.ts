import { Session, UserInput, LocalData } from "../../internal/classes/executeTypes.js"

export default
{
    name: "cp",
    description: "Copies a file",
    execute(session:Session, user_input:UserInput, local_data:LocalData)
    {
        console.clear()
        return 1
    }
}