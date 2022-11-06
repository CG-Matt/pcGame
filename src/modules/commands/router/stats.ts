import { Router } from "../../internal/classes/devices.js"
import { InvalidDeviceError } from "../../internal/classes/errors.js"
import { Session, UserInput, LocalData } from "../../internal/classes/executeTypes.js"
import { statsRouter } from "../../internal/utils/stat_display_list.js"

export default
{
    name: "stats",
    description: "",
    execute(session:Session, user_input:UserInput, local_data:LocalData)
    {
        const target = local_data.client
        
        if(!(target instanceof Router)){ return new InvalidDeviceError() }
        if(!target.login) { return "Not logged in"}

        return statsRouter(target)
    }
}