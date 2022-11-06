import { Router } from "../../internal/classes/devices.js";
export default {
    name: "logout",
    description: "",
    execute(session, user_input, local_data) {
        if (local_data.client instanceof Router) {
            if (!local_data.client.login) {
                return `Not logged in`;
            }
            local_data.client.login = false;
            local_data.location.drop();
            return `Logout successful`;
        }
    }
};
