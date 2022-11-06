import { Router } from "../../internal/classes/devices.js";
import { InvalidDeviceError } from "../../internal/classes/errors.js";
import { statsRouter } from "../../internal/utils/stat_display_list.js";
export default {
    name: "stats",
    description: "",
    execute(session, user_input, local_data) {
        const target = local_data.client;
        if (!(target instanceof Router)) {
            return new InvalidDeviceError();
        }
        if (!target.login) {
            return "Not logged in";
        }
        return statsRouter(target);
    }
};
