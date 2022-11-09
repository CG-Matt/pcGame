import { Computer } from "../classes/devices.js"

export { parsePortRange, query }

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

function parsePortRange(port_range:string)
{
    const out = { start: 0, end: 0, error: ""}

    if(!port_range.includes("->"))
    {
        out.start = parseInt(port_range)
        out.end = parseInt(port_range)
    }
    else
    {
        const [start, end] = port_range.split("->").map(port => parseInt(port))

        if(isNaN(start) || isNaN(end)){ out.error = `Invalid port intiger`; return out }
        
        out.start = start
        out.end = end
    }

    return out
}