import { Session, UserInput, LocalData } from "../../../internal/classes/executeTypes.js"
import { testIsIP } from "../../../internal/utils/ip.js"

export default
{
    name: "port_query",
    type: "executable",
    // password: "1234"
    // exec_properties:
    // {

    // },
    execute(session:Session, user_input:UserInput, local_data:LocalData)
    {
        const { argument: ip_address, exist: ip_provided } = user_input.getArgument(["-i", "--ip"])
        const { argument: port_string, exist: port_provided } = user_input.getArgument(["-p", "--port"])
        const port = parseInt(port_string)

        if(!ip_provided){ return `IP address to query was not specified, use "-i <ip_address>" to specify it` }
        if(!port_provided){ return `Port to query was not specified, use "-p <port>" to specify it` }

        if(!testIsIP(ip_address)){ return `"${ip_address}" is not recognised as a valid address` }
    }
}