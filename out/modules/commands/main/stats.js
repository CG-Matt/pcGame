import { Computer } from "../../internal/classes/devices.js";
import { InvalidDeviceError } from "../../internal/classes/errors.js";
import { statsPC } from "../../internal/utils/stat_display_list.js";
export default {
    name: "stats",
    description: "",
    execute(session, user_input, local_data) {
        const { client } = local_data;
        if (!(client instanceof Computer)) {
            return new InvalidDeviceError();
        }
        return statsPC(client, session);
    }
};
