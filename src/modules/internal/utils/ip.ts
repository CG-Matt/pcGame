export { toStems, stem, testIsIP, testIsLocal, getResolvedDomain }

import ia from "../constants/ip_addresses.json" assert {type: "json"}
import { LocalData, Session } from "../classes/executeTypes.js"

function toStems(ip_address:string)
{
    return ip_address.split(".")
}

function stem(ip_address:string, length:number)
{
    if(length >= 4){ return ip_address }
    let stems = toStems(ip_address)
    for(let i = 4; i > length; i--){stems.pop()}
    return stems.join(".")
}

// function testIsIP(ip_address:string)
// {
//     return /[0-9]{1-3}\.[0-9]{1-3}\.[0-9]{1-3}\.[0-9]{1-3}/.test(ip_address)
// }

function testIsLocal(ip_address:string)
{
    let result = true
    const ip_stems = toStems(ip_address).map(stem => parseInt(stem))
    const min_stems = toStems(ia.local_ip_range.min).map(stem => parseInt(stem))
    const max_stems = toStems(ia.local_ip_range.max).map(stem => parseInt(stem))

    ip_stems.forEach((stem, idx) =>
    {
        if(stem < min_stems[idx]){ result = false }
        if(stem > max_stems[idx]){ result = false }
    })

    return result
}

function testIsIP(ip_address:string)
{
    let result = true
    const stems = toStems(ip_address)
    if(typeof stems === "object")
    {
        if(stems.length !== 4){ return false }
        stems.forEach(stem =>
        {
            if(!/^[0-9]+$/.test(stem)){ result = false }
        })
        return result
    }
    else{ return false }
}

function getResolvedDomain(input:string, session:Session, local_data:LocalData)
{
    const resolve_table = {domain: undefined, error: undefined}
    const router = session.web.getNetwork_byID(local_data.client.network_id)
    let ip_domain:string, return_domain:string;

    if(!testIsIP(input))
    {
        ip_domain = local_data.dns.resolve(input)
        if(!ip_domain){ ip_domain = session.dns.resolve(input) }
        if(!ip_domain){ resolve_table.error = `Unable to resolve domain "${input}"`; return resolve_table}
    }
    else { ip_domain = input }
    if(testIsLocal(ip_domain))
    {
        if(ip_domain == router.private_ip){ return_domain = "default_gateway" }
    }
    if(!return_domain){ return_domain = local_data.dns.resolveIP(ip_domain) }
    if(!return_domain){ return_domain = session.dns.resolveIP(ip_domain) }
    if(!return_domain){ return_domain = input }

    resolve_table.domain = return_domain
    return resolve_table
}