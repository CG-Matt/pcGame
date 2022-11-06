import { Session, UserInput, LocalData } from "../../internal/classes/executeTypes.js"
import { UI } from "../../internal/handlers/ui.js"

export default
{
    name: "default_gateway",
    execute(session:Session, user_input:UserInput, local_data:LocalData)
    {
        return new UI(session,
        {
            start_point: "$router",
            command_groups: ["router"],
            parent_data: local_data
        }).run()
    }
}