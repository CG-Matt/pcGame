import { UI } from "../../internal/handlers/ui.js";
export default {
    name: "default_gateway",
    execute(session, user_input, local_data) {
        return new UI(session, {
            start_point: "$router",
            command_groups: ["router"],
            parent_data: local_data
        }).run();
    }
};
