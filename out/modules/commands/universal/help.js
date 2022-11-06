import { Footer, Header, List } from "../../internal/classes/dataFormats.js";
export default {
    name: "help",
    description: "",
    execute(session, user_input, local_data) {
        const { commands } = local_data;
        const query = user_input.shift();
        if (!query) {
            return new List()
                .importArray(commands.contents.map(command => `- ${command.name}`))
                .addFirst(Header("<COMMANDS>")).add(Footer());
        }
        const command = commands.fetchOne(query);
        if (!command) {
            return `No such command "${query}"`;
        }
        if (!command.description) {
            return `No further information available for command "${query}"`;
        }
        return `${query.toUpperCase()} : ${command.description}`;
    }
};
