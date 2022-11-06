export { Command, CommandContainer };
class CommandContainer {
    contents = [];
    insert(command) {
        this.contents.push(command);
    }
    fetchOne(command_name) {
        return this.contents.find(command => command.name === command_name);
    }
    fetchGroup(group_name) {
        return this.contents.filter(command => command.group === group_name);
    }
}
class Command {
    name;
    description;
    group;
    execute;
    constructor(name, description, group, execute) {
        this.name = name;
        this.description = description;
        this.group = group;
        this.execute = execute;
    }
}
