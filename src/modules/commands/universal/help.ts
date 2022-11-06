import { Footer, Header, List } from "../../internal/classes/dataFormats.js"
import { Session, UserInput, LocalData } from "../../internal/classes/executeTypes.js"

export default
{
    name: "help",
    description: "",
    execute(session:Session, user_input:UserInput, local_data:LocalData)
    {
        const { commands } = local_data
        const query = user_input.shift()

        if(!query)
        {
            return new List()
            .importArray(commands.contents.map(command => `- ${command.name}`))
            .addFirst(Header("<COMMANDS>")).add(Footer())
        }

        const command = commands.fetchOne(query)

        if(!command){ return `No such command "${query}"` }
        if(!command.description){ return `No further information available for command "${query}"` }

        return `${query.toUpperCase()} : ${command.description}`
    }
}