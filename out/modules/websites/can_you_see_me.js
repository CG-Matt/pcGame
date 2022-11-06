import { UI } from "../internal/handlers/ui.js";
export default {
    name: "can_you_see_me",
    execute(session, user_input, local_data) {
        return new UI(session, {
            start_point: "",
            command_groups: [],
            parent_data: local_data
        }).run();
    }
};
