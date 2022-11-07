import { Session, UserInput, LocalData } from "../../internal/classes/executeTypes.js"

export default
{
    name: "can_you_see_me",
    allowGuestFileAccess: true,
    execute(session:Session, user_input:UserInput, local_data:LocalData)
    {
        return `This website does not contain a displayable UI`
    }
}