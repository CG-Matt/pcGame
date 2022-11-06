import { AnyFile, FileContainer } from "./files.js";

export { Website, WebsiteContainer}

class WebsiteContainer
{
    contents:Array<Website> = [];

    insert(website:Website)
    {
        this.contents.push(website)
    }

    fetch(website_name:string)
    {
        return this.contents.find(website => website.name === website_name)
    }
}

class Website
{
    name:string;
    allowGuestFileAccess:boolean;
    files = new FileContainer();
    execute:Function;

    constructor(name:string, allowGuestFileAccess:boolean = false, execute:Function)
    {
        this.name = name
        this.allowGuestFileAccess = allowGuestFileAccess
        this.execute = execute
    }

    hasFiles(){ return this.files.contents.length > 0 }

    hasFile(file_name:string)
    {
        if(this.files.fetch(file_name)){ return true } else { return false }
    }

    listFiles()
    {
        return this.files.contents.map(file => `File name: ${file.name}\t\t File type: ${file.type}`)
    }

    download(file_name:string)
    {
        return this.files.fetch(file_name)
    }

    upload(file:AnyFile)
    {
        this.files.insert(file)
        return this
    }
}