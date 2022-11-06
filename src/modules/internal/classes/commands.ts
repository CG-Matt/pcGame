export { Command, CommandContainer }

class CommandContainer
{
    contents:Array<Command> = [];

    insert(command:Command)
    {
        this.contents.push(command)
    }

    fetchOne(command_name:string)
    {
        return this.contents.find(command => command.name === command_name)
    }

    fetchGroup(group_name:string)
    {
        return this.contents.filter(command => command.group === group_name)
    }
}

class Command
{
    name:string;
    description:string;
    group:string;
    execute:Function;

    constructor(name:string, description:any, group:string, execute:Function)
    {
        this.name = name
        this.description = description
        this.group = group
        this.execute = execute
    }
}