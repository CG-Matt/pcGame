import { List } from "../../internal/classes/dataFormats.js";
export default {
    name: "scan",
    description: "Format: (scan -public_ip)\nReturns all devices under that network of the public ip address",
    execute(session, user_input, local_data) {
        const IP = user_input.shift();
        if (!IP) {
            return "Please provide a public IP to scan";
        }
        const network = session.web.getNetwork_byIP(IP);
        if (!network) {
            return `No devices discovered on IP "${IP}"`;
        }
        return new List()
            .add(DisplayDevice(network))
            .importArray(network.children.map(device => DisplayDevice(device)));
    }
};
function DisplayDevice(device) {
    let display_name = device.display_name;
    if (display_name.length < 11) {
        display_name += "\t";
    }
    return `Device name: ${display_name}\tDevice type: ${device.device_type}`;
}
