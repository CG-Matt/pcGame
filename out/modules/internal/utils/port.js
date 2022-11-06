export { query };
const query = {
    open(device, port_id) {
        const target_port = device.ports.getByID(port_id);
        if (!target_port) {
            return false;
        }
        if (target_port.status) {
            return true;
        }
        else {
            return false;
        }
    },
    name(device, port_id) {
        return device.ports.getByID(port_id).name;
    }
};
