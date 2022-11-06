import { Footer, Header } from "../../internal/classes/dataFormats.js";
import { Computer } from "../../internal/classes/devices.js";
import { InvalidDeviceError } from "../../internal/classes/errors.js";
export default {
    name: "ls",
    description: "List the files on the current device",
    execute(session, user_input, local_data) {
        const { client } = local_data;
        if (!(client instanceof Computer)) {
            return new InvalidDeviceError();
        }
        const list = client.listFiles();
        if (!list.hasData()) {
            return 1;
        } // The current device does not have any files
        return list
            .addFirst(Header("<Files>", 60))
            .add(Footer(60));
    }
};
