import { Session, UserInput, LocalData } from "../../internal/classes/executeTypes.js"

export default
{
    name: "cls",
    description: "Clears the screen",
    execute(session:Session, user_input:UserInput, local_data:LocalData)
    {
        console.clear()
        return 1
    }
}