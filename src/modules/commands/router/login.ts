import { Router } from "../../internal/classes/devices.js"
import { Session, UserInput, LocalData } from "../../internal/classes/executeTypes.js"

export default
{
    name: "login",
    description: "",
    execute(session:Session, user_input:UserInput, local_data:LocalData)
    {
        if(local_data.client instanceof Router)
        {
            const { client, location } = local_data

            if(client.login){ return `Already logged in` }
            if(!user_input.recieved()){ return `Please enter the password` }
            if(user_input.first() != client.password){ return `Incorrect password` }

            client.login = true
            location.extend("admin")
            return `Login successful`
        }
    }
}