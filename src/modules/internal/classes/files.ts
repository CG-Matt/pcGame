export { FileContainer, AnyFile, GenericFile, TextFile, ExecutableFile }

type AnyFile = GenericFile | TextFile | ExecutableFile

class FileContainer
{
    contents:Array<AnyFile> = [];

    insert(file:AnyFile)
    {
        if(this.fetch(file.name)){ return `ERROR: File with this name already exists` }

        this.contents.push(file)
    }

    fetch(file_name:string)
    {
        return this.contents.find(file => file.name == file_name)
    }

    replace(file:AnyFile)
    {
        if(this.fetch(file.name)){ this.remove(file.name) }

        return this.insert(file)
    }

    remove(file_name:string)
    {
        this.contents = this.contents.filter(file => file.name != file_name)
    }
}

class GenericFile
{
    name:string;
    type:string;

    constructor(name:string, type:string)
    {
        this.name = name
        this.type = type
    }
}

class TextFile extends GenericFile
{
    contents:string;

    constructor(name:string)
    {
        super(name, "text")
    }

    importContents(text:string)
    {
        this.contents = text
        return this
    }
}

class ExecutableFile extends GenericFile
{
    execute:Function;

    constructor(name:string, execute:Function)
    {
        super(name, "executable")
        this.execute = execute
    }
}