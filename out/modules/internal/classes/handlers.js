export { Handler, HandlerContainer };
class HandlerContainer {
    contents = [];
    insert(handler) {
        this.contents.push(handler);
    }
    fetch(handler_name) {
        return this.contents.find(handler => handler.name === handler_name);
    }
}
class Handler {
    name;
    constructor(name) {
        this.name = name;
    }
}
