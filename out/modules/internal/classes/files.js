export { FileContainer, GenericFile, TextFile, ExecutableFile };
class FileContainer {
    contents = [];
    insert(file) {
        if (this.fetch(file.name)) {
            return `ERROR: File with this name already exists`;
        }
        this.contents.push(file);
    }
    fetch(file_name) {
        return this.contents.find(file => file.name == file_name);
    }
    replace(file) {
        if (this.fetch(file.name)) {
            this.remove(file.name);
        }
        return this.insert(file);
    }
    remove(file_name) {
        this.contents = this.contents.filter(file => file.name != file_name);
    }
}
class GenericFile {
    name;
    type;
    constructor(name, type) {
        this.name = name;
        this.type = type;
    }
}
class TextFile extends GenericFile {
    contents;
    constructor(name) {
        super(name, "text");
    }
    importContents(text) {
        this.contents = text;
        return this;
    }
}
class ExecutableFile extends GenericFile {
    execute;
    constructor(name, execute) {
        super(name, "executable");
        this.execute = execute;
    }
}
