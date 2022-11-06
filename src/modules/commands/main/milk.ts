import { Session, UserInput, LocalData } from "../../internal/classes/executeTypes.js"

export default
{
    name: "milk",
    description: "",
    execute(session:Session, user_input:UserInput, local_data:LocalData)
    {
        console.log("Yes")
        return 1
    }
}