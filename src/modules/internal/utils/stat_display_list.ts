export { statsPC, statsRouter }

import { Computer, Router } from "../classes/devices.js"
import { Session } from "../classes/executeTypes.js"
import { List } from "../classes/dataFormats.js"

import { toBits, toBytes, toFrequency } from "./conversions.js"

function bts(bool:boolean){ if(bool){ return "Yes" }else{ return "No" } }
function btp(bool:boolean){ if(bool){ return "Open" }else{ return "Closed" } }

function statsPC(device:Computer, session:Session)
{
    return new List()
    .add(`Device name: ${device.display_name}`)
    .add(`Device type: ${device.device_type}`)
    .add(`Root access: ${bts(device.root_access)}`)
    .add(`Physical access: ${bts(device.physical_access)}`)
    .add(`Money: \$${device.money}`)
    .add(`Private IP: ${device.private_ip}`)
    .add(`Default Gateway: ${session.web.getNetwork_byID(device.network_id)?.private_ip}`)
    .add(`CPU threads: ${device.specs.cpu_threads}`)
    .add(`RAM: ${device.specs.ram_amount}${toBytes(device.specs.ram_exponent)}`)
}

function statsRouter(device:Router)
{
    return new List()
    .add(`Device name: ${device.display_name}`)
    .add(`Device type: ${device.device_type}`)
    .add(`Physical access: ${bts(device.physical_access)}`)
    .add(`Public IP: ${device.public_ip}`)
    .add(`Private IP: ${device.private_ip}`)
    // .add(`Rated speed: ${device.specs.max_speed}`)
    // .add(`Download speed: ${device.specs.down}`)
    // .add(`Upload speed: ${device.specs.up}`)
}