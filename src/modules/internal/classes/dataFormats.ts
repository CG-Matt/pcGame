export { List, Reply, Header, Footer }

class List
{
    list:Array<any> = []

    add(line:any)
    {
        this.list.push(line)
        return this
    }

    addFirst(line:any)
    {
        this.list.unshift(line)
        return this
    }

    importArray(text_array:Array<string>)
    {
        text_array.forEach(line => this.list.push(line))
        return this
    }

    extract()
    {
        return this.list.join("\n")
    }

    hasData()
    {
        return this.list.length > 0
    }
}

type ReplyID = "MSG"|"WARN"|"ERR"

class Reply
{
    id:ReplyID;
    contents:any;

    constructor(contents:any, id:ReplyID = "MSG")
    {
        this.id = id
        this.contents = contents
    }
}

const IP = /[0-9]{1-3}\.[0-9]{1-3}\.[0-9]{1-3}\.[0-9]{1-3}/

function Header(text:string, length = 30)
{
    let plus = false
    let header = ""

    length -= text.length

    if(length % 2 != 0){ length-- ; plus = true }
    for(let i = 0; i < length / 2; i++){ header += "-" }
    header += text
    for(let i = 0; i < length / 2; i++){ header += "-" }
    if(plus){ header += "-" }

    return header
}

function Footer(length = 30)
{
    let footer = ""

    for(let i = 0; i < length; i++){ footer += "-" }

    return footer
}