export { Locator, UserInput };
class Locator {
    single = undefined;
    array = [];
    update() { this.single = this.array.join("\\"); }
    extend(location) {
        this.array.push(location);
        this.update();
    }
    drop() {
        this.array.pop();
        this.update();
    }
}
class UserInput {
    command;
    array;
    isPassed = false;
    constructor(input) {
        this.command = input.shift().toLowerCase();
        this.array = input;
    }
    toString() { return this.array.join(" "); }
    empty() {
        this.command = "";
        this.array.length = 0;
        return this;
    }
    getCommandFlag(error_message) {
        if (!error_message) {
            error_message = "Please provide more arguments";
        }
        let out = { flag: "", error: "" };
        if (!this.recieved()) {
            out.error = error_message;
            return out;
        }
        if (this.first().startsWith("-")) {
            out.flag = this.shift();
        }
        return out;
    }
    getArgument(argument) {
        let out = { argument: undefined, index: 0, exist: false };
        this.array.forEach((entry, idx) => {
            argument.forEach(arg => {
                if (entry == arg) {
                    out.argument = this.array[idx + 1];
                    out.index = idx + 1;
                    out.exist = true;
                }
            });
        });
        return out;
    }
    recieved(array_idx = 0) { if (this.array[array_idx]) {
        return true;
    }
    else {
        return false;
    } }
    first() { return this.array[0]; }
    shift(count = 1) {
        let out;
        for (let i = 0; i < count; i++) {
            out = this.array.shift();
        }
        return out;
    }
    shiftToArray(count = 1) {
        let out = [];
        for (let i = 0; i < count; i++) {
            out.push(this.array.shift());
        }
        return out;
    }
    hasPassthrough() { if (this.array.find(string => string == ">>")) {
        return true;
    }
    else {
        return false;
    } }
}
