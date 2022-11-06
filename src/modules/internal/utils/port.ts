import { Computer } from "../classes/devices.js"

export { query }

const query =
{
    open(device:Computer, port_id:number)
    {
        const target_port = device.ports.getByID(port_id)

        if(!target_port){ return false }
        if(target_port.status){ return true }
        else{ return false }
    },
    name(device:Computer, port_id:number)
    {
        return device.ports.getByID(port_id).name
    }
}