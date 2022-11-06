import { startsWithVowel } from "../utils/strings.js";
export { Error, InvalidDeviceError, InvalidArgumentError, InvalidFileTypeError };
class Error {
    name;
    description;
    isClassError = true;
    constructor(name, description) {
        this.name = name;
        this.description = description;
    }
}
class InvalidDeviceError extends Error {
    constructor() {
        super("InvalidDeviceError", "Invalid device detected");
    }
}
class InvalidArgumentError extends Error {
    argument;
    constructor(argument) {
        super("InvalidArgumentError", `Unrecognised argument "${argument}" provided`);
        this.argument = argument;
    }
}
class InvalidFileTypeError extends Error {
    constructor(file_name, target_type) {
        let a = "a";
        if (startsWithVowel(target_type)) {
            a += "n";
        }
        super("InvalidFileTypeError", `The file "${file_name}" is not ${a} ${target_type} file`);
    }
}
