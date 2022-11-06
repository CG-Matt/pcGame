export { DNSContainer, DNSEntry }

class DNSContainer
{
    contents:Array<DNSEntry> = [];

    insert(entry:DNSEntry)
    {
        this.contents.push(entry)

        return this
    }

    exists(dns_name:string)
    {
        const entry = this.contents.find(entry => entry.name == dns_name)
        if(entry){ return true }
        else{ return false }
    }

    resolve(dns_name:string)
    {
        const entry = this.contents.find(entry => entry.name == dns_name)
        if(entry){ return entry.ip_address }
        else{ return undefined }
    }

    resolveIP(dns_ip:string)
    {
        const entry = this.contents.find(entry => entry.ip_address == dns_ip)
        if(entry){ return entry.name }
        else{ return undefined }
    }

    delete(dns_name:string)
    {
        this.contents = this.contents.filter(entry => entry.name !== dns_name)

        return this
    }
}

class DNSEntry
{
    name:string;
    ip_address:string;

    constructor(name:string, ip_address:string)
    {
        this.name = name
        this.ip_address = ip_address
    }

    display()
    {
        return `Name: ${this.name}\t\tTarget IP: ${this.ip_address}`
    }
}