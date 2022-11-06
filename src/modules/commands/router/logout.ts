import { Router } from "../../internal/classes/devices.js"
import { Session, UserInput, LocalData } from "../../internal/classes/executeTypes.js"

export default
{
    name: "logout",
    description: "",
    execute(session:Session, user_input:UserInput, local_data:LocalData)
    {
        if(local_data.client instanceof Router)
        {
            if(!local_data.client.login){ return `Not logged in` }

            local_data.client.login = false
            local_data.location.drop()
            return `Logout successful`
        }
    }
}